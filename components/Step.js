import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Orientation from 'react-native-orientation';

function Step(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View
            style={[styles.step, props.style]}>
            <Text style={styles.stepText}>{props.stepNum}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    step: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#45c86d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
});


export default Step;