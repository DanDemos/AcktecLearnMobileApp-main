import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import Orientation from 'react-native-orientation';

function BreadCrumb(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <TouchableOpacity {...props}>
            <Text style={styles.breadcrumb}>{props.breadcrumb}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    breadcrumb: {
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(0,0,0,0.5)',
        lineHeight: 20,
        marginTop: 10,
        textDecorationLine: 'underline'
    },
});

export default BreadCrumb;
