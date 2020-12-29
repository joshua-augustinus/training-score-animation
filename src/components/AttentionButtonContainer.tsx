import { PlaySound } from "@src/services/SoundService"
import { ButtonState, EasingInfo } from "@src/types"
import React, { useEffect, useRef, useState } from "react"
import { View } from "react-native"
import { AttentionButton } from "./AttentionButton"

interface Props {
    onAnimationFinished: () => void,
    animationDuration: number,
    soundDelay: number,
    newData: any
}

interface Data {
    key: string,
    displayText: string,
    state: ButtonState,
}


const getInitialData = () => {
    const dataSingleton: Data[] = [
        {
            key: "1", displayText: "Test 1", state: 'default'
        },
        {
            key: "2", displayText: "Test 2", state: 'default'
        },
        {
            key: "3", displayText: "Test 3", state: 'default'
        }
    ]

    return dataSingleton
}




const AttentionButtonContainer = (props: Props) => {
    const [data, setData] = useState(getInitialData());
    const pressedIndex = useRef(-1);


    useEffect(() => {
        //reset


        setData(getInitialData());
    }, [props.animationDuration, props.soundDelay, props.newData]);

    const onAnimationFinished = (index: number) => {
        setTimeout(() => {
            props.onAnimationFinished();

        }, 1000);
    }

    const onButtonPressed = (index: number) => {
        pressedIndex.current = index;
        const item = data[index];
        item.state = 'focused';
        const newData = [];
        for (let i = 0; i < data.length; i++) {
            const newState = i === index ? 'focused' : 'unfocused';
            const newItem = { ...data[i], state: newState }
            newData.push(newItem)
        }

        setData(newData);
        setTimeout(() => {
            PlaySound();

        }, props.soundDelay)

    }

    return <View>
        {data.map((item, index) => {
            return <AttentionButton animationDuration={props.animationDuration} onAnimationFinished={() => onAnimationFinished(index)} state={item.state} key={item.key} text={item.displayText} onPress={() => onButtonPressed(index)} />

        })}

    </View>
}

export { AttentionButtonContainer }