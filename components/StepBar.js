import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function StepBar(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View
            style={[styles.bar, props.style, { width: (((windowWidth - 80) * 0.75) - (props.numOfSteps * 50)) / (props.numOfSteps - 1) }]}>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        width: windowWidth - 80,
        height: 5,
        borderRadius: 50,
        backgroundColor: '#d8d8d8',
        marginLeft: 5,
        marginRight: 5
    },
});


export default StepBar;