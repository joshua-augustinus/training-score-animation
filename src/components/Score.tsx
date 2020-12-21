import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

interface Props {
    value: string
}

export const SCORE_HEIGHT = 30;

const Score = (props: Props) => {
    const animationState = useRef(new Animated.Value(0)).current;
    const [oldValue, setOldValue] = useState("0.0");

    useEffect(() => {
        //on value changed
        Animated.timing(animationState, {
            useNativeDriver: true,
            toValue: 1,
            duration: 500
        }).start(() => {
            //reset
            Animated.timing(animationState, {
                useNativeDriver: true,
                toValue: 0,
                duration: 0
            }).start();

            setOldValue(props.value);

        });

    }, [props.value])

    /**
     * Animation for the actual text
     */


    /**
     * Animation for text coming in
     */
    const translateYIn = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [SCORE_HEIGHT, 0]
    })
    const transform2 = [{ translateY: translateYIn }]

    /**
     * Animation for text coming out
     */
    const translateYOut = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -SCORE_HEIGHT]
    })
    const transform3 = [{ translateY: translateYOut }]


    return (


        <View style={styles.container} >
            <View style={StyleSheet.absoluteFill}>
                <Animated.Text style={{ transform: transform2 }}>{props.value}</Animated.Text>
            </View>
            <View style={StyleSheet.absoluteFill}>
                <Animated.Text style={{ transform: transform3 }}>{oldValue}</Animated.Text>
            </View>
        </View>
    )
}

export { Score }

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: SCORE_HEIGHT,
        borderWidth: 1,
        borderColor: 'blue',
    },
    text: {
    }
})