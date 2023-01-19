import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import colors from './../utils/colors';
import Orientation from 'react-native-orientation';

function NavTab(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <TouchableOpacity
            style={props.selectedPage == props.pageName ? [styles.selectedNavTabButton, styles.navTabButton] : styles.navTabButton}
            {...props}>
            <View style={styles.navTabWrap}>
                <FontAwesomeIcon
                    icon={props.icon}
                    style={props.selectedPage == props.pageName ? [styles.navTabIcon, styles.selected] : styles.navTabIcon}
                    size={25}
                />
                <Text style={props.selectedPage == props.pageName ? [styles.navTabLink, styles.selected] : styles.navTabLink}>{props.tabName}</Text>
                {props.selectedPage == props.pageName ?
                    <View style={styles.navbarHighlight}></View> : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    navTab: {
        width: 200,
        height: 48,
        backgroundColor: `rgba(${colors.mainColor},1)`,
    },
    selectedNavTabButton: {
        width: 195,
        backgroundColor: `rgba(${colors.mainColor},0.2)`
    },
    navTabButton: {
        width: 200,
        height: 48,
        flexDirection: 'row',
    },
    selected: {
        color: `rgba(${colors.mainColor},1)`
    },
    navTabIcon: {
        color: `rgba(${colors.mainColor},1)`,
        marginTop: 12,
        marginLeft: 30,
    },
    navTabLink: {
        fontFamily: 'Montserrat-SemiBold',
        color: `rgba(${colors.mainColor},1)`,
        width: 122,
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 18,
        marginTop: 14,
    },
    navbarHighlight: {
        width: 5,
        height: 48,
        backgroundColor: `rgba(${colors.mainColor},1)`,
        borderRadius: 10,
    },
    navTabWrap: {
        width: 200,
        height: 48,
        flexDirection: 'row',
        flex: 1,
    },
});

export default NavTab;