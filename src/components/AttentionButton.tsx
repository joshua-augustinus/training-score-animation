import { DrivenColors } from "@src/constants/Colors";
import React, { useEffect, useRef } from "react"
import { Animated, Easing, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { EasingFunctions } from "@src/constants/EasingFunctions";
import LinearGradient from "react-native-linear-gradient";
import { AttentionConstants } from "./AttentionConstants";
import { EasingInfo } from "@src/types";

interface Props {
    onPress: () => void,
    text: string,
    state: 'default' | 'focused' | 'unfocused',
    style?: any,
    onAnimationFinished: () => void,
    easingInfo: EasingInfo,
    animationDuration: number
}


const HEIGHT = 37;
const GROW_VALUE = AttentionConstants.GROW;

const getScaleValues = (width: number, height: number) => {

    const scaleX = (width + GROW_VALUE) / width;
    const scaleY = (height + GROW_VALUE) / height;
    return {
        scaleX: scaleX, scaleY: scaleY
    }
}

const AttentionButton = (props: Props) => {
    const scaleValues: any = useRef({ scaleX: 0, scaleY: 0 });
    const animationState = useRef(new Animated.Value(0)).current;
    const colorState = useRef(new Animated.Value(0)).current;



    useEffect(() => {
        if (props.state === 'focused') {
            Animated.timing(animationState, {
                useNativeDriver: true,
                duration: props.animationDuration,
                toValue: 1,
                easing: props.easingInfo.function

            }).start(() => {

                props.onAnimationFinished();


            });

        } else if (props.state === 'default') {
            Animated.timing(animationState, {
                useNativeDriver: true,
                duration: 0.1,
                toValue: 0
            }).start(() => {

            });
        }
    }, [props.state])

    /**
     * Color animation
     */
    useEffect(() => {
        if (props.state === 'focused') {
            Animated.timing(colorState, {
                useNativeDriver: false,
                duration: props.animationDuration,
                toValue: 1,
                easing: props.easingInfo.function

            }).start(() => {

            });

        } else if (props.state === 'default') {
            Animated.timing(colorState, {
                useNativeDriver: false,
                duration: 0.1,
                toValue: 0
            }).start();
        }
    }, [props.state])



    const onLayout = (event) => {
        if (scaleValues.current.scaleX === 0) {
            const width = event.nativeEvent.layout.width;
            const height = event.nativeEvent.layout.height;
            console.log("Dimensions", width, height);

            scaleValues.current = getScaleValues(width, height);
            console.log("Scale values", scaleValues.current);
        }

    }

    const scaleX = animationState.interpolate({
        inputRange: [0, 0.99, 1],
        outputRange: [1, scaleValues.current.scaleX, 1]
    })

    const scaleY = animationState.interpolate({
        inputRange: [0, 0.99, 1],
        outputRange: [1, scaleValues.current.scaleY, 1]
    })

    const transform = [{ scaleX: scaleX }, { scaleY: scaleY }]

    const opacity = animationState.interpolate({
        inputRange: [0, 0.8, 0.99, 1],
        outputRange: [1, 1, AttentionConstants.LOWER_OPACITTY, 0]
    });



    const buttonColor = colorState.interpolate({
        inputRange: [0, 0.8, 1, 2],
        outputRange: [DrivenColors.SECONDARY, DrivenColors.SECONDARY, DrivenColors.BUTTON_HIGHLIGHT, DrivenColors.BUTTON_HIGHLIGHT]//We go over 2 just so that easeOutBack works
    })

    const textColor = colorState.interpolate({
        inputRange: [0, 0.8, 0.9, 1],
        outputRange: ['black', 'black', 'white', 'white']
    })

    const linearOpacity = animationState.interpolate({
        inputRange: [0, 0.01],
        outputRange: [1, 0]
    })

    return (
        <View style={{ opacity: props.state === 'unfocused' ? 0 : 1 }}>

            <View style={StyleSheet.absoluteFill}>
                <Animated.View style={[styles.container, styles.expandingView, { transform: transform, opacity: opacity }]} />
            </View>
            <View style={StyleSheet.absoluteFill}>
                <Animated.View style={[styles.container, { backgroundColor: buttonColor, opacity: 1 }]}>
                    <Animated.Text style={[styles.text, { color: textColor }]}>
                        {props.text}
                    </Animated.Text>
                </Animated.View>
            </View>

            <Pressable onLayout={onLayout}
                onPress={props.onPress}>
                <Animated.View style={[styles.container, props.style, { opacity: linearOpacity }]}>
                    <LinearGradient colors={['#FFCC00', DrivenColors.SECONDARY]} style={styles.gradientContainer}>
                        <Animated.Text style={[styles.text]}>
                            {props.text}
                        </Animated.Text>
                    </LinearGradient>

                </Animated.View>


            </Pressable >
        </View>


    )
}

export { AttentionButton }

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 6,
        marginBottom: 8,
        justifyContent: "center",
        borderColor: DrivenColors.SECONDARY,
        height: HEIGHT,
    },
    gradientContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        height: HEIGHT,
        justifyContent: "center",
        borderRadius: 24,
    },
    text: {
        textAlignVertical: 'center',
        fontSize: 16,
        color: 'black',
        fontFamily: "Roboto-Regular",
        textAlign: "center"
    }, expandingView: {
        backgroundColor: DrivenColors.SECONDARY,
        borderWidth: 0
    }

});