import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import LoginBackground from '../components/LoginBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import Button from '../components/Button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const numOfSteps = 3;

import colors from '../utils/colors';

function TermAndCondition(props) {
    return (
        <View style={styles.container}>
            <LoginBackground />
            <View style={styles.loginBox}>
                <LogoWithTitle />
                <View style={styles.TermAndCondition}>
                    <Text style={styles.title2}>Terms & Conditions</Text>
                    <Text style={styles.description}>
                        I consent to the collection, use and disclosure of my personal information and the personal information of my child by MindChamps Holdings Pte Limited, its related corporations and the franchisees of its related corporations (individually and collectively the “MindChamps Group”) for the purposes of (a) processing and responding to my enquiries; (b) providing services and sending you information on special events, promotions, offers and other marketing and promotional material; and (c) such other purposes as set out in section 2 of MindChamps’ Privacy Policy, which can be accessed at https://www.mindchamps.org/privacy-policy/, in accordance with the Personal Data Protection Act 2012 and MindChamps’ Privacy Policy.
                    </Text>
                    <View style={styles.divider}></View>
                    <Button onPress={() => props.navigation.navigate('Login')}
                        name={'Agree & Continue'}
                        style={styles.button} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: windowHeight,
        width: windowWidth,
    },
    loginBox: {
        position: 'absolute',
        top: 50,
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
    TermAndCondition: {
        width: windowWidth,
        paddingLeft: 35,
        paddingRight: 35,
        alignItems: 'center',
    },
    title2: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,1)',
        fontSize: 20,
        textAlign: 'left'
    },
    description: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(18,18,18,0.5)',
        fontSize: 14,
        marginTop: 10,
        width: '80%',
        textAlign: 'justify',
    },
    button: {
        marginTop: 10,
        width: '50%',
        backgroundColor: `rgba(${colors.mainColor},1)`,
    },
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
})

export default TermAndCondition
