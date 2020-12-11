import React, { Component, useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TodoContext } from './context/todos.context';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Tâche avec option de modification ou changement d'état
const ListItem = ({ value, index }) => {
    const [display, setDisplay] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDatePickerVisibleItem, setDatePickerVisibilityItem] = useState(false);
    const [todos, dispatch] = useContext(TodoContext);



    //desctructuration de la prop value
    let { state, description, text, dueDateString, category } = value;

    //declaration des states avec cets valeurs
    const [dueDate, setDueDate] = useState(new Date(dueDateString))
    const [itemText, setItemText] = useState(text)
    const [itemDescription, setItemDescription] = useState(description)

    //Récupération de la data au format adéquat (d/m/Y)
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

    //change la couleur de la date ,
    //rouge si un mois sépare la date actuelle et la date de la tâche (retard), 
    //orange si elle est dans le même mois, 
    //vert si la date de la tâches est plus loin dans l'année
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
                <TouchableOpacity delayLongPress={1000} onLongPress={() => setIsEditing(true)} style={[styles.item, { borderBottomColor: category.color, borderBottomWidth: 5, borderBottomEndRadius: 10 }, state == true ? styles.success : styles.todo]}
                    onPress={() => handleStateChange(index)}
                >
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
                        style={styles.button}
                        onPress={() => { setIsEditing(true), setDisplay(true) }}
                    >
                        <Text style={{ color: 'orange', margin: 5 }}>📝</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles}
                        onPress={handleDisplay}
                    >
                        <Text style={{ color: 'grey', margin: 5 }}>{display ? <Ionicons name="ios-arrow-dropdown-circle" size={18} color="orange" />
                            : <Ionicons name="ios-arrow-dropup-circle" size={18} color="orange" />}</Text>
                    </TouchableOpacity>
                    {/* si displayBtn est pressé, alors, afficher soit la descritption ou le message de non description. Sinon, ne rien faire */}
                    {display ? <Text style={{ width: "100%" }}>{displayedDescription}</Text> : null}
                </TouchableOpacity>
            ) : (
                    <View style={[styles.item, styles.edit, { borderBottomColor: category.color, borderBottomWidth: 5, borderBottomEndRadius: 10 }]}>
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
                            //injection des props destructurées et modifiées dans un nouvel object
                            onPress={() => confirmEdit({ state, description: itemDescription, text: itemText, dueDateString: dueDate, category: category }, index)}
                        >
                            <Text style={{ color: 'green', margin: 5 }}>✔️</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={{ width: "100%" }}
                            placeholder={displayedDescription}
                            maxLength={200}
                            onChangeText={newDescription => setItemDescription(newDescription)}
                        />
                    </View>
                )}
        </View>
    );
};
const styles = StyleSheet.create({
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
    date: {
        fontSize: 14,
        flex: 0.3
    }
});
export default ListItem