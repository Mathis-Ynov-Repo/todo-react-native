import React, { Component, useEffect, useRef } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

//petite notification rouge
const Notification = () => {
    const displayAnim = useRef(new Animated.Value(0)).current;

    function animateOut() {
        Animated.timing(
            displayAnim, {
            toValue: -30,
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
    //lance l'animation à la création du composant
    React.useEffect(() => {
        animateIn()
    }, [displayAnim]);

    //lance le timer de l'animation, lance la fonction d'animation de sortie à la fin de ce dernier et le clear à l'unmount
    useEffect(() => {
        const timer = setTimeout(() => {
            animateOut()
        }, 2000);
        return () => clearTimeout(timer);
    }, [displayAnim]);

    return (
        <Animated.View style={{ ...styles.animatedContainer, transform: [{ translateY: displayAnim }] }}>
            <Text style={{ color: "white", fontWeight: "bold", padding: 5 }}> Please enter a title for your task ! </Text>
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