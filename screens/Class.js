import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text
} from 'react-native';
import SideNavBar from '../components/SideNavBar';
import GreenBox from '../components/GreenBox';
import Footer from '../components/Footer';
import PageTab from '../components/PageTab';
import CoursesTable from '../components/CoursesTable';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// dummy data for the dropdown for user's child
const users = [{ value: 'Joanne' }, { value: 'Annabelle' }];

function Class(props) {
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const [openSideNav, setOpenSideNav] = useState(false);
    const [selectedTab, setSelectedTab] = useState('eBooks');
    const [sort, setSort] = useState('asc');
    const [allCourses, setAllCourses] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const getAllCourses = () => {
        axios.get(
            `${BaseURL.appURL}/call/api/v1/getallcourses`,
            config
        ).then(function (res) {
            if (res.status == 200) {
                // set all necessary info to respective fields
                if (res.data.getAllCourses.length != 0) {
                    setAllCourses(res.data.getAllCourses.map((data) => {
                        // delete data.is_active;
                        return data;
                    }));
                    setIsLoaded(true);
                } else {
                    setAllCourses([]);
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
        getAllCourses();
        Orientation.lockToPortrait();
    }, [])

    // dummy data for the course tab
    const course_data = [
        { 'Title': '', 'Category': '', 'Modules': '', 'Quantity': '' }
    ]

    // component for the courses tab
    const Courses = (!isLoaded) ? (<View style={styles.container}><Text> Loading...</Text></View>) : (
        <>
            {/* <SearchBar style={styles.searchBar} placeholder={'Search for a course'} /> */}
            <ScrollView
                contentContainerStyle={{ width: 1005 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {/* <View style={styles.table}>
                    <CoursesTable data={course_data} checkbox={true} preview={true} usersEnrolled={true} users={users} sort={sort} setSort={setSort} />
                </View> */}
                <View style={styles.table}>
                    {allCourses.length > 0 ? (
                        <CoursesTable data={allCourses} sort={sort} setSort={setSort} />
                    ) : (
                        <CoursesTable data={course_data} sort={sort} setSort={setSort} />
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
                    title={'E-Book'}
                    description={'E-Book that you have purchased will be reflected here.'}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole} />

                <View style={styles.mainContent}>
                    <View style={styles.pageTabWrap}>
                        <PageTab name={'eBooks'} selectedTab={selectedTab} />
                    </View>
                    {/* check which tab is the current selected tab and display its component */}
                    {selectedTab == 'eBooks' ? Courses : null}

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

export default Class;
