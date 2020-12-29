import { DrivenColors } from "@src/constants/Colors";
import React, { useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { AttentionConstants } from "./AttentionConstants";
import { EasingInfo } from "@src/types";
import ReAnimated, { Easing } from "react-native-reanimated";


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

const EASING_FUNCTION = Easing.bezier(0.19, 1.0, 0.22, 1.0);

const AttentionButton = (props: Props) => {
    const scaleValues: any = useRef({ scaleX: 0, scaleY: 0 });
    const animationState = useRef(new ReAnimated.Value(0)).current;
    const colorState = useRef(new ReAnimated.Value(0)).current;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })


    useEffect(() => {
        if (props.state === 'focused') {
            ReAnimated.timing(animationState, {
                duration: props.animationDuration,
                toValue: 1,
                easing: EASING_FUNCTION

            }).start(() => {

                props.onAnimationFinished();


            });

        } else if (props.state === 'default') {
            ReAnimated.timing(animationState, {
                easing: EASING_FUNCTION,
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
            ReAnimated.timing(colorState, {
                duration: props.animationDuration,
                toValue: 1,
                easing: EASING_FUNCTION

            }).start(() => {

            });

        } else if (props.state === 'default') {
            ReAnimated.timing(colorState, {
                duration: 0.1,
                toValue: 0,
                easing: EASING_FUNCTION

            }).start();
        }
    }, [props.state])



    const onLayout = (event) => {
        if (dimensions.width === 0) {
            const width = event.nativeEvent.layout.width;
            const height = event.nativeEvent.layout.height;
            setDimensions({ width: width, height: height })
        }

    }

    const width = ReAnimated.interpolate(animationState, {
        inputRange: [0, 0.99, 1],
        outputRange: [dimensions.width, dimensions.width + GROW_VALUE, dimensions.width]
    })

    const height = ReAnimated.interpolate(animationState, {
        inputRange: [0, 0.99, 1],
        outputRange: [dimensions.height, dimensions.height + GROW_VALUE, dimensions.height]
    })


    const opacity = ReAnimated.interpolate(animationState, {
        inputRange: [0, 0.8, 0.99, 1],
        outputRange: [1, 1, AttentionConstants.LOWER_OPACITTY, 0]
    });



    const buttonColor = ReAnimated.interpolateColors(colorState, {
        inputRange: [0, 0.8, 1, 2],
        outputColorRange: [DrivenColors.SECONDARY, DrivenColors.SECONDARY, DrivenColors.BUTTON_HIGHLIGHT, DrivenColors.BUTTON_HIGHLIGHT]//We go over 2 just so that easeOutBack works
    })

    const textColor = ReAnimated.interpolateColors(colorState, {
        inputRange: [0, 0.8, 0.9, 1],
        outputColorRange: ['black', 'black', 'white', 'white']
    })

    const linearOpacity = ReAnimated.interpolate(animationState, {
        inputRange: [0, 0.01],
        outputRange: [1, 0]
    })

    return (
        <View style={{ opacity: props.state === 'unfocused' ? 0 : 1 }}>

            <View style={StyleSheet.absoluteFill}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ReAnimated.View style={[styles.container, styles.expandingView, { width: width, height: height, opacity: opacity }]} />
                </View>
            </View>
            <View style={StyleSheet.absoluteFill}>
                {/*@ts-ignore*/}
                <ReAnimated.View style={[styles.container, { backgroundColor: buttonColor, opacity: 1 }]}>
                    {/*@ts-ignore*/}
                    <ReAnimated.Text style={[styles.text, { color: textColor }]}>
                        {props.text}
                    </ReAnimated.Text>
                </ReAnimated.View>
            </View>

            <Pressable
                onPress={props.onPress}>
                <ReAnimated.View style={[styles.container, props.style, { opacity: linearOpacity }]}>
                    <LinearGradient colors={['#FFCC00', DrivenColors.SECONDARY]} style={styles.gradientContainer} onLayout={onLayout}>
                        <Animated.Text style={[styles.text]}>
                            {props.text}
                        </Animated.Text>
                    </LinearGradient>

                </ReAnimated.View>


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
        borderWidth: 0,
        borderRadius: 1000
    }

});