import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGlobe, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Orientation from 'react-native-orientation';

const Dropdown = props => {
  useEffect(() => {
    Orientation.lockToPortrait();
  });

  const handleDropdown = () => {
    if (props.openDropdown == true) {
        console.log("close");
       // setOpenReceiverDropdown(false);
      props.setOpenDropdown(false);
    } else if (props.openDropdown == false) {
        console.log("open");
      props.setOpenDropdown(true);
    }
  };
  return (
    <TouchableOpacity
      style={[styles.dropdown, props.style]}
      onPress={() => handleDropdown()}>
      <View style={[styles.dropdownWrap, props.style]}>
        {props.page == 'Login' ?
          <FontAwesomeIcon icon={faGlobe} style={styles.globe} /> : null}
        <Text style={[styles.selectedValue, props.valueStyle]}>
          {props.selectedValue}
        </Text>
        <FontAwesomeIcon icon={faAngleDown} style={styles.downArrow} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 43,
    backgroundColor: 'rgba(254,254,254,1)',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 10,
  },
  dropdownWrap: {
    height: 43,
    flexDirection: 'row',
    flex: 1,
    marginTop: 8,
    marginLeft: 11,
  },
  globe: {
    color: 'rgba(128,128,128,1)',
    fontSize: 25,
    marginTop: 3,
    marginRight: 15,
  },
  selectedValue: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(0,0,0,0.7)',
  },
  downArrow: {
    color: 'rgba(128,128,128,1)',
    fontSize: 20,
    marginTop: 1,
  },
});

export default Dropdown;
