// this page is not needed for now

import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native'

import LoginBackground from '../components/LoginBackground'
import LogoWithTitle from '../components/LogoWithTitle'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import Footer from '../components/Footer'

const windowWidth = Dimensions.get('window').width

function ResetPassword(props) {
    return (
        <View style={styles.container}>
            <LoginBackground />
            <View style={styles.loginBox}>
                <LogoWithTitle
                    description={'Reset Password'} />
                <View style={styles.forgetPassword}>
                    <Text style={styles.label}>
                        New Password
                    </Text>
                    <TextBox
                        style={styles.textbox}
                        secureTextEntry={true}></TextBox>
                    <Text style={styles.label}>
                        Confirm Password
                    </Text>
                    <TextBox
                        style={styles.textbox}
                        secureTextEntry={true}></TextBox>
                    <Button
                        name={'Reset Password'}
                        style={{ backgroundColor: 'rgba(69,200,109,1)',marginTop: 25 }} />
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
    label: {
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,0.9)',
        fontSize: 12,
        lineHeight: 15,
        marginTop: 20,
        width: '75%'
    },
    textbox: {
        height: 45,
        width: '75%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
        marginTop: 5,
        marginLeft: 3,
        marginRight: 3
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
        color: 'rgba(69,200,109,1)',
        fontSize: 12,
        textDecorationLine: 'underline',
        marginLeft: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
})

export default ResetPassword
