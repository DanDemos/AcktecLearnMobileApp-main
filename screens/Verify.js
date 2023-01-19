import React,{ useEffect,useState,useRef } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import axios from 'axios';

import LoginBackground from '../components/LoginBackground'
import LogoWithTitle from '../components/LogoWithTitle'
import TextBox from '../components/TextBox'
import Button from '../components/Button'
import Footer from '../components/Footer'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Verify(props) {
  const [otpExpiry,setOtpExpiry] = useState()
  const [otp1,setOtp1] = useState()
  const [otp2,setOtp2] = useState()
  const [otp3,setOtp3] = useState()
  const [otp4,setOtp4] = useState()
  const [otp5,setOtp5] = useState()
  const [otp6,setOtp6] = useState()

  const config = {
    headers: { Authorization: `Bearer ${props.token}` }
  }

  // send otp to user's email
  const verification = event => {
    if (event) {
      event.preventDefault();
    }
    axios.get('https://api.mindchamps.acktec.com/call/api/v1/auth/sendOTP',config
    ).then(function (res) {
      if (res.status == 200) {
        console.log('otp sent')
        setOtpExpiry(res.data.otpexpiry)
      }
    }).catch(function (error) {
      console.log(error)
    });
  }

  // check if the otp that user entered is correct
  const checkOtp = event => {
    if (event) {
      event.preventDefault();
    }
    var enteredOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6
    var data = {
      otp: enteredOTP,
      otpexpiry: otpExpiry
    }
    axios.post('https://api.mindchamps.acktec.com/call/api/v1/auth/checkOTP',data,config
    ).then(function (res) {
      if (res.status == 200) {
        // navigate to home page when successfully logged in
        props.navigation.navigate('CourseCatalog')
      }
    }).catch(function (error) {
      console.log(error)
    });
  }

  useEffect(() => {
    verification()
  },[])

  return (
    <View style={styles.container}>
      <LoginBackground />
      <View style={styles.loginBox}>
        <LogoWithTitle
          title={'Almost there...'}
          description={'2FA Authentication'} />
        <View style={styles.verify}>
          <Text style={styles.instruction}>Enter the 6 digit code sent to your email address.</Text>
          <View style={styles.row}>
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp1(newText)} />
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp2(newText)} />
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp3(newText)} />
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp4(newText)} />
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp5(newText)} />
            <TextBox
              style={styles.otp}
              keyboardType={'numeric'}
              maxlength={1}
              onChangeText={newText => setOtp6(newText)} />
          </View>
          <Button
            onPress={checkOtp}
            name={'Continue'}
            style={{ backgroundColor: 'rgba(69,200,109,1)' }} />
          <View style={styles.row}>
            <Text style={styles.question}>Did not receive code?</Text>
            <TouchableOpacity onPress={verification}>
              <Text style={styles.link}>Resend</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.link}>Back to login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer style={styles.footer} />
    </View>
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
    padding: 20,
    paddingBottom: 25,
  },
  verify: {
    width: windowWidth,
    paddingLeft: 35,
    paddingRight: 35,
    alignItems: 'center'
  },
  instruction: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(18,18,18,0.5)',
    fontSize: 16,
    marginTop: 15,
    lineHeight: 22,
    width: '70%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  otp: {
    height: 45,
    width: '11.5%',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
    backgroundColor: 'rgba(254,254,254,1)',
    marginBottom: 20,
    marginTop: 5,
    marginLeft: 3,
    marginRight: 3
  },
  divider: {
    width: '75%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 5,
    marginBottom: 5,
  },
  question: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(138,138,138,1)',
    fontSize: 12,
  },
  link: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(69,200,109,1)',
    fontSize: 12,
    textDecorationLine: 'underline',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  }
})

export default Verify
