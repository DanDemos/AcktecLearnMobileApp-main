import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation';

function CircleButton(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.press}>
            {props.view}
            <FontAwesomeIcon icon={props.icon} style={styles.icon} size={props.size} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: 'rgba(128,128,128,1)',
    },
});


export default CircleButton;