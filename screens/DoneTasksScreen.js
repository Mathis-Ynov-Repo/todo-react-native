import React, { Component, useContext, useEffect, useState } from "react"
import { SafeAreaView, Text, ScrollView } from "react-native";
import { TodoContext } from "../context/todos.context";
import ListItemRO from "../ListItemRO";
import NavBar from "../Navbar";
import NavBarWithCategories from "../NavbarWithCategories"

const DoneTasksScreen = ({ navigation }) => {
    const [todos] = useContext(TodoContext);
    //liste des tâches terminées
    const [list, setList] = useState([]);

    //états de filtrage
    const [filteredList, setFilteredList] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(0);



    //filtrage selon la catégories
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
        //trie des tâches terminées
        let tmp = todos.filter((v) => v.state === true);

        //Affichage en forme de badge du nombre de taches réalisées
        navigation.setOptions({ tabBarBadge: tmp.length });
        setList(tmp)

        isFiltering && setFilteredList(tmp.filter((v) => v.category.id === categoryFilter))

    }, [todos])

    //filtrer seulement les tâches réalisées
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#efefef' }}>
            <NavBarWithCategories title="Your done tasks" currentCategory={categoryFilter} handleFilter={filterCategories} />
            {/* Affichage de liste si il existe des tâches terminées */}
            {list.length > 0 ? (
                <ScrollView>
                    {/* Affichage de la liste si l'utilisateur ne filtre pas */}
                    {!isFiltering ? list.map((value, index) => {
                        return <ListItemRO value={value} key={index}></ListItemRO>
                    })
                        //Affichage soit d'un message vide si rien ne correspond au filtre soit des tâches lui correspondant
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
                        <Text style={{ fontSize: 24 }}>No done tasks in the list !</Text>
                    </ScrollView>
                )}
        </SafeAreaView>
    );
}

export default DoneTasksScreen