import React, { useEffect } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function LoginBackgroundBox() {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <ImageBackground
            // source={require('../assets/images/Landing_page.png')}
            resizeMode='contain'
            style={styles.background} />
    );
}

const styles = StyleSheet.create({
    background: {
        width: windowWidth,
        height: windowHeight - 30,
        alignItems: 'center',
        zIndex: 0,
    },
});

export default LoginBackgroundBox;