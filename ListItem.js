import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TodoContext } from './context/todos.context';

const ListItem = ({ value, index }) => {
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDatePickerVisibleItem, setDatePickerVisibilityItem] = useState(false);
    const [todos, dispatch] = useContext(TodoContext);



    //destructuring value prop
    let { state, description, text, dueDateString } = value;

    //declare states with those values
    const [dueDate, setDueDate] = useState(new Date(dueDateString))
    const [itemText, setItemText] = useState(text)
    const [itemDescription, setItemDescription] = useState(description)

    let todoMonth = dueDate.getMonth();
    let todoDay = dueDate.getDate();
    let todoYear = dueDate.getFullYear()
    let displayedDate = todoDay + '/' + (todoMonth + 1) + '/' + todoYear;
    let displayedDescription = description ? description : "No description provided"

    const showDatePickerItem = () => {
        setDatePickerVisibilityItem(true);
    };

    const hideDatePickerItem = () => {
        setDatePickerVisibilityItem(false);
    };

    const handleConfirmItem = (date) => {
        setDueDate(date)

        hideDatePickerItem();
    };

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

    const handleEdit = (item, index) => dispatch({
        type: "MOD_TODO",
        payload: { item, index }
    })

    const handleDelete = () => dispatch({
        type: "DEL_TODO",
        payload: value
    })

    const handleStateChange = (index) => dispatch({
        type: "MOD_TODO_STATE",
        payload: index
    })

    const confirmEdit = (item, index) => {
        handleEdit(item, index);
        setIsEditing(false);
    }

    return (

        <View>
            {!isEditing ? (
                <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]}
                    onPress={() => handleStateChange(index)}
                >
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
                        style={styles.button}
                        onPress={() => { setIsEditing(true), setDisplay(true) }}
                    >
                        <Text style={{ color: 'orange', margin: 5 }}>📝</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles}
                        onPress={handleDisplay}
                    >
                        <Text style={{ color: 'grey', margin: 5 }}>{display ? '⬆️' : '⬇️'}</Text>
                    </TouchableOpacity>
                    {/* if displayBtn is pressed, then, show either the item description or the no description message. Else dont do anything */}
                    {/* {display ? (itemDescription ? descriptionView : noDescriptionMsg) : null} */}
                    {display ? <Text style={{ width: "100%" }}>{displayedDescription}</Text> : null}
                </TouchableOpacity>
            ) : (
                    <View style={[styles.item, styles.edit]}>
                        {/* <TouchableOpacity style={[styles.item, state == true ? styles.success : styles.todo]}
              onPress={() => changeState(index)}
            > */}
                        <TextInput
                            style={{ fontSize: 18, flex: 0.7 }}
                            placeholder={text}
                            maxLength={40}
                            onChangeText={newtext => setItemText(newtext)}
                        />
                        <Text style={styles.date, getDateStyle()}>
                            {displayedDate}
                        </Text>
                        <Button title="⏱️" onPress={showDatePickerItem} />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisibleItem}
                            mode="date"
                            date={dueDate}
                            onConfirm={handleConfirmItem}
                            onCancel={hideDatePickerItem}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { setIsEditing(false), setDueDate(new Date(dueDateString)) }}
                        >
                            <Text style={{ color: 'red', margin: 5 }}>❌</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonSuccess}
                            //inject destructured props into a new object
                            onPress={() => confirmEdit({ state, description: itemDescription, text: itemText, dueDateString: dueDate }, index)}
                        >
                            <Text style={{ color: 'green', margin: 5 }}>✔️</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={{ width: "100%" }}
                            placeholder={displayedDescription}
                            maxLength={200}
                            onChangeText={newDescription => setItemDescription(newDescription)}
                        />
                        {/* <TouchableOpacity
                style={styles}
                onPress={handleDisplay}
              >
                <Text style={{ color: 'grey', margin: 5 }}>V</Text>
              </TouchableOpacity> */}
                        {/* if displayBtn is pressed, then, show either the item description or the no description message. Else dont do anything */}
                        {/* {display ? (itemDescription ? descriptionView : noDescriptionMsg) : null} */}
                        {/* </TouchableOpacity> */}
                    </View>

                )}



        </View>
    );
};
const styles = StyleSheet.create({

    // Donnez le style que vous souhaitez Ã  vos composant

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
export default ListItem