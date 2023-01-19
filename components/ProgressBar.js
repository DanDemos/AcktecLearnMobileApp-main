import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import Progressbar from 'react-native-progress/Bar';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function ProgressBar(props) {
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View style={styles.progressBarWrap}>
            <Text style={styles.courseName}>{props.title}</Text>
            <Text style={styles.percentage}>{props.percent}% complete</Text>
            <Progressbar progress={props.percent / 100} width={windowWidth - 100} height={8} color={'#45C86D'} borderWidth={1} />
        </View>
    );
}

const styles = StyleSheet.create({
    progressBarWrap: {
        width: '100%',
        marginTop: 15,
        marginBottom: 15,
    },
    courseName: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 5,
    },
    percentage: {
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12,
        lineHeight: 15,
        marginBottom: 10,
    }
});


export default ProgressBar;