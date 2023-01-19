import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Orientation from 'react-native-orientation';

const DropdownList = props => {
    useEffect(() => {
        Orientation.lockToPortrait();
    });

    const renderList = (list, index) => {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.dropdownValueWrap, { width: props.width - 3 }]}
                onPress={() => handleChangeSelected(list.value)}>
                <Text style={[styles.value, props.valueStyle]}> {list.value} </Text>
            </TouchableOpacity>
        );
    };

    const handleChangeSelected = value => {
        props.setSelectedValue(value);
        props.setOpenDropdown(false);
    };

    return <View style={[styles.dropdownList, { ...props }]}>{props.data.map(renderList)}</View>
};

const styles = StyleSheet.create({
    dropdownList: {
        position: 'absolute',
        backgroundColor: 'rgba(254,254,254,1)',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        zIndex: 10,
    },
    dropdownValueWrap: {
        height: 40,
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
    },
    value: {
        fontFamily: 'Montserrat-Regular',
        color: 'rgba(0,0,0,0.7)',
        marginLeft: 8,
    },
});

export default DropdownList;
