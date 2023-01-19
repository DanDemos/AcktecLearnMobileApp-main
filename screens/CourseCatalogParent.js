import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import Button from '../components/Button';
import { BaseURL } from './BaseURL';

const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;

function CourseCatalogParent(props) {
  const courseInfo = props.course[props.index];
  const [interval, setInterval] = useState('');
  const [modules, setModules] = useState([]);
  //const [errorMsg,setErrorMsg] = useState('');

  // check subscription period 
  const checkSubscription = () => {
    if (courseInfo.subscription_interval_count == 1) {
      switch (courseInfo.subscription_interval) {
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
          setInterval(courseInfo.subscription_interval);
      }
    } else {
      setInterval(`for every ${courseInfo.subscription_interval_count} ${courseInfo.subscription_interval}s`);
    }
  }

  // get modules info of specific course
  const getModules = (chapter) => {
    axios.post(
      `${BaseURL.appURL}/call/api/v1/getModules`,
      { chapter },
      props.config
    ).then(function (res) {
      if (res.status == 200) {
        setModules(res.data.modules);
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!");
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    });
  };

  useEffect(() => {
    getModules(courseInfo.CHAPTER);
    if (courseInfo.subscription) {
      checkSubscription();
    }
    Orientation.lockToPortrait();
  }, []);

  const renderModule = (module, index) => {
    return (
      <Text style={styles.description} key={index}>{index + 1} {module.HEADING}</Text>
    )
  }

  return (
    <View style={styles.parentPurchase}>
      <Text style={styles.moduleNum}>{props.breadcrumb[props.breadcrumb.length - 2].name} | {modules.length} Modules</Text>
      <Text style={styles.title}>{courseInfo.LEVEL}</Text>
      {props.paymentStatus == 'true' ?
        <Text style={styles.price}>SGD ${courseInfo.sale_price == '' ? parseFloat(courseInfo.regular_price == '' ? 0.00 : courseInfo.regular_price).toFixed(2) : parseFloat(courseInfo.sale_price).toFixed(2)} {interval}</Text>
        : null}
      {courseInfo.summary != '' ?
        <Text style={styles.description}>
          {courseInfo.summary}
        </Text>
        : null}
      {props.paymentStatus == 'true' ?
        <>
          <Button
            onPress={() => {
              var array = [...props.cartItems]
              var quantity = [...props.cartQuantity]
              var sameItem = false
              quantity.forEach(element => {
                if (element.CHAPTER == courseInfo.CHAPTER) {
                  element.quantity++
                  sameItem = true
                }
              });

              if (!sameItem) {
                courseInfo.num_of_modules = modules.length
                courseInfo.subscription_period = interval
                quantity.push({ CHAPTER: courseInfo.CHAPTER, quantity: 1 })
                array.push(courseInfo)
              }
              props.setCartQuantity(quantity)
              props.setCartItems(array)
              props.navigation.navigate('Cart')
            }}
            name={'Add to Cart'}
            style={{ backgroundColor: '#ffc82d', marginTop: 30, width: '100%' }} />
          {/* <Button
            onPress={() => {
              var array = [...props.cartItems]
              array.push(courseInfo)
              props.setCartItems(array)
              props.navigation.navigate('Cart')
            }}
            name={'Buy Now'}
            style={{ backgroundColor: '#ffc82d',marginTop: 15,width: '100%' }} /> */}
        </>
        : null}
      <View style={styles.divider}></View>
      {courseInfo.DESCR != '' ?
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>Description</Text>
          <Text style={styles.description}>
            {courseInfo.DESCR}
          </Text>
        </View> : null}
      <View style={styles.wrapper}>
        <Text style={styles.subtitle}>Course Outline</Text>
        {modules.map(renderModule)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentPurchase: {
    width: windowWidth,
    padding: 25,
  },
  moduleNum: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(44,44,44,0.5)',
    lineHeight: 25,
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#2c2c2c',
    lineHeight: 25,
    marginTop: 10,
  },
  price: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#10af41',
    lineHeight: 25,
    marginTop: 10,
    marginBottom: 20
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 40,
  },
  wrapper: {
    width: '100%',
    marginTop: 30,
  },
  subtitle: {
    width: '100%',
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    color: '#2c2c2c',
    lineHeight: 41,
    marginBottom: 15,
  },
  description: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#2c2c2c',
    lineHeight: 30,
  }
});

export default CourseCatalogParent;
