import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TodoContext } from './context/todos.context';

const ListItemRO = ({ value }) => {
    const [display, setDisplay] = useState(false);
    // Is it better that way or using props 🤔 ?
    const [todos, dispatch] = useContext(TodoContext);

    //destructuring value prop
    let { state, description, text, dueDateString } = value;

    //declare states with those values
    const dueDate = new Date(dueDateString);

    let todoMonth = dueDate.getMonth();
    let todoDay = dueDate.getDate();
    let todoYear = dueDate.getFullYear()
    let displayedDate = todoDay + '/' + (todoMonth + 1) + '/' + todoYear;
    let displayedDescription = description ? description : "No description provided"
    //old
    // const descriptionView = <Text style={{ width: "100%" }}>{itemDescription}</Text>
    // const noDescriptionMsg = <Text style={{ width: "100%" }}>No description provided</Text>

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
            <View style={[styles.item, state == true ? styles.success : styles.todo]}>
                <Text style={{ fontSize: 18, flex: 0.7 }}>
                    {text}
                </Text>
                <Text style={styles.date, getDateStyle()}>
                    {displayedDate}
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelete(value)}
                >
                    <Text style={{ color: 'red', margin: 5 }}>🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles}
                    onPress={handleDisplay}
                >
                    <Text style={{ color: 'grey', margin: 5 }}>{display ? '⬆️' : '⬇️'}</Text>
                </TouchableOpacity>
                {display ? <Text style={{ width: "100%" }}>{displayedDescription}</Text> : null}
            </View>
        </View>
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
        alignItems: "center"
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