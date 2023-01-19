import React, { useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Orientation from 'react-native-orientation';

function SearchBar(props) {
  useEffect(() => {
    Orientation.lockToPortrait();
  });

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.inputBox}>
        <FontAwesomeIcon icon={faSearch} style={styles.inputLeftIcon} />
        <TextInput
          {...props}
          style={styles.inputStyle}></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    padding: 8,
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 30,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FEFEFE',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLeftIcon: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 25,
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 5,
    marginRight: 5,
  },
  inputStyle: {
    height: 45,
    alignSelf: 'flex-start',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    lineHeight: 15,
    color: '#000',
    flex: 1,
  },
});

export default SearchBar;
