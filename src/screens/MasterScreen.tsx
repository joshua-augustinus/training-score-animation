import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, Animated, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { Score } from '@src/components/Score';
import { AttentionButtonContainer } from '@src/components/AttentionButtonContainer';
import { Picker } from '@react-native-picker/picker';
import { EasingFunctions, EasingFunctionsArray } from '@src/constants/EasingFunctions'
import { EasingInfo } from '@src/types';


/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const score = useRef(0);
    const [value, setValue] = useState("0.0");
    const [duration, setDuration] = useState("2000");
    const [soundDelay, setSoundDelay] = useState("200");
    const [newData, setNewData] = useState(null);

    useEffect(() => {

    }, []);

    const onPulseAnimationFinished = () => {
        score.current = score.current + 0.1;
        setValue(score.current.toFixed(1));
    }

    const resetButtons = () => {
        setNewData(new Date())
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>


                <TouchableOpacity onPress={resetButtons}><Text>Press me to reset</Text>
                </TouchableOpacity>
                <Score value={value} />

            </View>


            <View style={styles.rowContainer}>
                <Text>Duration (ms): </Text>
                <TextInput keyboardType='number-pad' value={duration} onChangeText={(text) => setDuration((text))}></TextInput>
            </View>
            <View style={styles.rowContainer}>
                <Text>Start sound delay (ms): </Text>
                <TextInput keyboardType='number-pad' value={soundDelay} onChangeText={setSoundDelay}></TextInput>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AttentionButtonContainer newData={newData} soundDelay={parseInt(soundDelay)} animationDuration={parseInt(duration)} onAnimationFinished={onPulseAnimationFinished} />
            </View>
        </SafeAreaView >

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }

const styles = StyleSheet.create({
    header: {
        height: 50, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        backgroundColor: '#F8F8F8',
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    }
})