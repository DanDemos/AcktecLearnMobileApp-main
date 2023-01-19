import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import LoginBackground from '../components/LoginBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import Footer from '../components/Footer';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function Logout() {

    useEffect(() => {
        Orientation.lockToPortrait;
    });

    return (
        <View style={styles.container}>
            <LoginBackground />
            <View style={styles.loginBox}>
                <LogoWithTitle

                    title={'Signed Out!'}
                    description={'You will be redirected to main page.'} />
            </View>
            <Footer style={styles.footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBox: {
        position: 'absolute',
        width: windowWidth - 80,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 40,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 12,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'center',
        padding: 20,
        paddingBottom: 25,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default Logout;
