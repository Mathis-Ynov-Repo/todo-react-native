import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TodoContext } from './context/todos.context';

//Tâche sans option de modification ou changement d'état
const ListItemRO = ({ value }) => {
    const [display, setDisplay] = useState(false);
    const [todos, dispatch] = useContext(TodoContext);

    //destructuration de la prop value
    let { state, description, text, dueDateString, category } = value;

    //declaration du state basé sur cette prop
    const dueDate = new Date(dueDateString);

    let todoMonth = dueDate.getMonth();
    let todoDay = dueDate.getDate();
    let todoYear = dueDate.getFullYear()
    let displayedDate = todoDay + '/' + (todoMonth + 1) + '/' + todoYear;
    let displayedDescription = description ? description : "No description provided"

    getDateStyle = () => {
        let currDate = new Date();
        let currMonth = currDate.getMonth();
        let currYear = currDate.getFullYear();
        if (currMonth > todoMonth && currYear >= todoYear) {
            return { color: 'red' }
        } else if (currMonth == todoMonth && currYear == todoYear) {
            return { color: 'orange' }
        } else {
            return { color: 'green' }
        }
    }

    handleDisplay = () => setDisplay(!display)

    const handleDelete = () => dispatch({
        type: "DEL_TODO",
        payload: value
    })

    return (

        <View>
            <View style={[styles.item, { borderBottomColor: category.color, borderBottomWidth: 5, borderBottomEndRadius: 10 }, state == true ? styles.success : styles.todo]} >
                <Text style={{ fontSize: 18, flex: 0.7 }}>
                    {text}
                </Text>
                <Text style={styles.date, getDateStyle()}>
                    {displayedDate}
                </Text>

                <TouchableOpacity
                    onPress={() => handleDelete(value)}
                >
                    <Ionicons name="md-trash" size={18} color="red" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles}
                    onPress={handleDisplay}
                >
                    {display ?
                        <Ionicons name="ios-arrow-dropdown-circle" size={18} color="orange" style={{ margin: 5 }} />
                        : <Ionicons name="ios-arrow-dropup-circle" size={18} color="orange" style={{ margin: 5 }} />}
                </TouchableOpacity>
                {display && <Text style={{ width: "100%" }}>{displayedDescription}</Text>}
            </View>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    item: {
        margin: 5,
        padding: 5,
        borderLeftWidth: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: "wrap",
        alignItems: "center",
        borderTopLeftRadius: 10
    },
    success: {
        borderLeftColor: 'green',
    },
    edit: {
        borderLeftColor: 'orange',
    },
    todo: {
        borderLeftColor: 'red',
    },
    button: {
        borderColor: 'red',
        borderWidth: 1
    },

    buttonSuccess: {
        borderColor: 'green',
        borderWidth: 1
    },
    input: {
        fontSize: 24,
        textAlign: "center"
    },
    date: {
        fontSize: 14,
        flex: 0.3
    }
});
export default ListItemRO