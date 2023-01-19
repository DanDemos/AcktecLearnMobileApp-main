import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { useRoute } from '@react-navigation/native';
import Dropdown from './Dropdown';
import DropdownList from './DropdownList';
import CircleButton from './CircleButton';
import colors from './../utils/colors';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;
const lang = [{ value: 'English' }, { value: '中文' }];
const currency = [{ value: 'SGD' }, { value: 'USD' }];

const TopHeaderBar = props => {
  //const route = useRoute();
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('SGD');

  useEffect(() => {
    Orientation.lockToPortrait();
  })

  return (
    <View style={[styles.hamburgerButtonRow, props.background]}>
      <TouchableOpacity
        style={styles.hamburger}
        onPress={() => {
          props.setOpenSideNav(true)
        }}>
        <FontAwesomeIcon
          icon={faBars}
          style={styles.hamburgerIcon}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.row}>
        {/* <Dropdown
          openDropdown={openLangDropdown}
          setOpenDropdown={setOpenLangDropdown}
          selectedValue={selectedLang}
          valueStyle={styles.langValue}
          style={styles.langDropdown}
          page={'Catalog'}
        />
        {openLangDropdown ?
          <DropdownList
            setSelectedValue={setSelectedLang}
            setOpenDropdown={setOpenLangDropdown}
            data={lang}
            valueStyle={styles.langValueList}
            width={100}
            top={40}
          /> : null}
        <Dropdown
          openDropdown={openCurrencyDropdown}
          setOpenDropdown={setOpenCurrencyDropdown}
          selectedValue={selectedCurrency}
          valueStyle={styles.curValue}
          style={styles.curDropdown}
          page={'Catalog'}
        />
        {openCurrencyDropdown ?
          <DropdownList
            setSelectedValue={setSelectedCurrency}
            setOpenDropdown={setOpenCurrencyDropdown}
            data={currency}
            valueStyle={styles.curValueList}
            width={80}
            top={40}
            left={110}
          /> : null} */}
        {/* {props.userRole == 'true' ? <CircleButton
          press={() => props.navigation.navigate('Cart')}
          style={route.name == 'Cart' ? [styles.circleButton, { borderColor: '#45C86D' }] : styles.circleButton}
          icon={faShoppingCart}
          view={<View style={styles.itemDot}>
            <Text style={styles.itemNum}>{props.cartQuantity.length}</Text>
          </View>} /> : null} */}
        <CircleButton
          style={styles.circleButton}
          icon={faBell}
          view={<View style={styles.notificationDot}></View>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hamburgerIcon: {
    color: `rgba(${colors.mainRelatedColor},1)`,
  },
  row: {
    flexDirection: 'row',
    position: 'absolute',
    right: 25,
  },
  langDropdown: {
    width: 100,
  },
  langValue: {
    width: 60,
    fontSize: 14,
  },
  langValueList: {
    fontSize: 14,
  },
  curDropdown: {
    width: 80,
    marginLeft: 10,
  },
  curValue: {
    width: 40,
    fontSize: 14,
  },
  curValueList: {
    fontSize: 14,
  },
  itemDot: {
    position: 'absolute',
    top: -5,
    left: 25,
    width: 20,
    height: 20,
    backgroundColor: `rgba(${colors.mainColor},1)`,
    borderRadius: 50,
  },
  itemNum: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 20,
    alignSelf: 'center'
  },
  circleButton: {
    backgroundColor: '#f3f3f3',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 2,
    marginLeft: 10,
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    left: 27,
    width: 10,
    height: 10,
    backgroundColor: `rgba(${colors.mainColor},1)`,
    borderRadius: 50,
  },
  hamburgerButtonRow: {
    width: windowWidth,
    height: 75,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 25,
    alignItems: 'center',
  },
});

export default TopHeaderBar;
