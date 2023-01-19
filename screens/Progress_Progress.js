import React,{ Component,useState } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'

import SideNavBar from '../components/SideNavBar'
import Footer from '../components/Footer'
import Activity from '../components/Activity';
import TopHeaderBar from '../components/TopHeaderBar'
import ProgressBar from '../components/ProgressBar'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Progress_RecentActivity(props) {
    const [openSideNav,setOpenSideNav] = useState(false)

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
                    background={{ backgroundColor: 'rgba(214,250,225,0.7)' }}
                    cartQuantity={props.cartQuantity}
                    userRole={props.userRole}
                />
                <TouchableOpacity style={styles.BreadCrumbWrap} onPress={() => props.navigation.navigate('Progress')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={styles.arrow}
                        size={25}
                    />
                    <Text style={styles.BreadCrumbWrapTxt}>Progress &nbsp;&gt;&nbsp; Progress</Text>
                </TouchableOpacity>
                <View style={styles.mainContent}>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>Course Title 1</Text>
                        <View style={styles.block}>
                            <ProgressBar title={'Module title 1'} percent={10} />
                            <ProgressBar title={'Module title 2'} percent={20} />
                            <ProgressBar title={'Module title 3'} percent={30} />
                            <ProgressBar title={'Module title 4'} percent={40} />
                            <ProgressBar title={'Module title 5'} percent={50} />
                        </View>
                    </View>
                    <View style={styles.wrap}>
                        <Text style={styles.title}>Course Title 2</Text>
                        <View style={styles.block}>
                            <ProgressBar title={'Module title 1'} percent={10} />
                            <ProgressBar title={'Module title 2'} percent={20} />
                            <ProgressBar title={'Module title 3'} percent={30} />
                            <ProgressBar title={'Module title 4'} percent={40} />
                            <ProgressBar title={'Module title 5'} percent={50} />
                        </View>
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
    BreadCrumbWrap: {
        padding: 25,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    arrow: {
        color: 'rgba(0,0,0,0.3)',
    },
    BreadCrumbWrapTxt: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 16,
        lineHeight: 20,
        marginLeft: 15,
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
        marginLeft: 5
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
        paddingTop: 15,
        alignItems: 'center'
    },
    activityWrap: {
        width: '100%',
        flexDirection: 'column',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginTop: 15,
    },
});

export default Progress_RecentActivity
