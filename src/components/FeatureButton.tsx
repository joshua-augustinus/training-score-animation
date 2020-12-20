import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";

interface Props {

}

export const FEATURE_BUTTON_HEIGHT = 150;

const FeatureButton = (props: Props) => {
    const width = useWindowDimensions().width;
    return (


        <TouchableOpacity onPress={() => { }} >
            <Animated.Image style={{ ...styles.image, width: width, height: FEATURE_BUTTON_HEIGHT }} resizeMode='cover' source={require('../assets/sample.jpg')} />

        </TouchableOpacity>
    )
}

export { FeatureButton }

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        zIndex: 1
    },
    image: {
        width: '100%',

    }
})