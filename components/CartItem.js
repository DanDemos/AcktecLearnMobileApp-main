import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import TextBox from './TextBox';
import Orientation from 'react-native-orientation';

function CartItem(props) {
    var item = props.item;
    var quantityArray = props.quantity;
    const [quantity, setQuantity] = useState(quantityArray.quantity);

    useEffect(() => {
        Orientation.lockToPortrait();
    })

    return (
        <View style={styles.item}>
            <Text style={styles.moduleNum}>{item.num_of_modules} module(s)</Text>
            <Text style={styles.courseName}>{item.LEVEL}</Text>
            <Text style={styles.price}>SGD${item.sale_price == '' ? parseFloat(item.regular_price == '' ? 0 : item.regular_price).toFixed(2) : parseFloat(item.sale_price).toFixed(2)} {item.subscription_period}</Text>
            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => {
                        if (quantity > 1) {
                            var newQuantity = quantity - 1
                            quantityArray.quantity = newQuantity
                            setQuantity(newQuantity)
                            props.calculateTotal()
                        }
                    }} >
                    <FontAwesomeIcon icon={faMinus} style={styles.controlIcons} />
                </TouchableOpacity>
                <TextBox style={styles.quantityTextbox} value={quantity.toString()} />
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => {
                        if (quantity >= 1) {
                            var newQuantity = quantity + 1
                            quantityArray.quantity = newQuantity
                            setQuantity(newQuantity)
                            props.calculateTotal()
                        }
                    }}>
                    <FontAwesomeIcon icon={faPlus} style={styles.controlIcons} />
                </TouchableOpacity>
            </View>
            <View style={styles.totalPriceWrap}>
                <Text style={styles.totalPriceTitle}>Total Price: </Text>
                <Text style={[styles.price, { marginLeft: 'auto', width: 'auto' }]}>SGD${item.sale_price == '' ? parseFloat(item.regular_price * quantity).toFixed(2) : parseFloat(item.sale_price * quantity).toFixed(2)}</Text>
            </View>
            <Text style={styles.subscriptionPeriod}>{item.subscription_period}</Text>
            <TouchableOpacity style={styles.removeLink}
                onPress={() => {
                    props.checkQuantity(props.index)
                }}>
                <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        marginBottom: 15,
        marginTop: 20,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1.5,
        paddingBottom: 20
    },
    moduleNum: {
        width: '100%',
        fontSize: 14,
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(44,44,44,0.5)',
        lineHeight: 25,
    },
    courseName: {
        width: '100%',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        color: '#2c2c2c',
        lineHeight: 34,
        marginBottom: 10,
    },
    price: {
        width: '100%',
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: '#10af41',
        lineHeight: 25,
    },
    quantityControls: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
    },
    controlButton: {
        backgroundColor: 'rgba(69, 200, 109, 0.3)',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlIcons: {
        color: 'rgba(0,0,0,0.5)'
    },
    quantityTextbox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    totalPriceWrap: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalPriceTitle: {
        fontFamily: 'Montserrat-Medium',
        color: '#2c2c2c',
        fontSize: 18,
        lineHeight: 24,
    },
    subscriptionPeriod: {
        fontFamily: 'Montserrat-Medium',
        color: '#999',
        fontSize: 14,
        lineHeight: 20,
        alignSelf: 'flex-end'
    },
    removeLink: {
        marginTop: -10,
    },
    remove: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#d1d1d6',
        fontSize: 14,
        lineHeight: 25,
        textDecorationLine: 'underline',
    }

});

export default CartItem;
