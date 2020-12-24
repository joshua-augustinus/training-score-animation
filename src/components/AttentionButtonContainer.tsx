import { ButtonState } from "@src/types"
import React, { useRef, useState } from "react"
import { View } from "react-native"
import Animated from "react-native-reanimated"
import { AttentionButton } from "./AttentionButton"

interface Data {
    key: string,
    displayText: string,
    state: ButtonState
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

interface Props {
    onAnimationFinished: () => void
}


const AttentionButtonContainer = (props: Props) => {
    const [data, setData] = useState(getInitialData());
    const pressedIndex = useRef(-1);

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
    }

    return <View>
        {data.map((item, index) => {
            return <AttentionButton onAnimationFinished={() => onAnimationFinished(index)} state={item.state} key={item.key} text={item.displayText} onPress={() => onButtonPressed(index)} />

        })}

    </View>
}

export { AttentionButtonContainer }