import React, { useEffect, useRef, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, BackHandler, Animated, StyleSheet } from 'react-native';
import { SafeAreaView, StackActions } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';
import { Score } from '@src/components/Score';
import { AttentionButtonContainer } from '@src/components/AttentionButtonContainer';



/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const MasterScreen = (props: Props) => {
    const score = useRef(0);
    const [value, setValue] = useState("0.0");
    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        score.current = score.current + 0.1;
        setValue(score.current.toFixed(1));
    }




    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
                <Score value={value} />

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AttentionButtonContainer onAnimationFinished={onMenuPress} />
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