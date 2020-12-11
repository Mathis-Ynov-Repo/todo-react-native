import React, { Component, useContext, useEffect } from "react"
import { SafeAreaView, Text, ScrollView } from "react-native";
import { TodoContext } from "../context/todos.context";
import ListItemRO from "../ListItemRO";
import NavBar from "../Navbar";

const DoneTasksScreen = ({ navigation }) => {
    const [todos] = useContext(TodoContext);

    //Affichage en forme de badge du nombre de taches réalisées
    useEffect(() => {
        navigation.setOptions({ tabBarBadge: list.length });
    }, [todos]);

    //filtrer seulement les tâches réalisées
    const list = todos.filter((v) => v.state === true)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            <NavBar title="Done Tasks" />

            {list.length > 0 ? (
                <ScrollView>
                    {list.map((value, index) => {
                        return <ListItemRO value={value} key={index}></ListItemRO>
                    })}
                </ScrollView>
            ) : (
                    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                        <Text style={{ fontSize: 24 }}>No items in the list yet !</Text>
                    </ScrollView>
                )}
        </SafeAreaView>
    );
}

export default DoneTasksScreen