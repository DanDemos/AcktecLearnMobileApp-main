import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';
import { faUser, faUnlockKeyhole, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import LoginBackground from '../components/LoginBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import Stepper from '../components/Stepper';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import Footer from '../components/Footer';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const numOfSteps = 3;

function CreateAccount(props) {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    const register = event => {
        if (event) {
            event.preventDefault();
        }
        var data = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: username,
            password: password
        };
        if (firstName != '' && lastName != '' && email != '' && username != '' && password != '') {
            axios.post(`${BaseURL.appURL}/call/api/v1/auth/register`, data
            ).then(function (res) {
                if (res.status == 201) {
                    setSuccessMsg(res.data.msg);
                    setTimeout(() => {
                        // navigate back to login page when registered successfully
                        props.navigation.navigate('Login');
                    }, 2000);
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg);
            });
        }
    };

    return (
        <View style={styles.container}>
            <LoginBackground />
            <View style={styles.loginBox}>
                <LogoWithTitle />
                <View style={styles.createAccount}>
                    <Stepper style={styles.stepper} step={step} numOfSteps={numOfSteps} />
                    <Text style={styles.title2}>Create Your Account</Text>
                    <Text style={styles.description}>Account Details</Text>
                    {step == 1 ? <View style={styles.textboxWrap}>
                        <TextBox
                            style={[styles.textBox, styles.firstName]}
                            logo={faUser}
                            placeholder={'First Name'}
                            value={firstName}
                            onChangeText={newText => setFirstName(newText)}></TextBox>
                        <TextBox
                            style={[styles.textBox, styles.lastName]}
                            logo={faUser}
                            placeholder={'Last Name'}
                            value={lastName}
                            onChangeText={newText => setLastName(newText)}></TextBox>
                    </View> : null}
                    {step == 2 ? <View style={styles.textboxWrap}>
                        <TextBox
                            style={[styles.textBox, styles.firstName]}
                            logo={faEnvelope}
                            placeholder={'Email'}
                            value={email}
                            onChangeText={newText => setEmail(newText)}></TextBox>
                        <TextBox
                            style={[styles.textBox, styles.lastName]}
                            logo={faUser}
                            placeholder={'Username'}
                            value={username}
                            onChangeText={newText => setUsername(newText)}></TextBox>
                    </View> : null}
                    {step == 3 ? <View style={styles.textboxWrap}>
                        <Text style={styles.passwordHint}>Minimum 8 Characters, 1 Uppercase, 1 Lowercase, 1 number and 1 special character</Text>
                        <TextBox
                            style={[styles.textBox, styles.lastName, { marginTop: 0 }]}
                            logo={faUnlockKeyhole}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={newText => setPassword(newText)}></TextBox>
                        {successMsg != '' ? <Text style={styles.success}>{successMsg}</Text> : null}
                        {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
                    </View> : null}
                    <View style={styles.row}>
                        {/* all the steps after the first step display the previous button */}
                        {step > 1 ?
                            <Button
                                onPress={() => {
                                    if (step > 1) {
                                        var newStep = step - 1
                                        setStep(newStep)
                                    }
                                }}
                                name={'Previous'}
                                style={styles.button} />
                            : null
                        }
                        {/* all the steps before the last step display the next button */}
                        {step < numOfSteps ?
                            <Button
                                onPress={() => {
                                    if (step < numOfSteps) {
                                        var newStep = step + 1
                                        setStep(newStep)
                                    }
                                }}
                                name={'Next'}
                                style={styles.button} />
                            : null
                        }
                        {/* last step display register button */}
                        {step == numOfSteps ?
                            <Button
                                onPress={register}
                                name={'Register'}
                                style={styles.button} />
                            : null
                        }
                    </View>
                    <View style={styles.divider}></View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                        <Text style={styles.link}>Back to login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer style={styles.footer} />
        </View>
    );
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
        top: 100,
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
    createAccount: {
        width: windowWidth,
        paddingLeft: 35,
        paddingRight: 35,
        alignItems: 'center'
    },
    stepper: {
        width: '75%',
        height: 50,
    },
    title2: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,1)',
        fontSize: 20,
    },
    description: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(18,18,18,0.5)',
        fontSize: 16,
        marginTop: 3,
        width: '70%',
        textAlign: 'center',
    },
    textboxWrap: {
        width: '100%',
        alignItems: 'center',
    },
    textBox: {
        height: 45,
        width: '75%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
    },
    firstName: {
        marginTop: 26,
    },
    lastName: {
        marginTop: 15,
        marginBottom: 15,
    },
    row: {
        width: '75%',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-evenly',
    },
    button: {
        width: '40%',
        backgroundColor: `rgba(${colors.mainColor},1)`,
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
    passwordHint: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#2DAB54',
        padding: 5,
        width: '75%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
        marginTop: 15,
    },
    success: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#2DAB54',
        padding: 5,
        width: '75%',
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
        width: '75%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default CreateAccount;
