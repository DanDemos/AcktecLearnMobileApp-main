import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Step from './Step';
import StepBar from './StepBar';
import Orientation from 'react-native-orientation';

function Stepper(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });

    return (
        <View
            style={[styles.stepper, props.style]}>
            <Step stepNum={'1'} />
            <StepBar numOfSteps={props.numOfSteps} style={props.step >= 2 ? { backgroundColor: '#45c86d' } : null} />
            <Step stepNum={'2'} />
            <StepBar numOfSteps={props.numOfSteps} style={props.step >= 3 ? { backgroundColor: '#45c86d' } : null} />
            <Step stepNum={'3'} />
        </View>
    );
}

const styles = StyleSheet.create({
    stepper: {
        width: '75%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Stepper;