
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
export const TodoContext = createContext();

//Reducer
const reducer = (todos, action) => {
    switch (action.type) {
        //ajout de la tâche
        case "ADD_TODO":
            let tmpAddTodos = [...todos, action.payload]
            saveData(tmpAddTodos);
            return tmpAddTodos;
        //ajout des tâches (depuis l'async storage généralement)
        case "SET_TODOS":
            return action.payload;
        //suppression d'une tâche
        case "DEL_TODO":
            let tmpDelTodos = todos.filter(
                todo => todo !== action.payload
            );
            saveData(tmpDelTodos);
            return tmpDelTodos;
        //modification d'une tâche
        case "MOD_TODO":
            let tmpModTodos = todos.map((todo, index) => index !== action.payload.index ? todo : action.payload.item);
            return tmpModTodos
        //modification du l'état (todo = false ou done = true) d'une tâche

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

    //Récupération des données en asyncstorage au lancement de l'app
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

    //Sauvegarde des données en asyncstorage
    saveData = async (tmpList) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tmpList))
        } catch (e) {
            console.log(e)
            alert('Failed to save the data to the storage')
        }
    }

    //sert en cas de besoin de tests
    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            alert('Storage successfully cleared!')
        } catch (e) {
            alert('Failed to clear the async storage.')
        }
    }

    // Récupération des données 
    useEffect(() => {
        readData()
    }, [])



    return (
        //On encapsule directement les enfants dans le contexte
        <TodoContext.Provider value={[todos, dispatch]}>
            {props.children}
        </TodoContext.Provider>
    )

}