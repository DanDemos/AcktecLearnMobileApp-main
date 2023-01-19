import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation';
import TopHeaderBar from '../components/TopHeaderBar';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;

function GreenBox(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View style={styles.colorBox}>
            <TopHeaderBar
                {...props} />
            <View style={styles.titleWrap}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.description}>
                    {props.description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    greenBox: {
        width: windowWidth,
        height: 240,
        backgroundColor: `rgba(${colors.mainColor},0.7)`,
        alignItems: 'center'
    },
    titleWrap: {
        width: windowWidth - 80,
    },
    title: {
        fontFamily: "Montserrat-SemiBold",
        color: `rgba(${colors.mainRelatedColor},1)`,
        fontSize: 22,
        marginTop: 30,
    },
    description: {
        fontFamily: "Montserrat-Regular",
        color: `rgba(${colors.mainRelatedColor},1)`,
        fontSize: 16,
        lineHeight: 26,
        marginTop: 10,
    },
    colorBox: {
        width: windowWidth,
        height: 240,
        backgroundColor: `rgba(${colors.mainColor},0.6)`,
        alignItems: 'center'
    },
});

export default GreenBox;