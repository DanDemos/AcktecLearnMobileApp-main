import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faChalkboard,
    faMedal
} from '@fortawesome/free-solid-svg-icons';
import PieChart from 'react-native-pie-chart';
import SideNavBar from '../components/SideNavBar';
import ProfileForm from '../components/ProfileForm';
import Footer from '../components/Footer';
import TopHeaderBar from '../components/TopHeaderBar';
import PageTab from '../components/PageTab';
import CoursesTable from '../components/CoursesTable';
import SearchBar from '../components/SearchBar';
import ProgressBar from '../components/ProgressBar';
import Activity from '../components/Activity';
import Orientation from 'react-native-orientation';
import colors from './../utils/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NewUser(props) {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [selectedTab, setSelectedTab] = useState('Info');
    const [sort, setSort] = useState('asc');
    const widthAndHeight = windowWidth - 220;
    const data1 = [1, 49];
    const data2 = [0, 50];
    const sliceColor = ['#BB1D1D', '#EFEFEF'];

    useEffect(() => {
        Orientation.lockToPortrait();
    });

    // set the current tab name to the state when user change tab
    const handleTabChange = (name) => {
        setSelectedTab(name);
    };


    // dummy data for the course tab
    const course_data = [
        { 'Title': 'Chmistry', 'Category': 'Chemistry Chapter 0', 'Modules': '3', 'Progress': '20%' },
        { 'Title': 'Chmistry', 'Category': 'Foreign Language', 'Modules': '1', 'Progress': '30%' },
        { 'Title': 'Chmistry', 'Category': 'Chemistry Chapter 2', 'Modules': '6', 'Progress': '40%' },
        { 'Title': 'Computer Science', 'Category': 'React - The Complete Guide', 'Modules': '2', 'Progress': '50%' },
        { 'Title': 'Computer Science', 'Category': 'Build Web Apps with vue JS 3 & Firebase', 'Modules': '2', 'Progress': '60%' },
        { 'Title': 'Computer Science', 'Category': 'Material UI', 'Modules': '4', 'Progress': '60%' },
        { 'Title': 'Computer Science', 'Category': 'Svelte', 'Modules': '2', 'Progress': '60%' },
        { 'Title': 'Computer Science', 'Category': 'Svelte Kit', 'Modules': '1', 'Progress': '60%' },
        { 'Title': 'Computer Science', 'Category': 'Nest JS', 'Modules': '4', 'Progress': '60%' },
        { 'Title': 'Physics', 'Category': 'Gravity Chapter 1', 'Modules': '6', 'Progress': '60%' },
    ];

    // component for course tab
    const Courses = (
        <>
            {/* <SearchBar style={styles.searchBar} placeholder={'Search for a course'} /> */}
            <ScrollView
                contentContainerStyle={styles.tableContentContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.table}>
                    <CoursesTable data={course_data} checkbox={true} preview={true} sort={sort} setSort={setSort} enableDisable={true} delete={true} />
                </View>
            </ScrollView>
        </>
    );

    // component for progress tab
    const Progress = (
        <>
            <View style={styles.wrap}>
                <Text style={styles.title}>Overview</Text>
                <View style={styles.block}>
                    <Text style={styles.graphTitle}>50 E-Books in total</Text>
                    <View style={styles.chartWrap}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={data1}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.8}
                            coverFill={'#FFF'}
                            style={styles.piechart}
                        />
                        <Text style={styles.completedTxt}>0 completed</Text>
                    </View>
                    <View style={styles.legendWrap}>
                        <View style={styles.legend}>
                            <View style={styles.legendColor1}></View>
                            <Text style={styles.legendTxt}>
                                Completed
                            </Text>
                        </View>
                        <View style={styles.legend}>
                            <View style={styles.legendColor2}></View>
                            <Text style={styles.legendTxt}>
                                In Progress
                            </Text>
                        </View>
                    </View>
                    <View style={styles.chartWrap}>
                        <PieChart
                            widthAndHeight={widthAndHeight}
                            series={data2}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.8}
                            coverFill={'#FFF'}
                            style={styles.piechart}
                        />
                        <Text style={styles.completedTxt}>Quizzes Completed 0/50</Text>
                    </View>

                </View>
            </View>
            <View style={styles.wrap}>
                <Text style={styles.title}>Recent Activity</Text>
                <TouchableOpacity style={styles.block} onPress={() => props.navigation.navigate('Progress_RecentActivity')}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        style={styles.arrow}
                        size={20}
                    />
                    <View style={styles.activityWrap}>
                        <Text style={styles.date}>18 March 2022</Text>
                        <Activity text={'You have been assigned to new E-Books'} icon={faChalkboard} color={'rgb(66, 160, 132)'} />
                        <View style={styles.divider}></View>
                        <Activity text={'You have completed Risk Management Concept 1!'} icon={faMedal} color={'rgb(253, 203, 93)'} />
                    </View>
                    <View style={styles.activityWrap}>
                        <Text style={styles.date}>18 March 2022</Text>
                        <Activity text={'You have been assigned to new E-Books'} icon={faChalkboard} color={'rgb(66, 160, 132)'} />
                        <View style={styles.divider}></View>
                        <Activity text={'You have completed Risk Management Concept 1!'} icon={faMedal} color={'rgb(253, 203, 93)'} />
                    </View>

                </TouchableOpacity>
            </View>
            <View style={styles.wrap}>
                <Text style={styles.title}>Progress</Text>
                <TouchableOpacity style={styles.block} onPress={() => props.navigation.navigate('Progress_Progress')}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        style={styles.arrow}
                        size={20}
                    />
                    <ProgressBar title={'E-Book title 1'} percent={10} />
                    <ProgressBar title={'E-Book title 2'} percent={20} />
                    <ProgressBar title={'E-Book title 3'} percent={30} />
                    <ProgressBar title={'E-Book title 4'} percent={40} />
                    <ProgressBar title={'E-Book title 5'} percent={50} />
                </TouchableOpacity>
            </View>
        </>
    );

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
                <TopHeaderBar
                    navigation={props.navigation}
                    setOpenSideNav={setOpenSideNav}
                    background={{ backgroundColor: `rgba(${colors.mainColor},0.5)` }}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole}
                />
                <TouchableOpacity style={styles.BreadCrumbWrap} onPress={() => props.navigation.navigate('User')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={styles.leftArrow}
                        size={25}
                    />
                    <Text style={styles.BreadCrumbWrapTxt}>Users &nbsp;&gt;&nbsp; {props.route.params.username}</Text>
                </TouchableOpacity>
                <View style={styles.mainContent}>
                    <View style={styles.pageTabWrap}>
                        <PageTab name={'Info'} selectedTab={selectedTab} onPress={() => handleTabChange('Info')} />
                        <PageTab name={'eBooks'} selectedTab={selectedTab} onPress={() => handleTabChange('eBooks')} />
                        <PageTab name={'Progress'} selectedTab={selectedTab} onPress={() => handleTabChange('Progress')} />
                    </View>
                    {/* check which tab is the current selected tab and display its component */}
                    {selectedTab == 'Info' ? <ProfileForm for={'editUserInfo'} user={props.route.params} /> : null}
                    {/* {selectedTab == 'Info' ? <ProfileForm for={'editUserInfo'} /> : null} */}
                    {selectedTab == 'eBooks' ? Courses : null}
                    {selectedTab == 'Progress' ? Progress : null}
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
        width: windowWidth,
        backgroundColor: '#FFFFFF',
    },
    mainContent: {
        width: windowWidth,
        padding: 25,
        alignItems: 'center'
    },
    BreadCrumbWrap: {
        padding: 25,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftArrow: {
        color: 'rgba(0,0,0,0.3)',
    },
    BreadCrumbWrapTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 15,
    },
    pageTabWrap: {
        flexDirection: 'row',
        width: windowWidth - 50,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
        marginBottom: 35,
    },
    searchBar: {
        height: 50,
        width: windowWidth - 50,
        marginTop: 10,
        alignSelf: 'center',
    },
    tableContentContainer: {
        width: 1355,
    },
    table: {
        marginTop: 20,
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
    },
    wrap: {
        marginTop: 15,
        marginBottom: 15,
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 15,
    },
    block: {
        backgroundColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        borderRadius: 20,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 30,
        shadowOpacity: 1,
        shadowRadius: 10,
        width: windowWidth - 50,
        padding: 25,
        alignItems: 'center'
    },
    piechart: {
        margin: 15,
    },
    graphTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
        marginBottom: 10,
    },
    chartWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    completedTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'center',
        position: 'absolute',
        width: 100,
        height: 100,
        top: 75,
    },
    legendWrap: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        margin: 30,
    },
    legend: {
        flexDirection: 'row'
    },
    legendColor1: {
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: '#10af41',
        marginRight: 10,
    },
    legendColor2: {
        width: 18,
        height: 18,
        borderRadius: 4,
        backgroundColor: '#af1010',
        marginLeft: 20,
        marginRight: 10,
    },
    legendTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 15,
        lineHeight: 19,
        textAlign: 'center',
    },
    arrow: {
        position: 'absolute',
        color: 'rgba(0,0,0,0.2)',
        top: 20,
        right: 20,
    },
    activityWrap: {
        width: '100%',
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15,
    },
    date: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 15,
    },
});

export default NewUser;
