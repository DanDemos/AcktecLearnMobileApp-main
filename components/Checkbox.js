import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Pressable,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Orientation from 'react-native-orientation';

function Checkbox(props) {
    const [checked, setChecked] = useState(false);

    function onCheckmarkPress() {
        setChecked(!checked);
    }

    useEffect(() => {
        Orientation.lockToPortrait();
    })

    return (
        <Pressable
            style={[styles.checkboxBase, checked ? styles.checkboxChecked : null, props.style]}
            onPress={onCheckmarkPress}>
            {checked ? <FontAwesomeIcon icon={faCheck} size={13} color={'white'} /> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#45C86D',
    },
});


export default Checkbox;