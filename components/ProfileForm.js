import React, { useRef, useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    Switch
} from 'react-native';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import PhoneInput from "react-native-phone-number-input";
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { BaseURL } from '../screens/BaseURL';
import { now } from 'moment/moment';
import axios from 'axios';
import colors from './../utils/colors';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function ProfileForm(props) {
    const config = {
        headers: { Authorization: `Bearer ${props.user.token}` }
    };
    const [DOB, setDOB] = useState(new Date());
    const [openDOB, setDOBOpen] = useState(false);
    const phoneInput = useRef(null);
    const [firstName, setFirstName] = useState(props.user.firstname);
    const [lastName, setLastName] = useState(props.user.lastname);
    const [countryCode, setCountryCode] = useState(props.user.countrycode);
    const [phoneNumber, setPhoneNumber] = useState(props.user.mobileno);
    const [username, setUsername] = useState(props.user.username);
    const [dateOfBirth, setDateOfBirth] = useState(props.user.dateofbirth === "0000-00-00" ? now() : props.user.dateofbirth);
    const [email, setEmail] = useState(props.user.email);
    const [companyName, setCompanyName] = useState(props.user.companyname);
    const [vehiclePlateNumber, setVehiclePlateNumber] = useState(props.user.vehicleplatenumber);
    const [profileImage, setProfileImage] = useState(props.user.profileimage);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isEnabled, setIsEnabled] = useState(props.user.isActive == 1 ? true : false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    const updateUser = () => {
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
            firstname: firstName,
            lastname: lastName,
            dob: [year, month, day].join('-'),
            countrycode: phoneInput.current?.getCountryCode(),
            mobile: phoneNumber,
            email: email,
            username: username,
            password: password,
            remarks: remarks,
            isActive: isEnabled == true ? "1" : "0"
        };
        if (data.firstname == "") {
            setErrorMsg("First Name can't be blank");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
            return;
        }

        if (data.lastname == "") {
            setErrorMsg("Last Name can't be blank");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
            return;
        }

        if (data.email == "") {
            setErrorMsg("Email can't be blank");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
            return;
        }

        if (data.dob == "") {
            setErrorMsg("DOB can't be blank");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
            return;
        }

        if (data.password == "") {
            setErrorMsg("Password can't be blank");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
            return;
        }

        axios.post(
            `${BaseURL.appURL}/call/api/v1/updateuser`,
            data,
            config
        ).then(function (res) {
            if (res.status == 200) {
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
    }

    return (
        <View>
            {successMsg != '' ? <Text style={styles.success}>{successMsg}</Text> : null}
            {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
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
                <View style={styles.column}>
                    <Text style={styles.label}>First Name</Text>
                    {firstName == "" ? <TextBox
                        style={styles.textbox}
                        value={firstName}
                        onChangeText={text => setFirstName(text)} />
                        :
                        <TextBox
                            style={styles.textbox}
                            value={firstName}
                            editable={false}
                            onChangeText={text => setFirstName(text)} />
                    }
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Last Name</Text>
                    {lastName == "" ? <TextBox
                        style={styles.textbox}
                        value={lastName}
                        onChangeText={text => setLastName(text)} />
                        :
                        <TextBox
                            style={styles.textbox}
                            value={lastName}
                            editable={false}
                            onChangeText={text => setLastName(text)} />
                    }

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
                {/* <View style={styles.column}>
                    <Text style={styles.label}>Mobile Number</Text>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={phoneNumber}
                        defaultCode="SG"
                        containerStyle={styles.textbox}
                        textContainerStyle={styles.phoneInputContainer}
                        onChangeFormattedText={text => {
                            setphoneNumber(text);
                        }}
                    />
                </View> */}
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
                    {email == "" ? <TextBox
                        style={styles.textbox}
                        value={email}
                        onChangeText={text => setEmail(text)} />
                        :
                        <TextBox
                            style={styles.textbox}
                            value={email}
                            editable={false}
                            onChangeText={text => setEmail(text)} />
                    }

                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Username</Text>
                    <TextBox
                        style={styles.textbox}
                        value={username}
                        editable={false}
                        selectTextOnFocus={false} />
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
                <View style={styles.column}>
                    <Text style={styles.label}>isActive</Text>
                    <Switch
                        style={{ transform: [{ scaleX: -1.0 }, { scaleY: 1.4 }], left: 0 }}
                        trackColor={{ false: "#ccc", true: "#45C86D" }}
                        thumbColor={"#f4f3f4"}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Button name={props.for == 'editUserInfo' ? 'Save Changes' : 'Add New User'} style={{ backgroundColor: `rgba(${colors.mainColor},1)`, alignSelf: 'flex-end' }} onPress={updateUser} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginBottom: 0,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 15,
        bottom: 0.1
    },
    error: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#ff7b7b',
        padding: 5,
        width: '100%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 0,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 15,
        bottom: 0.1
    },
});

export default ProfileForm;
