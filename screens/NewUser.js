import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { now } from 'moment/moment';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PhoneInput from "react-native-phone-number-input";
import SideNavBar from '../components/SideNavBar';
import TextBox from '../components/TextBox';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopHeaderBar from '../components/TopHeaderBar';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function NewUser(props) {
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const [openSideNav, setOpenSideNav] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [DOB, setDOB] = useState(new Date());
    const [openDOB, setDOBOpen] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(now());
    //const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    const createUserByTeacher = () => {
        let d = new Date(dateOfBirth);
        let month = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        let year = d.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 0) {
            day = '0' + day;
        }

        var data = {
            firstname: firstName,
            lastname: lastName,
            dob: [year, month, day].join('-'),
            countrycode: phoneInput.current?.getCountryCode(),
            mobile: phoneNumber,
            email: email,
            username: userName,
            password: password,
            remarks: remarks
        };
        axios.post(
            `${BaseURL.appURL}/call/api/v1/registerbyteacher`,
            data,
            config
        ).then(function (res) {
            if (res.status == 201) {
                setSuccessMsg(res.data.msg);
                setTimeout(() => {
                    setSuccessMsg('');
                }, 2000);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg + "\nPlease try again!");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    };

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
                    background={{ backgroundColor: `rgba(${colors.mainColor},0.5)` }}
                    cartQuantity={props.cartQuantity}
                />
                <TouchableOpacity style={styles.BreadCrumbWrap} onPress={() => props.navigation.navigate('Class')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={styles.arrow}
                        size={25}
                    />
                    <Text style={styles.BreadCrumbWrapTxt}>Class &nbsp;&gt;&nbsp; Users &nbsp;&gt;&nbsp; New user</Text>
                </TouchableOpacity>
                <View style={styles.profileDisplay}>
                    <Image source={require('../assets/images/User_icon.png')}
                        resizeMode='contain' style={styles.profile}></Image>
                    {/* <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteTxt}>&#x2715;</Text>
                    </TouchableOpacity> */}
                    {/* <CircleButton
                        style={styles.edit}
                        icon={faPen}
                        size={15} /> */}
                </View>
                <View style={styles.form}>
                    <View style={styles.column}>
                        <Text style={styles.label}>First Name</Text>
                        <TextBox
                            style={styles.textbox}
                            onChangeText={text => setFirstName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextBox
                            style={styles.textbox}
                            onChangeText={text => setLastName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <Button
                            style={[styles.textbox, { justifyContent: 'flex-start', paddingLeft: 15 }]}
                            onPress={() => setDOBOpen(true)}
                            icon={faCalendar}
                            iconstyle={{ color: 'rgba(0,0,0,0.5)' }}
                            valueStyle={{ color: '#2C2C2C', fontFamily: 'Montserrat-Regular' }}
                            name={moment(dateOfBirth).format('YYYY-MM-DD')} />
                        <DatePicker
                            modal
                            open={openDOB}
                            date={DOB}
                            maximumDate={DOB}
                            mode={"date"}
                            onConfirm={(date) => {
                                setDOB(date)
                                setDOBOpen(false)
                                setDateOfBirth(date)
                            }}
                            onCancel={() => {
                                setDOBOpen(false)
                            }}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode={countryCode == "" ? "SG" : countryCode}
                            containerStyle={styles.textbox}
                            textContainerStyle={styles.phoneInputContainer}
                            addInternationalOption={false}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                            }}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextBox
                            style={styles.textbox}
                            onChangeText={text => setEmail(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Username</Text>
                        <TextBox
                            style={styles.textbox}
                            onChangeText={text => setUserName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Password</Text>
                        <TextBox
                            style={styles.textbox}
                            secureTextEntry={true}
                            onChangeText={text => setPassword(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Remarks</Text>
                        <TextBox
                            style={styles.textArea}
                            multiline
                            numberOfLines={5}
                            onChangeText={text => setRemarks(text)} />
                    </View>
                    <Button name={'Add New User'} style={{ backgroundColor: `rgba(${colors.mainColor},1)`, alignSelf: 'flex-end' }} onPress={createUserByTeacher} />
                </View>
                <Footer />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        backgroundColor: "#FFFFFF",
        height: windowHeight,
        width: windowWidth,
    },
    contentContainerStyle: {
        minHeight: windowHeight,
        width: windowWidth,
        backgroundColor: '#FFFFFF',
    },
    BreadCrumbWrap: {
        padding: 25,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        color: 'rgba(0,0,0,0.3)',
    },
    BreadCrumbWrapTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 15,
    },
    profile: {
        width: 170,
        height: 170,
    },
    profileDisplay: {
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
        fontSize: 18,
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
    textArea: {
        width: '100%',
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
    success: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#2DAB54',
        padding: 5,
        width: '100%',
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
        width: '100%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 15,
        top: 15
    },
});

export default NewUser;
