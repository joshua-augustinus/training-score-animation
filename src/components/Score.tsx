import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { AttentionConstants } from "./AttentionConstants";

interface Props {
    value: string
}

const SCORE_HEIGHT = 35;
const SCORE_WIDTH = 60;
const GROW_VALUE = AttentionConstants.GROW;
const PULSE_X = (SCORE_WIDTH + GROW_VALUE) / SCORE_WIDTH
const PULSE_Y = (SCORE_HEIGHT + GROW_VALUE) / SCORE_HEIGHT
const SECONDARY = 'rgb(248, 145, 55)';

const BORDER_COLOR = '#008ead';




const Score = (props: Props) => {
    const animationState = useRef(new Animated.Value(0)).current;
    const pulseAnimationState = useRef(new Animated.Value(0)).current;
    const borderAnimationState = useRef(new Animated.Value(0)).current;
    const [oldValue, setOldValue] = useState(null);

    useEffect(() => {


    }, [props.value])

    useEffect(() => {
        if (oldValue === null) {
            setOldValue(props.value);
            return;
        }

        //on value changed
        const reset = Animated.timing(pulseAnimationState, {
            useNativeDriver: true,
            toValue: 0,
            duration: 0
        })

        const pulse = Animated.timing(pulseAnimationState, {
            useNativeDriver: true,
            toValue: 1,
            duration: 1000,
            easing: Easing.linear
        });

        Animated.sequence([reset, pulse]).start(() => {
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

        }

        );




    }, [props.value])

    /**
     * Border color animation effect
     */
    useEffect(() => {
        Animated.timing(borderAnimationState, {
            useNativeDriver: false,
            toValue: 1,
            duration: 1000
        }).start(() => {
            Animated.timing(borderAnimationState, {
                useNativeDriver: false,
                toValue: 0,
                duration: 1000,
                delay: 1000
            }).start();
        });
    }, [props.value]);

    /**
     * Animation for pulse
     */
    const scaleX = pulseAnimationState.interpolate({
        inputRange: [0, 1],
        outputRange: [PULSE_X, 1]
    })
    const scaleY = pulseAnimationState.interpolate({
        inputRange: [0, 1],
        outputRange: [PULSE_Y, 1]
    })
    const pulseTransform = [{ scaleX: scaleX }, { scaleY: scaleY }];
    const opacity = pulseAnimationState.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [AttentionConstants.LOWER_OPACITTY, 1, 1]
    })

    /**
     * Animate border color
     */
    const borderColor = borderAnimationState.interpolate({
        inputRange: [0, 1],
        outputRange: [BORDER_COLOR, SECONDARY]
    })



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

        <View>
            <Animated.View style={{ ...styles.pulse, transform: pulseTransform, opacity: opacity }} >

            </Animated.View>
            <View style={styles.container} >

                <View style={StyleSheet.absoluteFill}>
                    <Animated.View style={{ ...styles.border, borderColor: borderColor }} />
                </View>

                <View style={styles.textContainer}>
                    <Animated.Text style={{ ...styles.text, transform: transform2 }}>{props.value}</Animated.Text>
                </View>
                <View style={styles.textContainer}>
                    <Animated.Text style={{ ...styles.text, transform: transform3 }}>{oldValue}</Animated.Text>
                </View>

            </View>
        </View>

    )
}

export { Score }

const styles = StyleSheet.create({
    container: {
        width: SCORE_WIDTH,
        height: SCORE_HEIGHT,
        overflow: 'hidden',
        ...StyleSheet.absoluteFillObject
    },
    pulse: {
        backgroundColor: SECONDARY,
        height: SCORE_HEIGHT,
        width: SCORE_WIDTH,
        borderRadius: 20,
        opacity: 0.1
    },

    border: {
        borderWidth: 2,
        borderRadius: 1000,
        height: SCORE_HEIGHT,
        backgroundColor: 'white'
    },
    text: {
        color: BORDER_COLOR,
        fontFamily: "Roboto-Bold",
        fontSize: 18
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center'
    }
})