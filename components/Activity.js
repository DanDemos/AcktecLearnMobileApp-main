import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation';

function Activity(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });

    return (
        <View style={styles.activity}>
            <FontAwesomeIcon
                icon={props.icon}
                style={[styles.activityIcon, { color: props.color }]}
                size={30}
            />
            <Text style={styles.activityTxt}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    activity: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 5,
        width: '90%',
        alignItems: 'center'
    },
    activityIcon: {
        marginRight: 30,
        color: 'rgba(0,0,0,0.7)'
    },
    activityTxt: {
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,1)',
        fontSize: 15,
        lineHeight: 26,
    },
});


export default Activity;