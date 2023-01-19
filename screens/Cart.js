import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import TopHeaderBar from '../components/TopHeaderBar';
import SideNavBar from '../components/SideNavBar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import TextBox from '../components/TextBox';
import CartItem from '../components/CartItem';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Cart(props) {
    var cartItems = [...props.cartItems];
    var quantity = [...props.cartQuantity];
    const [openSideNav, setOpenSideNav] = useState(false);
    const [items, setItems] = useState([...cartItems]);
    const [total, setTotal] = useState(0.00);
    const [promocode, setPromocode] = useState('');
    const [promocodeInfo, setPromocodeInfo] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const renderCartItem = (item, index) => {
        return (
            <CartItem key={index} index={index} item={item} quantity={quantity[index]} calculateTotal={calculateTotal} checkQuantity={checkQuantity} />
        );
    };

    const checkQuantity = (index) => {
        // remove the item by the index passed in as parameter
        cartItems.splice(index, 1);
        quantity.splice(index, 1);
        // set the remaining cart items in state
        props.setCartItems([...cartItems]);
        props.setCartQuantity([...quantity]);
        setItems([...cartItems]);
        // re-calculate total price
        calculateTotal();
    };

    const calculateTotal = () => {
        var totalPrice = 0;
        // check if there are items in the cart then calculate total price
        if (items.length != 0 && quantity != undefined && quantity.length != 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].CHAPTER == quantity[i].CHAPTER) {
                    totalPrice += (items[i].sale_price == '' ? (items[i].regular_price == '' ? 0.00 * quantity[i].quantity : items[i].regular_price * quantity[i].quantity) : items[i].sale_price * quantity[i].quantity);
                }
            }
        }

        // check if promocode is applied then calculate total price
        if (promocodeInfo != undefined && promocodeInfo.length != 0) {
            if (promocodeInfo.discountType == 'percentage') {
                totalPrice = totalPrice * ((100 - promocodeInfo.amount) / 100);
            } else if (promocodeInfo.discountType == 'cash') {
                totalPrice = totalPrice - promocodeInfo.amount;
            }
        }
        setTotal(parseFloat(totalPrice).toFixed(2));
    };

    const verifyPromoCode = () => {
        if (promocode != '') {
            axios.post(
                `${BaseURL.appURL}/call/api/v1/verifyPromoCode`,
                { promo_code: promocode },
                config
            ).then(function (res) {
                if (res.status == 200) {
                    var result = res.data.verifyResult;
                    setPromocodeInfo(res.data.verifyResult);

                    // check if meet minimum and maximum spend
                    if (result.minimum_spend != null && total < result.minimum_spend) {
                        setErrorMsg(`Minimum spend for this promo code is $${result.minimum_spend}.`);
                        setTimeout(() => {
                            setErrorMsg('');
                        }, 2000);
                    } else if (result.maximum_spend != null && total > result.maximum_spend) {
                        setErrorMsg(`Maximum spend for this promo code is $${result.maximum_spend}.`);
                        setTimeout(() => {
                            setErrorMsg('');
                        }, 2000);
                    } else {
                        calculateTotal();
                    }

                }
            }).catch(function (error) {
                // console.log(error);
                setErrorMsg(error.response.data.msg + "\nPlease try again!");
                setTimeout(() => {
                    setErrorMsg('');
                }, 2000);
            });
        } else {
            setErrorMsg("Please fill in a promo code!");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        }

    };

    useEffect(() => {
        calculateTotal();
        Orientation.lockToPortrait();
    }, [])

    return (
        <View style={styles.container}>
            {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
            {openSideNav ?
                <SideNavBar
                    setOpenSideNav={setOpenSideNav}
                    navigation={props.navigation}
                    token={props.token}
                    setToken={props.setToken}
                    setIsLoggedIn={props.setIsLoggedIn}
                /> : null}
            <ScrollView contentContainerStyle={styles.contentContainerStyle} style={{ backgroundColor: '#FFFFFF' }}>
                <TopHeaderBar
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    cartQuantity={quantity}
                    userRole={props.userRole}
                />
                <Text style={styles.title}>My Cart ({quantity.length})</Text>
                <View style={styles.cart}>
                    {/* display cart items */}
                    {items.map(renderCartItem)}
                    <TextBox style={styles.promoCodeTextBox} onChangeText={text => setPromocode(text)} />
                    <TouchableOpacity onPress={verifyPromoCode} style={styles.promoCodeBtn}>
                        <Text style={styles.promoCodeTxt}>Add Promo Code</Text>
                    </TouchableOpacity>
                    <View style={styles.subtotalWrap}>
                        <Text style={styles.subtotalTitle}>Subtotal: </Text>
                        <Text style={styles.subtotal}>SGD${total}</Text>
                    </View>
                    {items.length > 0 ?
                        <Button
                            onPress={() => props.navigation.navigate('Payment')}
                            name={'Checkout'}
                            style={{ backgroundColor: '#ffc82d', marginTop: 15, width: '100%' }} />
                        : null}
                </View>
                <Footer style={styles.footer} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#FFFFFF',
        flex: 1,
        alignItems: 'center'
    },
    error: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#ff7b7b',
        padding: 5,
        width: '70%',
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 15,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 15,
        top: 15
    },
    contentContainerStyle: {
        minHeight: windowHeight,
        width: windowWidth,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#121212',
        fontSize: 20,
        lineHeight: 41,
        marginTop: 15,
        marginLeft: 25,
    },
    cart: {
        width: windowWidth,
        padding: 25,
        marginBottom: 50,
    },
    promoCodeTextBox: {
        height: 45,
        width: '100%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        backgroundColor: 'rgba(254,254,254,1)',
        marginTop: 20,
    },
    promoCodeBtn: {
        width: '40%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'rgba(69,200,93,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 25
    },
    promoCodeTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.7)',
        fontSize: 14,
        lineHeight: 24,
        textDecorationLine: 'underline',
    },
    subtotalWrap: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 25,
        marginBottom: 30,
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderTopWidth: 1
    },
    subtotalTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#2c2c2c',
        fontSize: 18,
        lineHeight: 24,
    },
    subtotal: {
        fontFamily: 'Montserrat-Regular',
        color: '#2c2c2c',
        fontSize: 18,
        lineHeight: 24,
        marginLeft: 'auto'
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    }
})

export default Cart;
