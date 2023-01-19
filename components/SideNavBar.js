import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {
  faGraduationCap,
  faChalkboardTeacher,
  faChartLine,
  faCommentAlt,
  faQuestionCircle,
  faUserCircle,
  faSignOutAlt,
  faAddressCard
} from '@fortawesome/free-solid-svg-icons';
import NavTab from './NavTab';
import { useRoute } from '@react-navigation/native';
import { BaseURL } from './../screens/BaseURL';
import Orientation from 'react-native-orientation';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, setGlobalToken, getUserType } from '../components/api connect/getuserdata'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const bottomListOfTabs = [
  { tabName: 'Profile', icon: faUserCircle, pageName: 'Profile' },
  { tabName: 'Log Out', icon: faSignOutAlt, pageName: 'Logout' },
];

function SideNavBar(props) {
    const user_role = useSelector((state) => state.apicall.user_role);
    console.log(user_role);
    console.log('user_role');

  const route = useRoute();
  const [selectedPage, setSelectedPage] = useState(route.name);
  const [frontendMenu, setFrontendMenu] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const config = {
    headers: { Authorization: `Bearer ${props.token}` }
  };

  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const getFrontendMenu = () => {
    axios.get(
      `${BaseURL.appURL}/call/api/v1/getFrontendMenu`,
      config
    ).then(function (res) {
      if (res.status == 200) {
        setFrontendMenu(res.data.frontendmenu);
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!");
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    });
  };

  const handleNavigation = (page) => {
    if (page == 'Logout') {
      const data = {
        ip: '192.168.1.167'
      };

      axios.post(
        `${BaseURL.appURL}/call/api/v1/auth/logout`,
        data,
        config
      ).then(function (res) {
        if (res.status == 200) {
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 3000);
          props.setToken('');
          props.setIsLoggedIn(false);
          props.navigation.navigate(page);
        }
      }).catch(function (error) {
        setErrorMsg(error.response.data.msg + "\nPlease try again!");
        setTimeout(() => {
          setErrorMsg('');
        }, 2000);
      });
    } else {
      props.setOpenSideNav(false);
      props.navigation.navigate(page);
    }
  };

  const renderTab = (tab, index) => {
    return (
      <NavTab
        key={index}
        pageName={tab.pageName}
        onPress={() => handleNavigation(tab.pageName)}
        tabName={tab.tabName}
        icon={tab.icon}
        selectedPage={selectedPage}
      />
    );
  };

  if(user_role == "Student"){
          const topListOfTabs = [
            { tabName: 'Courses', icon: faGraduationCap, pageName: 'CourseCatalog' },
            { tabName: 'Progress', icon: faChartLine, pageName: 'Progress' },
            { tabName: 'Messages', icon: faCommentAlt, pageName: 'Messages' },
            { tabName: 'Help', icon: faQuestionCircle, pageName: 'Help' },
            // { tabName: 'Billing',icon: faCreditCard,pageName: 'Help' },
          ];

          return (
              <View style={styles.container}>
                {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
                <View style={styles.navbarRow}>
                  <View style={styles.navbar}>
                    <Image
                      source={require('../assets/images/big_logo.png')}
                      resizeMode='contain'
                      style={styles.navbarLogo}></Image>
                    <View style={styles.topNavStack}>
                      {topListOfTabs.map(renderTab)}
                    </View>
                    <View style={styles.bottomNavStack}>
                      {bottomListOfTabs.map(renderTab)}
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.blackOverlay}
                  onPress={() => props.setOpenSideNav(false)}></TouchableOpacity>
              </View>
            );
      }
      else{
          const topListOfTabs = [
            { tabName: 'E-Books', icon: faGraduationCap, pageName: 'CourseCatalog' },
            { tabName: 'Class', icon: faChalkboardTeacher, pageName: 'Class' },
            { tabName: 'User', icon: faAddressCard, pageName: 'User' },
            { tabName: 'Progress', icon: faChartLine, pageName: 'Progress' },
            { tabName: 'Messages', icon: faCommentAlt, pageName: 'Messages' },
            { tabName: 'Help', icon: faQuestionCircle, pageName: 'Help' },
            // { tabName: 'Billing',icon: faCreditCard,pageName: 'Help' },
          ];

          return (
              <View style={styles.container}>
                {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
                <View style={styles.navbarRow}>
                  <View style={styles.navbar}>
                    <Image
                      source={require('../assets/images/big_logo.png')}
                      resizeMode='contain'
                      style={styles.navbarLogo}></Image>
                    <View style={styles.topNavStack}>
                      {topListOfTabs.map(renderTab)}
                    </View>
                    <View style={styles.bottomNavStack}>
                      {bottomListOfTabs.map(renderTab)}
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.blackOverlay}
                  onPress={() => props.setOpenSideNav(false)}></TouchableOpacity>
              </View>
            );
      }


}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center'
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
  navbar: {
    width: 200,
    height: windowHeight,
    backgroundColor: 'rgba(244,244,244,1)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  navbarLogo: {
    width: 150,
    height: 50,
    margin: 25,
  },
  topNavStack: {
  },
  bottomNavStack: {
    position: 'absolute',
    bottom: 25,
  },
  blackOverlay: {
    width: windowWidth - 200,
    height: windowHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  navbarRow: {
    height: windowHeight,
    flexDirection: 'row',
    flex: 1,
  },
});

export default SideNavBar;
