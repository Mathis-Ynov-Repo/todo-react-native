import React, { Component, useContext, useEffect } from "react"
import { SafeAreaView, StatusBar, Text, ScrollView } from "react-native";
import { TodoContext } from "../context/todos.context";
import ListItem from "../ListItem";
import NavBar from "../Navbar";

//Main screen avec les tâches en cours
const MainScreen = ({ navigation }) => {
    const [todos, dispatch] = useContext(TodoContext);

    //filtrer seulement les tâches en cours
    const list = todos.filter((v) => v.state === false)

    //Affichage en forme de badge du nombre de taches en cours
    useEffect(() => {
        navigation.setOptions({ tabBarBadge: list.length });
    }, [todos]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            <NavBar title="Your Tasks" />
            {list.length > 0 ? (
                <ScrollView>
                    {todos.map((value, index) => {
                        return value.state === false && <ListItem value={value} index={index} key={index} />
                    })}
                </ScrollView>
            ) : (
                    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                        <Text style={{ fontSize: 24 }}>No todos in the list yet !</Text>
                    </ScrollView>
                )}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

export default MainScreen