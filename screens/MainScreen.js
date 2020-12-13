import React, { Component, useContext, useEffect, useState } from "react"
import { SafeAreaView, StatusBar, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { TodoContext } from "../context/todos.context";
import ListItem from "../ListItem";
import NavBar from "../Navbar";
import Ionicons from 'react-native-vector-icons/Ionicons';

import NavBarWithCategories from "../NavbarWithCategories"


//Main screen avec les tâches en cours
const MainScreen = ({ navigation }) => {
    const [todos, dispatch] = useContext(TodoContext);
    //liste des tâches en cours
    const [list, setList] = useState([]);


    //états de filtrage
    const [filteredList, setFilteredList] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(0);


    const filterCategories = (categoryID) => {
        if (!isFiltering && categoryFilter !== categoryID) {
            let tmp = list.filter((v) => v.category.id === categoryID)
            setFilteredList(tmp)
            setCategoryFilter(categoryID)
            setIsFiltering(true)
        } else if (isFiltering && categoryFilter !== categoryID) {
            setIsFiltering(true)
            let tmp = list.filter((v) => v.category.id === categoryID)
            setFilteredList(tmp)
            setCategoryFilter(categoryID)
        } else {
            setIsFiltering(false)
            setFilteredList(list)
            setCategoryFilter(0)
        }
    }

    useEffect(() => {
        //filtrer seulement les tâches en cours
        let tmp = todos.filter((v) => v.state === false);

        //Affichage en forme de badge du nombre de taches en cours
        navigation.setOptions({ tabBarBadge: tmp.length });
        setList(tmp)

        isFiltering && setFilteredList(tmp.filter((v) => v.category.id === categoryFilter))


    }, [todos])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            {/* <NavBar title="Your Tasks" /> */}
            <NavBarWithCategories title="Your Tasks" currentCategory={categoryFilter} handleFilter={filterCategories} />
            {list.length > 0 ? (

                <ScrollView>
                    {/* Affichage de la liste si l'utilisateur ne filtre pas */}
                    {!isFiltering ? list.map((value, index) => {
                        return <ListItem value={value} key={index} />
                    }) : filteredList.length > 0 ?
                            filteredList.map((value, index) => {
                                return <ListItem value={value} key={index} />
                            }) : <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                                <Text style={{ fontSize: 24 }}>Nothing from this category!</Text>
                            </ScrollView>
                    }
                </ScrollView>
            ) : (
                    <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                        <Text style={{ fontSize: 24 }}>No tasks to do yet !</Text>
                        <TouchableOpacity style={styles.getToButton} onPress={() => navigation.navigate('CreateTask')}>
                            <Text style={{ color: 'white', fontSize: 16 }}>
                                Get to it !
                            </Text>
                            <Ionicons style={{ marginLeft: 5 }} name="md-arrow-round-forward" size={16} color="white"></Ionicons>

                        </TouchableOpacity>
                    </ScrollView>
                )}
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    getToButton: {
        backgroundColor: "blue",
        borderRadius: 20,
        margin: 10,
        padding: 10,
        elevation: 2,
        alignItems: "center",
        flexDirection: "row"
    },
})

export default MainScreen