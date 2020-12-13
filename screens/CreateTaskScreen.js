import React, { Component, useContext, useState } from "react"
import { SafeAreaView, Text, View, StyleSheet, Button, Modal, TextInput, TouchableOpacity, TouchableHighlight } from "react-native";
import Notification from "../notification";
import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TodoContext } from "../context/todos.context";
import NavBar from "../Navbar";

//Ecran de création des tâches
const CreateTaskScreen = () => {

    const [todos, dispatch] = useContext(TodoContext);
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState({ id: 1, text: "Shopping", color: "purple" },);

    const [description, setDescription] = useState('');
    const [displayNotification, setDisplayNotification] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //Catégories définies par mes soins
    const categories = [
        { id: 1, text: "Shopping", color: "purple" },
        { id: 2, text: "Gym", color: "blue" },
        { id: 3, text: "Housework", color: "green" },
        { id: 4, text: "Work", color: "red" }
    ];

    //Fonction d'ajout de tâches vérifiant
    const addItem = () => {
        if (text != '') {
            //lance le dispatch du context pour ajouter la tâche
            dispatch({
                type: "ADD_TODO",
                payload: { text: text, state: false, description: description, dueDateString: date, category: category, id: Date.now() }
            });

            //reset les états
            setText('')
            setDescription('')
            setDate(new Date())
            textInput.clear()
            descriptionInput.clear()
        } else if (displayNotification === false) {
            //affichage notification
            setDisplayNotification(true);
            setTimeout(() => setDisplayNotification(false), 3000);
        }
    };

    //Datepicker functions
    const showDatePicker = () => {

        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
        hideDatePicker();
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            <NavBar title="Add a new task !" />
            {/* affichage notification si besoin */}
            {displayNotification && <Notification />}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your new task here!"
                    maxLength={40}
                    onChangeText={text => setText(text)}
                    ref={input => { textInput = input }}
                />
                <TextInput
                    style={styles.input}
                    placeholder="A little description maybe?"
                    maxLength={200}
                    onChangeText={description => setDescription(description)}
                    ref={input => { descriptionInput = input }}
                />
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", padding: 15, width: "100%" }}>
                    <TouchableOpacity
                        style={{ ...styles.openButton, backgroundColor: category.color, alignItems: "center", flexDirection: "row" }}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.textStyle}>{category.text} </Text>
                        <Ionicons name="ios-arrow-dropdown" size={18} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ ...styles.iconButton }} onPress={showDatePicker}>
                        <Ionicons name="md-time" size={18} color="white" />
                    </TouchableOpacity>
                </View>

                <Button
                    title="Add your Task"
                    onPress={addItem}
                />
                {/* Date picker modal */}
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {/* Category Modal  */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", padding: 10 }}>
                                {
                                    categories.map((category) => {
                                        return <TouchableOpacity
                                            key={category.id}
                                            style={{ ...styles.openButton, backgroundColor: category.color, margin: 5 }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                                setCategory(category);
                                            }}
                                        >
                                            <Text style={styles.textStyle}>{category.text}</Text>
                                        </TouchableOpacity>
                                    })
                                }
                            </View>
                            <TouchableHighlight
                                style={{ ...styles.iconButton, backgroundColor: "#DC143C" }}

                                underlayColor={category.color}
                                activeOpacity={0.6}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Ionicons name="md-close" size={18} color="white" />
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    button: {
        borderColor: 'red',
        borderWidth: 1
    },
    input: {
        fontSize: 24,
        textAlign: "center"
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    iconButton: {
        backgroundColor: "magenta",
        padding: 10,
        elevation: 2,
        borderRadius: 10,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width: "75%",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredView: {
        backgroundColor: "backgroundColor: 'rgba(52, 52, 52, 0.5)'",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
export default CreateTaskScreen