
import React, { Component } from 'react';
import { Text, View } from 'react-native';

//navbar simple avec une props de titre
const NavBar = ({ title }) => (
    <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{title}</Text>
    </View>
);

export default NavBar