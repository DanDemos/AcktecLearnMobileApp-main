import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import GreenBox from '../components/GreenBox';
import SearchBar from '../components/SearchBar';
import MessageBlock from '../components/MessageBlock';
import colors from './../utils/colors';
import { BaseURL } from './BaseURL';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Messages(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [pressed, setPressed] = useState('all');;
    const [messages, setMessages] = useState([]);
    const [numOfOpen, setNumOfOpen] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    // get all messages to display in the page
    const getAllMessages = () => {
        axios.get(`${BaseURL.appURL}/call/api/v1/getAllMessages`, config
        ).then(function (res) {
            if (res.status == 200) {
                var count = 0;
                setMessages(res.data.messages);
                // get the number of opened messages to indicate on the top of the page
                for (let i = 0; i < res.data.messages.length; i++) {
                    if (res.data.messages[i].status == 'open') {
                        count++;
                    }
                }
                setNumOfOpen(count);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    };

    // get only the opened messages
    const getOpenMessages = () => {
        axios.get(`${BaseURL.appURL}/call/api/v1/getOpenMessages`, config
        ).then(function (res) {
            if (res.status == 200) {
                setMessages(res.data.messages);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    };

    // get only the closed messages
    const getCloseMessages = () => {
        axios.get(`${BaseURL.appURL}/call/api/v1/getCloseMessages`, config
        ).then(function (res) {
            if (res.status == 200) {
                setMessages(res.data.messages);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    };

    // get only the announcement
    const getAnnouncements = () => {
        axios.get(`${BaseURL.appURL}/call/api/v1/getAnnouncements`, config
        ).then(function (res) {
            if (res.status == 200) {
                setMessages(res.data.messages);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    };

    // handle the changes on which button the user clicked on
    const handleOnPress = (value) => {
        switch (value) {
            case 'all':
                getAllMessages();
                break;
            case 'open':
                getOpenMessages();
                break;
            case 'close':
                getCloseMessages();
                break;
            case 'announcement':
                getAnnouncements();
                break;
            default:
                getAllMessages();
                break;
        }
        setPressed(value);
    };

    useEffect(() => {
        getAllMessages();
        Orientation.lockToPortrait();
    }, []);

    const renderMessage = (message, index) => {
        return (
            <MessageBlock key={index} style={styles.message} message={message} onPress={() => { props.setMessageID(message.message_id); props.navigation.navigate('Message') }} />
        );
    };

    return (
        <View style={styles.container}>
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
                    title={'My Inbox'}
                    description={`You have ${numOfOpen} open messages!`}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole} />
                {/* <SearchBar style={styles.searchBar} placeholder={'Search for a message'} /> */}
                <View style={styles.form}>
                    <Button
                        name={'All Messages'}
                        style={pressed == 'all' ? [styles.button, { backgroundColor: `rgba(${colors.mainColor},1)` }] : styles.button}
                        valueStyle={pressed != 'all' ? { color: '#000000' } : null}
                        onPress={() => handleOnPress('all')} />
                    <Button
                        name={'Opened Messages'}
                        style={pressed == 'open' ? [styles.button, { backgroundColor: `rgba(${colors.mainColor},1)` }] : styles.button}
                        valueStyle={pressed != 'open' ? { color: '#000000' } : null}
                        onPress={() => handleOnPress('open')} />
                    <Button
                        name={'Closed Messages'}
                        style={pressed == 'close' ? [styles.button, { backgroundColor: `rgba(${colors.mainColor},1)` }] : styles.button}
                        valueStyle={pressed != 'close' ? { color: '#000000' } : null}
                        onPress={() => handleOnPress('close')} />
                    <Button
                        name={'Announcements'}
                        style={pressed == 'announcement' ? [styles.button, { backgroundColor: `rgba(${colors.mainColor},1)` }] : styles.button}
                        valueStyle={pressed != 'announcement' ? { color: '#000000' } : null}
                        onPress={() => handleOnPress('announcement')} />
                </View>
                <View style={styles.messageWrap}>
                    {messages.map(renderMessage)}
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
    },
    contentContainerStyle: {
        minHeight: windowHeight,
        width: windowWidth,
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        position: 'absolute',
        top: 205,
        zIndex: 4,
        height: 50,
        width: windowWidth - 50,
        marginTop: 7,
        alignSelf: 'center',
    },
    form: {
        alignSelf: 'center',
        width: windowWidth - 50,
        marginTop: 50,
        paddingBottom: 10,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 2,
    },
    messageWrap: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 50
    },
    message: {
        marginBottom: 15,
    },
    button: {
        width: windowWidth - 50,
        marginBottom: 5
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default Messages;
