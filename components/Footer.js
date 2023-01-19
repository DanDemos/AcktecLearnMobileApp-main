import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function Footer(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View style={[styles.footerWrap, props.style]}>
            <Text style={styles.footer}>
                © {new Date().getFullYear()} ACKTEC Technologies Pte Ltd. All rights reserved.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footerWrap: {
        width: windowWidth,
        height: 40,
        backgroundColor: '#EFEFEF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
    },
});


export default Footer;