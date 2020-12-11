import React, { Component, useContext, useEffect, useState } from "react"
import { SafeAreaView, Text, ScrollView } from "react-native";
import { TodoContext } from "../context/todos.context";
import ListItemRO from "../ListItemRO";
import NavBar from "../Navbar";
import NavBarWithCategories from "../NewNav"

const DoneTasksScreen = ({ navigation }) => {
    const [todos] = useContext(TodoContext);
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState(0)



    //Affichage en forme de badge du nombre de taches réalisées
    useEffect(() => {
        navigation.setOptions({ tabBarBadge: list.length });
    }, [todos]);

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
        let tmp = todos.filter((v) => v.state === true)
        setList(tmp)
        setCategoryFilter(0)
        setIsFiltering(false)
        setFilteredList(list)

    }, [todos])

    //filtrer seulement les tâches réalisées
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            <NavBarWithCategories title="Done Tasks" currentCategory={categoryFilter} handleFilter={filterCategories} />

            {list.length > 0 ? (
                <ScrollView>
                    {!isFiltering ? list.map((value, index) => {
                        return <ListItemRO value={value} key={index}></ListItemRO>
                    })
                        : filteredList.length > 0 ?
                            filteredList.map((value, index) => {
                                return <ListItemRO value={value} key={index}></ListItemRO>
                            }) : <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
                                <Text style={{ fontSize: 24 }}>Nothing from this category!</Text>
                            </ScrollView>
                    }

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