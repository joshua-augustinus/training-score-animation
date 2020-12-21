import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

interface Props {
    value: string
}

const SCORE_HEIGHT = 30;
const SCORE_WIDTH = 100;
const PULSE_X = 1.3
const PULSE_Y = 2

const ANIMATION_ARRAY_SIZE = 13; //Must be odd number

/**
 * Setup input range for pulse animation
 */
let pulseInputRange = [];
for (let i = 0; i < ANIMATION_ARRAY_SIZE; i++) {
    pulseInputRange.push(i);
}

/**
 * Setup output range for pulse animation
 */
let pulseOutputRangeY = [];
for (let i = 0; i < ANIMATION_ARRAY_SIZE; i++) {
    if (i % 2 === 0) {
        pulseOutputRangeY.push(1);
    } else {
        pulseOutputRangeY.push(PULSE_Y);

    }
}


/**
 * Setup output range for pulse animation
 */
let pulseOutputRangeX = [];
for (let i = 0; i < ANIMATION_ARRAY_SIZE; i++) {
    if (i % 2 === 0) {
        pulseOutputRangeX.push(1);
    } else {
        pulseOutputRangeX.push(PULSE_X);

    }
}



const Score = (props: Props) => {
    const animationState = useRef(new Animated.Value(0)).current;
    const pulseAnimationState = useRef(new Animated.Value(0)).current;
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

    useEffect(() => {
        //on value changed
        const pulse = Animated.timing(pulseAnimationState, {
            useNativeDriver: true,
            toValue: ANIMATION_ARRAY_SIZE,
            duration: 5000,
            easing: Easing.linear
        });

        pulse.start(() => {
            Animated.timing(pulseAnimationState, {
                useNativeDriver: true,
                toValue: 0,
                duration: 0
            }).start();
        });




    }, [props.value])

    /**
     * Animation for pulse
     */
    const scaleX = pulseAnimationState.interpolate({
        inputRange: pulseInputRange,
        outputRange: pulseOutputRangeX
    })
    const scaleY = pulseAnimationState.interpolate({
        inputRange: pulseInputRange,
        outputRange: pulseOutputRangeY
    })
    const pulseTransform = [{ scaleX: scaleX }, { scaleY: scaleY }];



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
            <Animated.View style={{ ...styles.pulse, transform: pulseTransform }} >

            </Animated.View>
            <View style={styles.container} >

                <View style={StyleSheet.absoluteFill}>
                    <View style={styles.border} />
                </View>

                <View style={StyleSheet.absoluteFill}>
                    <Animated.Text style={{ transform: transform2 }}>{props.value}</Animated.Text>
                </View>
                <View style={StyleSheet.absoluteFill}>
                    <Animated.Text style={{ transform: transform3 }}>{oldValue}</Animated.Text>
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
        backgroundColor: 'green',
        height: SCORE_HEIGHT,
        width: SCORE_WIDTH,
    },

    border: {
        borderWidth: 1,
        borderColor: 'blue',
        height: SCORE_HEIGHT,
        backgroundColor: 'white'
    },
    text: {
    }
})