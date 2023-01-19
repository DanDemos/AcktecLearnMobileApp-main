import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';
import Orientation from 'react-native-orientation';

function LoginBackgroundBox(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/big_logo.png')}
                resizeMode='contain'
                style={styles.logo} />
            {/* <Text style={styles.appName}>ACKTEC Learn</Text> */}
            {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
            {props.description ? <Text style={styles.description}>{props.description}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: 200,
        height: 100,
    },
    appName: {
        fontFamily: 'Mulish-SemiBold',
        color: 'rgba(0,0,0,0.7)',
        fontSize: 19,
        marginBottom: 15,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,1)',
        fontSize: 26,
        margin: 0,
        padding: 0
    },
    description: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(18,18,18,0.5)',
        fontSize: 16,
        // marginTop: 3,
        width: '70%',
        textAlign: 'center',
        margin: 0,
        padding: 0
    },
});

export default LoginBackgroundBox;