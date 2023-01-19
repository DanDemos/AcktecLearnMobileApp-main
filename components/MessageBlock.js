import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Dimensions } from "react-native";
import Orientation from 'react-native-orientation';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;

function MessageBlock(props) {
    var status = '';
    switch (props.message.status) {
        case 'open':
            status = 'Open';
            break;
        case 'close':
            status = 'Close';
            break;
        case 'read':
            status = 'Announcement';
            break;
        case 'announcement':
            status = 'Announcement';
            break;
        default:
            break;
    }

    var datetime = new Date(props.message.created_date);
    var month = datetime.getMonth() + 1;
    var day = datetime.getDate();
    var year = datetime.getFullYear();
    var hours = datetime.getHours();
    var minutes = datetime.getMinutes();
    var seconds = datetime.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    var strDate = day + '-' + month + '-' + year;

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    return (
        <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
            {props.message.status == 'open' ? <View style={styles.reddot} /> : null || props.message.status == 'announcement' ? <View style={styles.greendot} /> : null}
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.username}>{props.message.sender_user} {"\n"}-&gt; {props.message.send_to}</Text>
                    <Text style={styles.text}>{props.message.subject}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>{status != 'Announcement' ? 'Status: ' + status : status}</Text>
                    <Text style={styles.text}>Date: {strDate}</Text>
                    <Text style={styles.text}>Time: {strTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth - 50,
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 15,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 30,
        shadowOpacity: 1,
        shadowRadius: 10,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greendot: {
        position: 'absolute',
        top: -2,
        left: -2,
        width: 12,
        height: 12,
        backgroundColor: '#10af41',
        borderRadius: 50,
    },
    reddot: {
        position: 'absolute',
        top: -2,
        left: -2,
        width: 12,
        height: 12,
        backgroundColor: `rgba(${colors.mainColor},1)`,
        borderRadius: 50,
    },
    column: {
        flexDirection: 'column',
    },
    text: {
        fontFamily: "Montserrat-SemiBold",
        color: "rgba(44,44,44,0.5)",
        fontSize: 12,
        lineHeight: 12,
        marginTop: 5,
        marginBottom: 5,
        textAlignVertical: 'center'
    },
    username: {
        fontFamily: "Montserrat-SemiBold",
        color: "rgba(44,44,44,1)",
        lineHeight: 24,
        fontSize: 13,
    },
});

export default MessageBlock;
