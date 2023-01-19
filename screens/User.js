import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text
} from 'react-native';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../components/SideNavBar';
import GreenBox from '../components/GreenBox';
import Footer from '../components/Footer';
import Button from '../components/Button';
import PageTab from '../components/PageTab';
import UsersTable from '../components/UsersTable';
import CoursesTable from '../components/CoursesTable';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';
import colors from '../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dummy data for the dropdown for user's child
const users = [{ value: 'Joanne' }, { value: 'Annabelle' }];

function User(props) {
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const [openSideNav, setOpenSideNav] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Users');
    const [allUser, setAllUser] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [allActive, setAllActive] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // set the current tab name to the state when user change tab
    const handleTabChange = (name) => {
        setSelectedTab(name);
    };
    const getAllUser = () => {
        axios.get(
            `${BaseURL.appURL}/call/api/v1/getAllUser`,
            config
        ).then(function (res) {
            if (res.status == 200) {
                // set all necessary info to respective fields
                if (res.data.allUser.length != 0) {
                    setAllUser(res.data.allUser.map((data) => {
                        // delete data.is_active;
                        return data;
                    }));
                    setIsLoaded(true);
                } else {
                    setAllUser([]);
                }
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg + "\nPlease try again!");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    }

    useEffect(() => {
        getAllUser();
        Orientation.lockToPortrait();
    }, [])

    // dummy data for the user tab
    const user_data = [
        { 'name': '', 'type': '', 'username': '', 'Registration': '', 'is_active': '' }
    ]

    // component for the users tab
    const Users = (!isLoaded) ? (<View style={styles.container}><Text> Loading...</Text></View>) : (
        <>
            <Button
                onPress={() => props.navigation.navigate('NewUser')}
                icon={faPenToSquare}
                name={'New User'}
                style={{ backgroundColor: `rgba(${colors.mainColor},1)`, marginTop: 30, width: '100%' }} />
            <ScrollView
                contentContainerStyle={{ width: 985 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false} preview={true}>
                <View style={styles.table}>
                    {allUser.length > 0 ? (
                        <UsersTable data={allUser} enableDisableData={allActive} checkbox={true} enableDisable={allUser} edit={true} delete={true} navigation={props.navigation} token={props.token} />
                    ) : (
                        <UsersTable data={user_data} enableDisableData={allActive} checkbox={true} enableDisable={user_data} edit={true} delete={true} navigation={props.navigation} token={props.token} />
                    )}
                </View>
            </ScrollView>
        </>
    )

    return (
        <View style={styles.container}>
            {openSideNav ?
                <SideNavBar
                    setOpenSideNav={setOpenSideNav}
                    navigation={props.navigation}
                    token={props.token}
                    setToken={props.setToken}
                    setIsLoggedIn={props.setIsLoggedIn}
                /> : null}
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <GreenBox
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    title={'Users'}
                    description={'Users that you have enrolled will be reflected here.'}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole} />

                <View style={styles.mainContent}>
                    <View style={styles.pageTabWrap}>
                        <PageTab name={'Users'} selectedTab={selectedTab} />
                    </View>
                    {/* check which tab is the current selected tab and display its component */}
                    {selectedTab == 'Users' ? Users : null}
                </View>
                <Footer />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 3,
        backgroundColor: "#FFFFFF",
        height: windowHeight,
        width: windowWidth,
    },
    contentContainerStyle: {
        minHeight: windowHeight,
        width: windowWidth,
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        width: windowWidth,
        padding: 25
    },
    pageTabWrap: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
    },
    searchBar: {
        height: 50,
        width: windowWidth - 50,
        marginTop: 30,
        alignSelf: 'center',
    },
    table: {
        marginTop: 20,
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
    },
});

export default User;
