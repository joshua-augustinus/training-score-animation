import { EasingFunctions } from "@src/constants/EasingFunctions";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { AttentionConstants } from "./AttentionConstants";

interface Props {
    value: string
}

const SCORE_HEIGHT = 35;
const SCORE_WIDTH = 60;
const GROW_VALUE = AttentionConstants.GROW;
const SECONDARY = 'rgb(248, 145, 55)';

const BORDER_COLOR = '#008ead';

const EASING_FUNCTION = EasingFunctions.easeInExpo;


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
            easing: EASING_FUNCTION,
            toValue: 0,
            duration: 0.1
        })

        const pulse1 = Animated.timing(pulseAnimationState, {
            easing: EASING_FUNCTION,
            toValue: 1,
            duration: AttentionConstants.FIRST_DURATION,
        });

        reset.start(() => {
            pulse1.start(() => {
                //Pulse animation complete; now do number animation

                //on value changed
                Animated.timing(animationState, {
                    easing: EasingFunctions.easeInOut,
                    toValue: 1,
                    duration: 500,
                }).start(() => {
                    //reset
                    Animated.timing(animationState, {
                        easing: EasingFunctions.easeInOut,
                        toValue: 0,
                        duration: 0.1
                    }).start();

                    setOldValue(props.value);

                });
            })
        });



    }, [props.value])

    /**
     * Border color animation effect
     */
    useEffect(() => {
        Animated.timing(borderAnimationState, {
            easing: EASING_FUNCTION,
            toValue: 1,
            duration: 2000
        }).start(() => {
            Animated.timing(borderAnimationState, {
                easing: EASING_FUNCTION,
                toValue: 0,
                duration: 1000
            }).start();
        });
    }, [props.value]);

    /**
     * Animation for pulse
     */
    const pulseWidth = Animated.interpolate(pulseAnimationState, {
        inputRange: [0, 1],
        outputRange: [SCORE_WIDTH + GROW_VALUE, SCORE_WIDTH]
    })
    const pulseHeight = Animated.interpolate(pulseAnimationState, {
        inputRange: [0, 1],
        outputRange: [SCORE_HEIGHT + GROW_VALUE, SCORE_HEIGHT]
    })

    const pulseOpacity = Animated.interpolate(pulseAnimationState, {
        inputRange: [0, 0.2, 1],
        outputRange: [AttentionConstants.LOWER_OPACITTY, AttentionConstants.MIDDLE_OPACITY, 1]
    })

    /**
     * Animate border color
     */
    const borderColor = Animated.interpolateColors(borderAnimationState, {
        inputRange: [0, 1],
        outputColorRange: [BORDER_COLOR, SECONDARY]
    })



    /**
     * Animation for text coming in
     */
    const translateYIn = Animated.interpolate(animationState, {
        inputRange: [0, 1],
        outputRange: [-SCORE_HEIGHT, 0]
    })
    const transform2 = [{ translateY: translateYIn }]

    /**
     * Animation for text coming out
     */
    const translateYOut = Animated.interpolate(animationState, {
        inputRange: [0, 1],
        outputRange: [0, SCORE_HEIGHT]
    })
    const transform3 = [{ translateY: translateYOut }]


    return (

        <View>
            <View style={styles.sizeContainer} >
                <View style={styles.pulseContainer}>
                    <Animated.View style={{ ...styles.pulse, width: pulseWidth, height: pulseHeight, opacity: pulseOpacity }} >

                    </Animated.View>
                </View>

            </View>
            <View style={styles.container} >

                <View style={StyleSheet.absoluteFill}>
                    {/*@ts-ignore*/}
                    <Animated.View style={{ ...styles.border, borderColor: borderColor }} />
                </View>
                <View style={styles.innerContainer}>


                    <View style={styles.textContainer}>
                        <Animated.Text style={{ ...styles.text, transform: transform2 }}>{props.value}</Animated.Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Animated.Text style={{ ...styles.text, transform: transform3 }}>{oldValue}</Animated.Text>
                    </View>

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
        padding: 4,
        ...StyleSheet.absoluteFillObject
    },
    innerContainer: {
        width: '100%',
        height: "100%",
        overflow: 'hidden'
    },
    sizeContainer: {
        height: SCORE_HEIGHT,
        width: SCORE_WIDTH,
    },
    pulseContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pulse: {
        backgroundColor: SECONDARY,
        height: SCORE_HEIGHT,
        width: SCORE_WIDTH,
        borderRadius: 100,
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
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
})