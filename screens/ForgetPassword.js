import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import LoginBackground from '../components/LoginBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ForgetPassword(props) {
    const [email, setEmail] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    const forgetPassword = event => {
        if (event) {
            event.preventDefault();
        }
        var data = {
            email: email,
        }
        axios.post(`${BaseURL.appURL}/call/api/v1/forgetpassword`, data
        ).then(function (res) {
            if (res.status == 200) {
                setSuccessMsg('Please check your email for instructions to reset your password.');
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
        });
    }
    return (
        <View style={styles.container}>
            <LoginBackground />
            <View style={styles.loginBox}>
                <LogoWithTitle
                    description={'Forget Password'} />
                <View style={styles.forgetPassword}>
                    <Text style={styles.instruction}>We will send you a 6 digit code to your email address.</Text>
                    <TextBox
                        style={styles.email}
                        onChangeText={newText => setEmail(newText)}
                        placeholder={'Enter your login email'}></TextBox>
                    {successMsg != '' ? <Text style={styles.success}>{successMsg}</Text> : null}
                    {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
                    <Button
                        onPress={forgetPassword}
                        name={'Send Email'}
                        style={{ backgroundColor: `rgba(${colors.mainColor},1)` }} />
                    <View style={styles.divider}></View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.link}>Back to login</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        minHeight: windowHeight,
        width: windowWidth,
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
    forgetPassword: {
        width: windowWidth,
        paddingLeft: 35,
        paddingRight: 35,
        alignItems: 'center'
    },
    instruction: {
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(18,18,18,0.5)',
        fontSize: 16,
        marginTop: 15,
        lineHeight: 22,
        width: '70%',
        textAlign: 'center',
    },
    email: {
        height: 45,
        width: '75%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
        marginBottom: 20,
        marginTop: 15,
        marginLeft: 3,
        marginRight: 3
    },
    success: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#2DAB54',
        padding: 5,
        width: '70%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
    },
    error: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#ff7b7b',
        padding: 5,
        width: '70%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
    },
    divider: {
        width: '75%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 15,
        marginBottom: 5,
    },
    link: {
        fontFamily: 'Montserrat-Bold',
        color: `rgba(${colors.mainColor},1)`,
        fontSize: 12,
        textDecorationLine: 'underline',
        marginLeft: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default ForgetPassword;
