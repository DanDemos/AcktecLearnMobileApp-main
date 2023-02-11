import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import axios from 'axios';
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import LoginBackground from '../components/LoginBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import TextBox from '../components/TextBox';
import Dropdown from '../components/Dropdown';
import DropdownList from '../components/DropdownList';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { BaseURL } from './BaseURL';
import Orientation from 'react-native-orientation';
import colors from './../utils/colors';

import { useSelector, useDispatch } from 'react-redux'
import { setGlobalToken, setUserRole } from '../components/api connect/getuserdata'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const lang = [{ value: 'English' }, { value: '中文' }];


function Login(props) {
  const dispatch = useDispatch()

  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState('English');
  const [verify, setVerify] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSingleLogin, setShowSingleLogin] = useState(false);





  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const login = event => {

    if (event) {
      event.preventDefault();
    }
    var data = {
      username: username,
      password: password,
      ip: '192.168.1.167'
    };
    if (username != '' && password != '') {
      axios.post(`${BaseURL.appURL}/call/api/v1/auth/login`, data
      ).then(function (res) {
        if (res.status == 200) {
          // if (gotLoginedIn) {
          // check if the verification is enabled
          setVerify(res.data.is_2FA == 'false' ? false : true);
          props.setToken(res.data.token);
          dispatch(setGlobalToken(res.data.token));

          config = {
              headers: { Authorization: `Bearer ${res.data.token}` }
          }

          axios.get(`${BaseURL.appURL}/call/api/v1/userrole`,
          config
          ).then(function (res) {
            if (res.status == 200) {
              // console.log(res.data.userrole);
              dispatch(setUserRole(res.data.userrole.name));

            }
          }).catch(function (error) {
            console.log(error)
            setErrorMsg(error.response.data.msg + "\nPlease try again!")
            setTimeout(() => {
              setErrorMsg('')
            }, 2000);
          });

          // } else {
          //   setErrorMsg('')
          //   
          if (res.data.is_2FA == "true") {
            props.navigation.navigate('Verify');
          } else {
            console.log("go to home")
            props.navigation.navigate('CourseCatalog');
          }
          // }
          setErrorMsg('');
        }
      }).catch(function (error) {
        setErrorMsg(error.response.data.msg);
      });
    } else {
      setErrorMsg("Please fill in your username and password!");
    }
  }
//    useEffect(()=>{
//        if(showSingleLogin){
//            setShowSingleLogin(true)
//        }
//    },[showSingleLogin])

  return (
    <View style={styles.container}>
      {showSingleLogin ?
        <View style={styles.blackOverlay}>
          <View style={styles.prompt}>
            <Image
              source={require('../assets/images/Disconnect_icon.png')} />
            <Text style={styles.promptQuestion}>
              The user is active in another session. Do you want to disconnect it and proceed to a new session?
            </Text>
            <View style={styles.answersWrap}>
              <TouchableOpacity onPress={() => {
                setShowSingleLogin(false)
                if (verify) {
                  props.navigation.navigate('Verify')
                } else {
                  props.setIsLoggedIn(true)
                  props.navigation.navigate('CourseCatalog')
                }
              }}>
                <Text style={[styles.promptAnswer, { color: '#10AF41', marginRight: 20, backgroundColor: 'rgba(69, 200, 109, 0.3)' }]}>Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowSingleLogin(false)}>
                <Text style={[styles.promptAnswer, { color: 'rgba(0,0,0,0.5)', backgroundColor: 'rgba(0,0,0,0.2)' }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View> : null}
      <LoginBackground />
      <View style={styles.loginBox}>
        <LogoWithTitle
          // title={'Welcome!'}
          // description={'Login to continue'}
          description={'Login'}
        />
        <View style={styles.login}>
          <TextBox
            style={[styles.textBox, styles.username]}
            logo={faUser}
            placeholder={'Username'}
            value={username}
            onChangeText={(newText) => {
              setUsername(newText);
              setErrorMsg('')
            }}></TextBox>
          <TextBox
            style={[styles.textBox, styles.password]}
            logo={faUnlockAlt}
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={(newText) => {
              setPassword(newText);
              setErrorMsg('')
            }}></TextBox>
          {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
          <Dropdown
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            selectedValue={selectedValue}
            valueStyle={styles.langValue}
            style={styles.langDropdown}
            page={'Login'}
          />
          {openDropdown ?
            <DropdownList
              setSelectedValue={setSelectedValue}
              setOpenDropdown={setOpenDropdown}
              data={lang}
              valueStyle={styles.langValueList}
              width={150}
              top={186}
            /> : null}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgetPassword')}>
            <Text style={styles.forgetPassword}>Forget Password?</Text>
          </TouchableOpacity>
          <View style={styles.rowTC}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('TermAndCondition')}>
              <Text style={styles.link}>Terms and Condition</Text>
            </TouchableOpacity>
          </View>
          <Button
            onPress={login}
            name={'Login'}
            style={{ backgroundColor: `rgba(${colors.mainColor},5)` }} />
          <View style={styles.divider}></View>
          <View style={styles.row}>
            <Text style={styles.question}>New user?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('CreateAccount')}>
              <Text style={styles.link}>Create account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer style={styles.footer} />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: windowHeight,
    width: windowWidth,
  },
  blackOverlay: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answersWrap: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  promptQuestion: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#2C2C2C',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 15,
  },
  promptAnswer: {
    padding: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    borderRadius: 5
  },
  contentContainerStyle: {
    minHeight: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBox: {
    position: 'absolute',
    width: windowWidth - 80,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 40,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 12,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    padding: 15,
  },
  login: {
    width: windowWidth,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  textBox: {
    height: 45,
    width: '75%',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    backgroundColor: 'rgba(254,254,254,1)',
  },
  username: {
    marginTop: 26,
  },
  password: {
    marginTop: 15,
    marginBottom: 15,
  },
  langDropdown: {
    width: 150,
  },
  langValue: {
    width: 75,
    fontSize: 16,
  },
  langValueList: {
    fontSize: 16,
  },
  forgetPassword: {
    fontFamily: 'Montserrat-Regular',
    color: `rgba(${colors.mainColor},1)`,
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  divider: {
    width: '75%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 15,
  },
  question: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(138,138,138,1)',
    fontSize: 12,
  },
  link: {
    fontFamily: 'Montserrat-Bold',
    color: `rgba(${colors.mainColor},1)`,
    fontSize: 12,
    textDecorationLine: 'underline',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },
  rowTC: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
  },
  error: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    backgroundColor: '#ff7b7b',
    padding: 5,
    width: '75%',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 15,
    borderRadius: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  }
});

export default Login;
