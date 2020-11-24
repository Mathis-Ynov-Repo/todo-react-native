
import React, { Component, useState } from 'react';
import { Text, View } from 'react-native';
const NavBar = ({ title }) => (
    <View style={{ height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, marginLeft: 15 }}>{title}</Text>
    </View>
);

export default NavBar