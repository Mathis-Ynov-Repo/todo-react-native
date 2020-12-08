
import React, { createContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
export const TodoContext = createContext();

//Reducer
const reducer = (todos, action) => {
    switch (action.type) {
        case "ADD_TODO":
            let tmpAddTodos = [...todos, action.payload]
            console.log(tmpAddTodos)
            saveData(tmpAddTodos);
            return tmpAddTodos;
        case "SET_TODOS":
            return action.payload;
        case "DEL_TODO":
            let tmpDelTodos = todos.filter(
                todo => todo !== action.payload
            );
            saveData(tmpDelTodos);
            return tmpDelTodos;
        case "MOD_TODO":
            let tmpModTodos = todos.map((todo, index) => index !== action.payload.index ? todo : action.payload.item);
            return tmpModTodos
        case "MOD_TODO_STATE":
            let tmpModeStateTodos = todos.map((value, i) => {
                if (action.payload !== i) {
                    return value
                } else {

                    value.state = !value.state;
                    return value
                }
            })
            saveData(tmpModeStateTodos)
            return tmpModeStateTodos
        default:
            throw new Error();
    }
};
const STORAGE_KEY = 'TASKS'
export const TodoProvider = (props) => {
    const [todos, dispatch] = useReducer(reducer, []);
    // console.log(todos)

    const readData = async () => {
        try {
            const list = await AsyncStorage.getItem(STORAGE_KEY)
            if (list !== null) {

                let arrayOfTasks = JSON.parse(list);

                dispatch({
                    type: "SET_TODOS",
                    payload: arrayOfTasks
                })
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }
    saveData = async (tmpList) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tmpList))
            // alert('Data successfully saved')
        } catch (e) {
            console.log(e)
            alert('Failed to save the data to the storage')
        }
    }
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            alert('Storage successfully cleared!')
        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }

    // Get stored Todos
    useEffect(() => {
        // clearStorage(),
        readData()
    }, [])



    return (
        <TodoContext.Provider value={[todos, dispatch]}>
            {props.children}
        </TodoContext.Provider>
    )

}