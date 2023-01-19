import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SideNavBar from '../components/SideNavBar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import TopHeaderBar from '../components/TopHeaderBar';
import TextBox from '../components/TextBox';
import MessageBlock2 from '../components/MessageBlock2';
import { BaseURL } from './BaseURL';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Message(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [message, setMessage] = useState([]);
    const [reply, setReply] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    // get message info by message id
    const getOneMessage = () => {
        axios.post(`${BaseURL.appURL}/call/api/v1/getOneMessage`,
            { message_id: props.message_id },
            config
        ).then(function (res) {
            if (res.status == 200) {
                setReply('');
                setMessage(res.data.message);
                updateAnnouncementStatus(res.data.message);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg);
        });
    };

    // close opened message by message id
    const closeMesssage = () => {
        if (message[0].status == 'open') {
            axios.post(`${BaseURL.appURL}/call/api/v1/closeMessage`,
                { message_id: props.message_id },
                config
            ).then(function (res) {
                if (res.status == 200) {
                    getOneMessage();
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg);
            });
        }
    };

    // re-open closed message by message id
    const reopenMessage = () => {
        if (message[0].status == 'close') {
            axios.post(`${BaseURL.appURL}/call/api/v1/reopenMessage`,
                { message_id: props.message_id },
                config
            ).then(function (res) {
                if (res.status == 200) {
                    getOneMessage();
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg);
            });
        }
    };

    // update the status to 'read' when user read the announcement
    const updateAnnouncementStatus = (message) => {
        if (message[0].status == 'announcement') {
            axios.post(`${BaseURL.appURL}/call/api/v1/updateAnnouncementStatus`,
                { message_id: props.message_id },
                config
            ).then(function (res) {
                if (res.status == 200) {
                    getOneMessage();
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg);
            });
        }
    };

    // reply to specific opened message by message id
    const replyMessage = () => {
        if (message[0].status == 'open') {
            var data = {
                message_id: props.message_id,
                organization: message[0].send_to,
                username: message[0].sender_user,
                email: message[0].sender_email,
                userroleID: message[0].sender_role_id,
                subject: message[0].subject,
                message: reply
            };
            axios.post(`${BaseURL.appURL}/call/api/v1/replyMessage`,
                data,
                config
            ).then(function (res) {
                if (res.status == 200) {
                    getOneMessage();
                }
            }).catch(function (error) {
                setErrorMsg(error.response.data.msg);
            });
        }
    };

    useEffect(() => {
        getOneMessage();
        Orientation.lockToPortrait();
    }, []);

    const renderMessage = (message, index) => {
        return (
            <MessageBlock2 key={index} message={message} />
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
                <TopHeaderBar
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    background={{ backgroundColor: '#FFFFFF' }}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole}
                />
                <TouchableOpacity style={styles.BreadCrumbWrap} onPress={() => props.navigation.navigate('Messages')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={styles.arrow}
                        size={25}
                    />
                    <Text style={styles.BreadCrumbWrapTxt}>Messages &nbsp;&gt;&nbsp; {message[0] ? message[0].subject : null}</Text>
                </TouchableOpacity>
                <View style={styles.closeTicketWrap}>
                    <Text style={styles.statusText}>Message Status: {message[0] ? message[0].status : null}</Text>
                    {message[0] && message[0].status == 'open' ? <Button
                        name={'Close Ticket'}
                        style={[styles.button, { backgroundColor: 'rgba(69,200,109,1)' }]}
                        onPress={closeMesssage} /> : null}
                    {message[0] && message[0].status == 'close' ? <Button
                        name={'Re-open'}
                        style={[styles.button, { backgroundColor: 'rgba(69,200,109,1)' }]}
                        onPress={reopenMessage} /> : null}
                </View>
                {message[0] && message[0].status == 'open' ?
                    <View style={styles.replyWrap}>
                        <Text style={styles.replyTitle}>Reply</Text>
                        <TextBox
                            style={styles.textArea}
                            placeholder={'Type your message here.'}
                            value={reply}
                            multiline
                            numberOfLines={10}
                            onChangeText={text => setReply(text)} />
                        <Button
                            name={'Send'}
                            style={[styles.button, { backgroundColor: 'rgba(69,200,109,1)' }]}
                            onPress={replyMessage} />
                    </View> : null}
                <View style={styles.messageWrap}>
                    {message.map(renderMessage)}
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
    closeTicketWrap: {
        alignSelf: 'center',
        width: windowWidth - 50,
        marginTop: 10,
        paddingBottom: 10,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
    },
    replyWrap: {
        alignSelf: 'center',
        width: windowWidth - 50,
        marginTop: 30,
        paddingBottom: 10,
    },
    statusText: {
        fontFamily: 'Montserrat-Regular',
        color: '#000000',
        fontSize: 18,
        lineHeight: 20,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 15
    },
    replyTitle: {
        fontFamily: 'Montserrat-Medium',
        color: '#000000',
        fontSize: 18,
        lineHeight: 20,
        marginBottom: 15
    },
    textArea: {
        width: '100%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
        marginBottom: 15
    },
    button: {
        width: windowWidth - 50,
        marginBottom: 5,
    },
    messageWrap: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 50
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default Message;