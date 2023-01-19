import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { faPen, faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import moment, { now } from 'moment';
import PhoneInput from "react-native-phone-number-input";

import SideNavBar from '../components/SideNavBar';
import TextBox from '../components/TextBox';
import CircleButton from '../components/CircleButton';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopHeaderBar from '../components/TopHeaderBar';
import axios from 'axios';

// Import Base URL to change domain name
import { BaseURL } from './BaseURL';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [DOB, setDOB] = useState(new Date());
    const [openDOB, setDOBOpen] = useState(false);
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInput = useRef(null);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    }
    const [isLoaded, setIsLoaded] = useState(false)

    const getProfile = () => {
        axios.get(
            `${BaseURL.appURL}/call/api/v1/getuserprofile`,
            config
        ).then(function (res) {
            if (res.status == 200) {
                // set all necessary info to respective fields
                setUsername(res.data.user_info.username);
                setFirstName(res.data.user_info.firstname);
                setLastName(res.data.user_info.lastname);
                setDateOfBirth(res.data.user_info.dateofbirth === "0000-00-00" ? now() : res.data.user_info.dateofbirth);
                setCountryCode(res.data.user_info.countrycode)
                setPhoneNumber(res.data.user_info.mobileno)
                setEmail(res.data.user_info.email)
                setCompanyName(res.data.user_info.companyname == "null" ? "" : res.data.user_info.companyname);
                setVehiclePlateNumber(res.data.user_info.vehicleplatenumber == "null" ? "" : res.data.user_info.vehicleplatenumber);
                setProfileImage(res.data.user_info.profileimage)
                setIsLoaded(true)
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg + "\nPlease try again!")
            setTimeout(() => {
                setErrorMsg('')
            }, 2000);
        });
    }

    const updateProfile = () => {
        // if (username != '' && firstName != '' && lastName != '' && phoneNumber != '' && email != '' && companyName != '' && vehiclePlateNumber != '') {
        // Define Date format which have same as database
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
            username: username,
            firstname: firstName,
            lastname: lastName,
            dob: [year, month, day].join('-'),
            countrycode: phoneInput.current?.getCountryCode(),
            mobile: phoneNumber,
            email: email,
            companyname: companyName,
            vehicleplatenumber: vehiclePlateNumber,
        };
        axios.post(
            `${BaseURL.appURL}/call/api/v1/updateuserprofile`,
            data,
            config
        ).then(function (res) {
            if (res.status == 200) {
                setSuccessMsg(res.data.msg)
                setTimeout(() => {
                    setSuccessMsg('')
                }, 2000);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg + "\nPlease try again!")
            setTimeout(() => {
                setErrorMsg('')
            }, 2000);
        });
        // }
    }

    const updatePassword = () => {
        if (newPassword != '' && confirmPassword != '' && currentPassword != '') {
            var data = {
                new_password: newPassword,
                confirm_password: confirmPassword,
                current_password: currentPassword,
            }
            axios.post(
                `${BaseURL.appURL}/call/api/v1/updatePassword`,
                data,
                config
            ).then(function (res) {
                if (res.status == 200) {
                    setSuccessMsg(res.data.msg)
                    setTimeout(() => {
                        setSuccessMsg('')
                    }, 2000);
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg + "\nPlease try again!")
                setTimeout(() => {
                    setErrorMsg('')
                }, 2000);
            });
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (!isLoaded) ? (<View style={styles.container}><Text> Loading...</Text></View>) : (
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
                <View style={styles.profileDisplay}>
                    {(profileImage == "" || profileImage == null) ?
                        (<Image source={require('../assets/images/User_icon.png')}
                            resizeMode='contain' style={styles.profile}></Image>) :
                        (<Image source={{
                            uri: `${BaseURL.mainURL}/${profileImage}`
                        }}
                            resizeMode='contain' style={styles.profile}></Image>)
                    }
                    {/* <TouchableOpacity style={styles.delete}>
                        <Text style={styles.deleteTxt}>&#x2715;</Text>
                    </TouchableOpacity>
                    <CircleButton
                        style={styles.edit}
                        icon={faPen}
                        size={15} /> */}
                </View>
                <View style={styles.form}>
                    <Text style={styles.title}>My Profile</Text>
                    <View style={styles.divider}></View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Username</Text>
                        <TextBox
                            style={[styles.textbox, { backgroundColor: '#F5F5F5' }]}
                            value={username}
                            editable={false}
                            selectTextOnFocus={false} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>First Name</Text>
                        <TextBox
                            style={styles.textbox}
                            value={firstName}
                            editable={false}
                            onChangeText={text => setFirstName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextBox
                            style={styles.textbox}
                            value={lastName}
                            editable={false}
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
                            name={moment(dateOfBirth).format('DD/MM/YYYY')} />
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
                        <Text style={styles.label}>Mobile Number </Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode={countryCode == "" ? "SG" : countryCode}
                            containerStyle={styles.textbox}
                            textContainerStyle={styles.phoneInputContainer}
                            addInternationalOption={false}
                            // onChangeFormattedText={(text) => {
                            //     setPhoneNumber(text)
                            // }}
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                            }}
                        />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextBox
                            style={styles.textbox}
                            value={email}
                            editable={false}
                            onChangeText={text => setEmail(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Company Name</Text>
                        <TextBox
                            style={styles.textbox}
                            value={companyName}
                            onChangeText={text => setCompanyName(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Vehicle Plate Number</Text>
                        <TextBox
                            style={styles.textbox}
                            value={vehiclePlateNumber}
                            onChangeText={text => setVehiclePlateNumber(text)} />
                    </View>
                    <Button name={'Save Changes'} style={{ backgroundColor: `rgba(${colors.mainColor},1)`, alignSelf: 'flex-end' }} onPress={updateProfile} />
                </View>
                <View style={styles.form}>
                    <Text style={styles.title}>Change Password</Text>
                    <View style={styles.divider}></View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Current Password</Text>
                        <TextBox
                            style={styles.textbox}
                            secureTextEntry={true}
                            onChangeText={text => setCurrentPassword(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>New Password</Text>
                        <TextBox
                            style={styles.textbox}
                            secureTextEntry={true}
                            onChangeText={text => setNewPassword(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <TextBox
                            style={styles.textbox}
                            secureTextEntry={true}
                            onChangeText={text => setConfirmPassword(text)} />
                    </View>
                    <Button name={'Save Password'} style={{ backgroundColor: `rgba(${colors.mainColor},1)`, alignSelf: 'flex-end' }} onPress={updatePassword} />
                </View>
                <Footer />
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
    }
});

export default Profile
