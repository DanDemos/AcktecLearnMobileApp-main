import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';
import SideNavBar from '../components/SideNavBar';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';
import DropdownList from '../components/DropdownList';
import Footer from '../components/Footer';
import Button from '../components/Button';
import GreenBox from '../components/GreenBox';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const receiver = [{ value: 'ACKTEC Support Team' },{ value: 'Organization' }];

function Help(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [openReceiverDropdown, setOpenReceiverDropdown] = useState(false);
    const [receiver, setReceiver] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [selectedValue, setSelectedValue] = useState('Please select one');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const getHelpInfo = () => {
        axios.get(`${BaseURL.appURL}/call/api/v1/getHelpPageInfo`,
            config
        ).then(function (res) {
            if (res.status == 200) {
                // extract only the organization name into an array
                var array = [];
                for (let i = 0; i < res.data.organizations.length; i++) {
                    array.push({ value: res.data.organizations[i].organization_name });
                }

                setReceiver(array);
                setUserInfo(res.data.user_info);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
        });
    };

    const submitMessage = event => {
        if (event) {
            event.preventDefault();
        }
        if (selectedValue != '' && subject != '' && message != '') {
            var data = {
                organization: selectedValue,
                username: userInfo.username,
                email: userInfo.email,
                userroleID: userInfo.user_role_id,
                subject,
                message
            };
            axios.post(
                `${BaseURL.appURL}/call/api/v1/submitFeedback`,
                data,
                config
            ).then(function (res) {
                if (res.status == 200) {
                    setSuccessMsg(res.data.msg);
                    // reset all fields
                    setTimeout(() => {
                        setSuccessMsg('');
                    }, 2000);
                    setReceiver([]);
                    setSubject('');
                    setMessage('');
                    setSelectedValue('Please select one');
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg + "\nPlease try again!");
                setTimeout(() => {
                    setErrorMsg('');
                }, 2000);
            });
        }
    };

    useEffect(() => {
        getHelpInfo();
        Orientation.lockToPortrait();
    }, []);

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
                <GreenBox
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    title={'Help'}
                    description={'Do you have any questions? Leave us a message.'}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole} />
                <View style={styles.form}>
                    <View style={styles.row}>
                        <Text style={styles.to}>To:</Text>
                        <Dropdown
                            openDropdown={openReceiverDropdown}
                            setOpenDropdown={setOpenReceiverDropdown}
                            selectedValue={selectedValue}
                            valueStyle={styles.receiverValue}
                            style={styles.receiverDropdown}
                            page={'Help'} />
                        {openReceiverDropdown ?
                            <DropdownList
                                setSelectedValue={setSelectedValue}
                                setOpenDropdown={setOpenReceiverDropdown}
                                data={receiver}
                                valueStyle={styles.receiverValueList}
                                width={windowWidth - 95}
                                top={42}
                                left={45}
                            /> : null}
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextBox
                            style={[styles.textbox, { backgroundColor: '#F5F5F5' }]}
                            value={userInfo.email}
                            editable={false}
                            selectTextOnFocus={false} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Subject</Text>
                        <TextBox
                            style={styles.textbox}
                            value={subject}
                            onChangeText={text => setSubject(text)} />
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Message</Text>
                        <TextBox
                            style={styles.textArea}
                            value={message}
                            placeholder={'Type your message here.'}
                            multiline
                            numberOfLines={10}
                            onChangeText={text => setMessage(text)} />
                    </View>
                    <Button name={'Send Message'} style={{ backgroundColor: `rgba(${colors.mainColor},1)` }} onPress={submitMessage} />
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
    form: {
        width: windowWidth,
        padding: 25,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 25,
        width: '100%'
    },
    column: {
        flexDirection: 'column',
        marginBottom: 25,
    },
    to: {
        fontFamily: "Montserrat-SemiBold",
        color: "rgba(44,44,44,0.5)",
        fontSize: 20,
        lineHeight: 24,
        marginTop: 8,
        marginRight: 15,
        width: 30
    },
    receiverDropdown: {
        width: windowWidth - 95,
    },
    receiverValue: {
        width: windowWidth - 135,
        fontSize: 16,
    },
    receiverValueList: {
        fontSize: 16,
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
    }
});

export default Help;
