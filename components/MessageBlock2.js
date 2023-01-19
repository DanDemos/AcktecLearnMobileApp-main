import React, { useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function MessageBlock2(props) {
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
        <View style={styles.messageBlock}>
            <Text style={styles.subject}>{props.message.subject}</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.username}>From: {props.message.sender_user}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.text}>Date: {strDate}</Text>
                    <Text style={styles.text}>Time: {strTime}</Text>
                </View>
            </View>
            <Text style={styles.messageText}>Message: {props.message.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    messageBlock: {
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
        padding: 20,
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        paddingBottom: 15,
        marginBottom: 15,
        paddingLeft: 10
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
    subject: {
        fontFamily: "Montserrat-SemiBold",
        color: "rgba(44,44,44,1)",
        lineHeight: 24,
        fontSize: 16,
        marginLeft: 10
    },
    username: {
        fontFamily: "Montserrat-Regular",
        color: "rgba(44,44,44,1)",
        lineHeight: 24,
        fontSize: 14,
        fontStyle: 'italic',
    },

    messageText: {
        fontFamily: "Montserrat-Regular",
        color: "rgba(44,44,44,1)",
        lineHeight: 24,
        fontSize: 14,
        marginLeft: 10
    },
});

export default MessageBlock2;
