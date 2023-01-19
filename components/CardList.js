import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function CardList(props) {
    const [interval, setInterval] = useState('');
    const checkSubscription = () => {
        if (props.intervalCount == 1) {
            switch (props.interval) {
                case 'day':
                    setInterval('daily');
                    break;
                case 'week':
                    setInterval('weekly');
                    break;
                case 'month':
                    setInterval('monthly');
                    break;
                case 'year':
                    setInterval('yearly');
                    break;
                default:
                    setInterval(props.interval);
                    break;
            }
        } else {
            setInterval(`for every ${props.intervalCount} ${props.interval}s`);
        }
    };

    useEffect(() => {
        if (props.subscription) {
            checkSubscription();
        }
        Orientation.lockToPortrait();
    }, []);

    // hardcoded for courses thumbnail
    const image = [require('../assets/images/Phonics_S1_Book1.jpg'), require('../assets/images/Phonics_S1_Book2.jpg'), require('../assets/images/Phonics_S1_Book3.jpg')];

    // default image
    // const image = require(props.image)

    return (
        <TouchableOpacity style={[styles.cardList, props.style]} onPress={props.press}>
            <View style={styles.thumbnailRow}>
                {/* hardcode thumbnail image */}
                {props.image != null || props.image != undefined ? <Image
                    style={styles.thumbnail}
                    resizeMode='contain'
                    source={image[props.image]} /> :
                    <Image
                        style={styles.thumbnail}
                        resizeMode='contain'
                        source={require('../assets/images/small_logo.png')} />}
                {/* default thumbnail */}
                {/* {props.image != null || props.image != undefined ?
                    <Image
                        style={styles.thumbnail}
                        resizeMode='contain'
                        source={image} /> :
                    <View style={[styles.thumbnail, {backgroundColor: 'rgba(69,200,109,0.3)'}]}></View>} */}
                <View style={styles.categoryNameColumn}>
                    <Text style={styles.categoryName}>{props.name}</Text>
                    {props.num ?
                        <Text style={styles.courseNum}>{props.num} courses</Text> : null
                    }
                    {props.userRole == 'true' && props.paymentStatus == 'true' && (props.price != undefined || props.sale != undefined) ?
                        <Text style={styles.price}>SGD ${props.sale == '' ? parseFloat(props.price == '' ? 0.00 : props.price).toFixed(2) : parseFloat(props.sale).toFixed(2)} {interval}</Text> : null
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardList: {
        width: windowWidth - 50,
        height: 120,
        backgroundColor: "rgba(255,255,255,1)",
        borderRadius: 10,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 6
        },
        elevation: 72,
        shadowOpacity: 0.05,
        shadowRadius: 24,
        borderWidth: 2,
        borderColor: "rgba(0,0,0,0.05)",
        padding: 10,
    },
    thumbnail: {
        width: 70,
        height: 100,
        // backgroundColor: "rgba(69,200,109,0.3)",
    },
    categoryName: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C2C2C',
        lineHeight: 30,
        fontSize: 14,
    },
    courseNum: {
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 12,
        lineHeight: 20,
    },
    price: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#10AF41',
        fontSize: 12,
        lineHeight: 20,
    },
    categoryNameColumn: {
        width: windowWidth - 160,
        marginLeft: 15,
        alignSelf: 'center',
    },
    thumbnailRow: {
        height: 100,
        width: windowWidth - 70,
        flexDirection: "row"
    }
});

export default CardList;
