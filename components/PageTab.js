import React, { useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import colors from './../utils/colors';
import Orientation from 'react-native-orientation';

function PageTab(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <TouchableOpacity style={styles.pageTab} {...props}>
            <Text style={props.selectedTab == props.name ? [styles.tabName, styles.active] : styles.tabName}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pageTab: {
        marginRight: 30
    },
    active: {
        opacity: 1.0,
        borderBottomColor: `rgba(${colors.mainColor},0.7)`,
        borderBottomWidth: 5,
        borderRadius: 3,
    },
    tabName: {
        fontSize: 18,
        lineHeight: 24,
        fontFamily: "Montserrat-SemiBold",
        color: '#2C2C2C',
        opacity: 0.3,
    }
});

export default PageTab;