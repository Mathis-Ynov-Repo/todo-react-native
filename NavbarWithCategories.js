
import React, { Component, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//navbar simple avec une props de titre
const NavBarWithCategories = ({ title, currentCategory, handleFilter }) => {
    //Catégories définies par mes soins
    const [categories, setCategories] = useState([
        { id: 1, text: "Shopping", color: "purple", icon: "md-cart" },
        { id: 2, text: "Gym", color: "blue", icon: "md-fitness" },
        { id: 3, text: "Housework", color: "green", icon: "md-home" },
        { id: 4, text: "Work", color: "red", icon: "md-briefcase" }
    ]);

    return (
        <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, }}>{title}</Text>
            <View style={{ width: 200, flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center", display: "flex" }}>

                {categories.map((value, index) => {
                    return <TouchableOpacity onPress={() => handleFilter(value.id)} key={index}><Ionicons name={value.icon} size={24} color={currentCategory === value.id ? value.color : "grey"} /></TouchableOpacity>
                })}
            </View>
        </View>
    )
};

export default NavBarWithCategories