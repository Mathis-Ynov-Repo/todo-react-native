import React, { Component, useEffect, useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const Notification = () => {
    const displayAnim = useRef(new Animated.Value(0)).current;
    function animateOut() {
        Animated.timing(
            displayAnim, {
            toValue: -20,
            duration: 500,
            useNativeDriver: true
        }
        ).start()
    }
    function animateIn() {
        Animated.timing(
            displayAnim, {
            toValue: 50,
            duration: 500,
            useNativeDriver: true
        }
        ).start()
    }
    React.useEffect(() => {
        animateIn()
    }, [displayAnim]);

    useEffect(() => {
        const timer = setTimeout(() => {
            animateOut()
        }, 2000);
        return () => clearTimeout(timer);
    }, [displayAnim]);

    return (
        <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY: displayAnim }] }}>
            <Text style={{ color: "white" }}> Please enter a title to your task ! </Text>
        </Animated.View>
    )

}
const styles = StyleSheet.create({
    animatedContainer: {
        backgroundColor: "red",
        position: "absolute",
        left: 100,
        borderRadius: 5,
        zIndex: 2,
        height: 30,
        justifyContent: "center"
    }
})
export default Notification