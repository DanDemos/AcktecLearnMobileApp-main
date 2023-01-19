import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation';

function Button(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <TouchableOpacity
            {...props}
            style={[styles.button, props.style]}>
            {props.icon ? <FontAwesomeIcon style={[styles.icon, props.iconstyle]} icon={props.icon} /> : null}
            <Text style={[styles.buttonText, props.valueStyle]}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '50%',
        height: 40,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
        marginRight: 15,
    },
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(255,255,255,1)',
        fontSize: 16,
        textAlign: 'center'
    },
});


export default Button;