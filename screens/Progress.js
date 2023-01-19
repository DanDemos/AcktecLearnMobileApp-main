import React, { Component, useState } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native'
import PieChart from 'react-native-pie-chart';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faAngleRight,
    faChalkboard,
    faMedal
} from '@fortawesome/free-solid-svg-icons'

import SideNavBar from '../components/SideNavBar'
import Footer from '../components/Footer'
import GreenBox from '../components/GreenBox'
import ProgressBar from '../components/ProgressBar'
import Activity from '../components/Activity';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Progress(props) {
    const [openSideNav, setOpenSideNav] = useState(false)
    const widthAndHeight = windowWidth - 220
    const data1 = [1, 49]
    const data2 = [0, 50]
    const sliceColor = ['#BB1D1D', '#EFEFEF']

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
                    title={'Progress'}
                    description={'You may access details of your learning progress on this page.'}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole} />
                <View style={styles.mainContent}>
                    {/* overview block */}
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
                    {/* recent activity block */}
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
                    {/* progress block */}
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
        padding: 25,
        paddingTop: 10,
        flexDirection: 'column',
        alignItems: 'center'
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

export default Progress
