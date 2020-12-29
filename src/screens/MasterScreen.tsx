import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, Animated, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { Score } from '@src/components/Score';
import { AttentionButtonContainer } from '@src/components/AttentionButtonContainer';
import { Picker } from '@react-native-picker/picker';
import { EasingFunctionsArray } from '@src/constants/EasingFunctions'
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
    const [pickerState, setPickerState] = useState<number>(0);
    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        score.current = score.current + 0.1;
        setValue(score.current.toFixed(1));
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>


                <Text>Select an easing function below</Text>
                <Score value={value} />

            </View>
            <Picker
                selectedValue={pickerState}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue, itemIndex) =>
                    setPickerState(itemIndex)
                }>
                {EasingFunctionsArray.map((item, index) => {
                    return <Picker.Item key={item.name} label={item.name} value={index} />

                })}
            </Picker>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AttentionButtonContainer onAnimationFinished={onMenuPress} easingInfo={EasingFunctionsArray[pickerState]} />
            </View>
        </SafeAreaView>

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
    }
})