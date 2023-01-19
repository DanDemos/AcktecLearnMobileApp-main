import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    Switch
} from 'react-native';
import SideNavBar from '../components/SideNavBar';
import TextBox from '../components/TextBox';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopHeaderBar from '../components/TopHeaderBar';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NewCard(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [name, setName] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    return (
        <View style={styles.container}>
            {successMsg != '' ? <Text style={styles.success}>{successMsg}</Text> : null}
            {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
            {openSideNav ?
                <SideNavBar
                    setOpenSideNav={setOpenSideNav}
                    navigation={props.navigation}
                    token={props.token}
                    setToken={props.setToken}
                    setIsLoggedIn={props.setIsLoggedIn}
                /> : null}
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <TopHeaderBar
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole}
                />
                <View style={styles.form}>
                    <Text style={styles.title}>New Card</Text>
                    <View style={styles.divider}></View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Cardholder's Name</Text>
                        <TextBox
                            style={styles.textbox}
                            value={name}
                            onChangeText={text => setName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Card Number</Text>
                        <TextBox
                            style={styles.textbox}
                            value={cardNum}
                            keyboardType={'numeric'}
                            onChangeText={text => setCardNum(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Expiration Date</Text>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <TextBox
                                style={styles.textbox2}
                                value={month}
                                onChangeText={text => setMonth(text)} />
                            <TextBox
                                style={styles.textbox2}
                                value={year}
                                onChangeText={text => setYear(text)} />
                        </View>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>CVV</Text>
                        <TextBox
                            style={styles.textbox}
                            value={cvv}
                            keyboardType={'numeric'}
                            onChangeText={text => setCvv(text)} />
                    </View>
                    <View style={styles.row}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                            trackColor={{ false: "#ccc", true: "#45C86D" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={styles.defaultCard}>Use as default card</Text>
                    </View>
                    <Button
                        onPress={() => props.navigation.navigate('Payment')}
                        name={'Add new card'}
                        style={{ backgroundColor: '#ffc82d', marginTop: 50, width: '100%' }} />
                </View>
                <Footer style={styles.footer} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        backgroundColor: "#FFFFFF",
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center'
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
        position: 'absolute',
        zIndex: 15,
        top: 15
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
        position: 'absolute',
        zIndex: 15,
        top: 15
    },
    contentContainerStyle: {
        minHeight: windowHeight,
        width: windowWidth,
        backgroundColor: '#FFFFFF',
    },
    NewCard: {
        width: 170,
        height: 170,
    },
    NewCardDisplay: {
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 30,
    },
    delete: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 125,
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteTxt: {
        fontSize: 20,
        color: 'rgba(128,128,128,1)',
        fontFamily: "Montserrat-Bold",
    },
    edit: {
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 125,
        left: 125
    },
    form: {
        width: windowWidth,
        padding: 25,
    },
    title: {
        fontSize: 20,
        lineHeight: 30,
        color: '#2C2C2C',
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginTop: 10,
        marginBottom: 20,
    },
    column: {
        flexDirection: 'column',
        marginBottom: 25,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    defaultCard: {
        fontFamily: 'Montserrat-Regular',
        color: '#000000',
        fontSize: 16,
        lineHeight: 26,
        marginLeft: 15,
    },
    label: {
        fontSize: 15,
        lineHeight: 17,
        color: 'rgba(0,0,0,0.5)',
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 10,
    },
    textbox: {
        height: 45,
        width: '100%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
    },
    textbox2: {
        height: 45,
        width: '48%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
    },
    inputStyle: {
        color: '#000',
        paddingLeft: 10,
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        flex: 1,
        textAlignVertical: 'top',
    },
    phoneInputContainer: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        paddingTop: 0,
        paddingBottom: 0,
        height: 41,
        borderRadius: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default NewCard;
