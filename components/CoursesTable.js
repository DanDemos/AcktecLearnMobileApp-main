import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Orientation from 'react-native-orientation';
import Dropdown from './Dropdown';
import TextBox from './TextBox';

function CoursesTable(props) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState('1 user(s)');
    const [openEntriesDropdown, setOpenEntriesDropdown] = useState(false);
    const [selectedEntries, setSelectedEntries] = useState(5);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const entries = [5, 10, 25, 50, 100];
    const [page, setPage] = useState(1);
    const [value, setValue] = useState([]);

    const onSort = () => {
        if (props.sort == 'asc') {
            props.setSort('desc');
        } else if (props.sort == 'desc') {
            props.setSort('asc');
        }
    }

    var cellName = Object.keys(props.data[0]);
    const renderCellName = (name, index) => {
        return (
            <TouchableOpacity style={styles.cellWrap} key={index} onPress={() => onSort()}>
                <Text style={styles.cellName}>{name}</Text>
                <FontAwesomeIcon icon={props.sort == 'asc' ? faAngleUp : faAngleDown} style={styles.sortIcon} size={10} />
            </TouchableOpacity>
        );
    };

    var cellValue = [];
    props.data.forEach(data => {
        cellValue.push(Object.values(data));
    });

    const renderCell = (value, index) => {
        return (
            <View style={styles.cellWrap} key={index}>
                <Text style={styles.cellValue}>{value}</Text>
            </View>
        );
    };

    // const renderList = (list, index) => {
    //     return (
    //         <View
    //             key={index}
    //             style={styles.dropdownValueWrap}>
    //             <Checkbox /><Text style={styles.value}> {list.value}</Text>
    //         </View>
    //     )
    // }

    const renderEntries = (list, index) => {
        if ((cellValue.length / list) < 0) {
            return null;
        } else {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.dropdownValueWrap}
                    onPress={() => handleChangeSelected(list)}>
                    <Text style={styles.entriesValue}> {list} </Text>
                </TouchableOpacity>
            );
        }
    };

    const handleChangeSelected = value => {
        setSelectedEntries(value);
        setOpenEntriesDropdown(false);
    };

    const controlPagination = () => {
        var num = page * selectedEntries;
        var index = num - selectedEntries;
        var displayValue = [];
        if (cellValue.length < num) {
            num = cellValue.length;
        }
        for (index; index < num; index++) {
            displayValue.push(cellValue[index]);
        }
        setValue(displayValue);
    };

    useEffect(() => {
        controlPagination();
        Orientation.lockToPortrait();
    }, [selectedEntries, page]);

    const entriesDropdown = (
        <View>
            <Dropdown
                openDropdown={openEntriesDropdown}
                setOpenDropdown={setOpenEntriesDropdown}
                selectedValue={selectedEntries}
                valueStyle={styles.entriesDropdownValue}
                style={styles.entriesDropdown}
            />
            {openEntriesDropdown ?
                <View style={styles.entriesDropdownList}>{entries.map(renderEntries)}</View> : null
            }
        </View >
    );

    return (
        <View>
            {/* cell name */}
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                {/* {props.checkbox ?
                    <View style={[styles.cellWrap, { width: 50 }]} key={1}>
                        <Checkbox />
                    </View> : null} */}
                {cellName.map(renderCellName)}
                {/* {props.usersEnrolled ?
                    <View style={styles.cellWrap} key={2}>
                        <Text style={styles.cellName}>Users Enrolled</Text>
                    </View> : null}
                {props.preview ?
                    <View style={[styles.cellWrap, { width: 80 }]} key={3}>
                        <Text style={styles.cellName}>Preview</Text>
                    </View> : null} */}
                {/* {props.enableDisable ?
                    <View style={[styles.cellWrap, { width: 130 }]} key={4}>
                        <Text style={styles.cellName}>Enable/Disable</Text>
                    </View> : null}
                {props.edit ?
                    <View style={[styles.cellWrap, { width: 50 }]} key={5}>
                    </View> : null}
                {props.delete ?
                    <View style={[styles.cellWrap, { width: 50 }]} key={6}>
                    </View> : null} */}
            </View>
            {/* cell value */}
            {/* Check for isActive column from database. */}
            {/* {value.map((list, i) => console.log(list[4]))} */}
            {value.map((list, i) =>
            (<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }} key={i}>
                {/* {props.checkbox ?
                    <View style={[styles.cellWrap, { width: 50, alignItems: 'center' }]} key={1}>
                        <Checkbox />
                    </View> : null
                } */}
                {list.map(renderCell)}
                {/* {props.usersEnrolled ?
                    <View style={[styles.cellWrap, { alignItems: 'center', flexDirection: 'column' }]} key={2}>
                        <Dropdown
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                            selectedValue={selectedValue}
                            valueStyle={styles.dropdownValue}
                            style={styles.dropdown}
                        />
                        {openDropdown ?
                            <View style={styles.dropdownList}>{props.users.map(renderList)}</View> : null
                        }
                    </View> : null}
                {props.preview ?
                    <TouchableOpacity style={[styles.cellWrap, { width: 80, alignItems: 'center', justifyContent: 'center' }]} key={3}>
                        <FontAwesomeIcon icon={faEye} style={styles.iconStyle} size={23} />
                    </TouchableOpacity> : null}
                {props.enableDisable ?
                    <View style={[styles.cellWrap, { width: 130, alignItems: 'center', justifyContent: 'center' }]} key={4}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                            trackColor={{ false: "#ccc", true: "#45C86D" }}
                            thumbColor={"#f4f3f4"}
                            onValueChange={toggleSwitch}
                            value={list[4] === 1 ? true : false}
                        />
                    </View> : null}
                {props.edit ?
                    <TouchableOpacity style={[styles.cellWrap, { width: 50, alignItems: 'center', justifyContent: 'center' }]} key={5} onPress={() => props.navigation.navigate('ClassUsers')} >
                        <FontAwesomeIcon icon={faPen} style={styles.iconStyle} size={20} />
                    </TouchableOpacity> : null}
                {props.delete ?
                    <TouchableOpacity style={[styles.cellWrap, { width: 50, alignItems: 'center', justifyContent: 'center' }]} key={6}>
                        <FontAwesomeIcon icon={faTrash} style={styles.iconStyle} size={20} />
                    </TouchableOpacity> : null} */}
            </View>))}
            <View style={styles.paginationWrap}>
                <Text style={styles.numberOfEntries}>Showing {(page * selectedEntries) - (selectedEntries - 1)} - {page * selectedEntries}  of  {cellValue.length}  entries</Text>
                {/* <View style={styles.entriesDDWrap}>
                    <Text style={styles.numberOfEntries}>Showing</Text>
                    {entriesDropdown}
                    <Text style={styles.numberOfEntries}>entries</Text>
                </View> */}
                <View style={styles.pagination}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => {
                            if (page > 1) {
                                var newPage = page - 1
                                setPage(newPage)
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} style={styles.controlIcons} />
                    </TouchableOpacity>
                    <TextBox style={styles.pageNumBlock} value={page.toString()} keyboardType={'numeric'} />
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => {
                            if (page >= 1 && page < (cellValue.length / selectedEntries)) {
                                var newPage = page + 1
                                setPage(newPage)
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faAngleRight} style={styles.controlIcons} />
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    cellWrap: {
        minHeight: 70,
        flexDirection: 'row',
        width: 84.5,
        padding: 0,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    sortIcon: {
        color: 'rgba(0,0,0,0.3)',
        marginLeft: 10,
    },
    iconStyle: {
        color: 'rgba(0,0,0,0.5)',
    },
    cellName: {
        fontSize: 14,
        lineHeight: 20,
        color: 'rgba(0, 0, 0, 0.3)',
        fontFamily: 'Montserrat-SemiBold',
    },
    cellValue: {
        fontSize: 14,
        lineHeight: 20,
        color: 'rgba(0, 0, 0, 0.7)',
        fontFamily: 'Montserrat-SemiBold',
    },
    dropdown: {
        width: 150,
    },
    dropdownValue: {
        width: '75%',
        fontFamily: 'Montserrat-SemiBold',
    },
    dropdownList: {
        width: 150,
        backgroundColor: 'rgba(254,254,254,1)',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
    },
    dropdownValueWrap: {
        height: 40,
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        paddingLeft: 10,
    },
    value: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        marginLeft: 8,
    },
    paginationWrap: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 10,
    },
    numberOfEntries: {
        fontSize: 12,
        lineHeight: 40,
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
    },
    entriesDDWrap: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 20,
    },
    entriesDropdown: {
        width: 80,
        marginLeft: 10,
        marginRight: 10,
    },
    entriesDropdownValue: {
        width: 40,
        paddingLeft: 5,
        fontFamily: 'Montserrat-SemiBold',
    },
    entriesDropdownList: {
        width: 80,
        backgroundColor: 'rgba(254,254,254,1)',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.1)',
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    entriesValue: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
    },
    pagination: {
        flexDirection: 'row',
        marginLeft: 20,
    },
    controlButton: {
        backgroundColor: 'rgba(69, 200, 109, 0.3)',
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    controlIcons: {
        color: 'rgba(0,0,0,0.5)'
    },
    pageNumBlock: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1.2,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageNum: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
    }
});


export default CoursesTable;