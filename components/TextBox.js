import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation';

function TextBox(props) {
  useEffect(() => {
    Orientation.lockToPortrait();
  })
  return (
    <View style={[styles.container, props.style]}>
      {props.logo ? <FontAwesomeIcon icon={props.logo} style={styles.iconStyle} /> : null}
      <TextInput {...props} style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  iconStyle: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 24,
    marginLeft: 10,
  },
  inputStyle: {
    color: '#000',
    paddingLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    flex: 1,
    textAlignVertical: 'top',
  },
});

export default TextBox;
