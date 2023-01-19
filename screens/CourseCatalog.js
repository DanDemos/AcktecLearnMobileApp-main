import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import TopHeaderBar from '../components/TopHeaderBar';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import SideNavBar from '../components/SideNavBar';
import BreadCrumbWrap from '../components/BreadCrumbWrap';
import CardList from '../components/CardList';
import Footer from '../components/Footer';
import CourseCatalogParent from './CourseCatalogParent';
import axios from 'axios';
import Dropdown from '../components/Dropdown';
import DropdownList from '../components/DropdownList';

import { BaseURL } from '../screens/BaseURL';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function CourseCatalog(props) {
  const [openSideNav, setOpenSideNav] = useState(false)
  const [modeOfCards, setModeOfCards] = useState('grid')
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [courses, setCourses] = useState([])
  const [breadcrumb, setBreadcrumb] = useState([])
  const [displayParentVer, setDisplayParentVer] = useState(false)
  const [courseNum, setCourseNum] = useState(0)
  const [errorMsg, setErrorMsg] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const scrollRef = useRef();
  const route = useRoute();
  const [searchText, setsearchText] = useState([''])
  const [searchCategory, setsearchCategory] = useState([])
  const config = {
    headers: { Authorization: `Bearer ${props.token}` }
  }
  const [selectedValue, setSelectedValue] = useState('Please select one');
  const [openReceiverDropdown, setOpenReceiverDropdown] = useState(false);

  var breadcrumbArray = [];

  // check if payment is enable in the settings
  // if yes, display course price and add to cart button. if no, hide the price and add to cart button.
  // in the CourseCatalogParent component
  const checkPaymentStatus = () => {
    axios.get(
      'https://api.mindchamps.acktec.com/call/api/v1/checkPaymentStatus',
      config
    ).then(function (res) {
      if (res.status == 200) {
        setPaymentStatus(res.data.result)
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

  // check user role
  // if parent/admin/teacher, display CourseCatalogParent component with course price
  // if student/child, hide CourseCatalogParent component, redirect to Container Page screen
  const getUserRole = () => {
    axios.get(
      `${BaseURL.appURL}/call/api/v1/userrole`,
      config
    ).then(function (res) {
      if (res.status == 200) {
        props.setUserRole(res.data.userrole.pay_master)
        checkPaymentStatus()
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

  // get courses based on the category ID
  const getCategories = (id, name) => {
    // reset everything
    setDisplayParentVer(false)
    setCourseNum(0)
    setCategories([])
    // set category breadcrumb
    if (breadcrumb.length != 0) {
      for (let i = 0; i < breadcrumb.length; i++) {
        if (breadcrumb[i].id < id && breadcrumb[i].type == 'course') {
          breadcrumbArray.push(breadcrumb[i])
        }
      }
    }
    breadcrumbArray.push({
      id,
      name,
      type: 'course'
    })
    setBreadcrumb(breadcrumbArray)
    // get courses
    axios.get(
      `${BaseURL.appURL}/call/api/v1/getAllCategories`,
      config
    ).then(function (res) {
//          console.log(res.data.categories);
      if (res.status == 200) {
//        setCategories(res.data.categories)
//        setSubcategories(res.data.subcategories)
//        setCourses(res.data.courses)
      }
    }).catch(function (error) {
      setErrorMsg("\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

const getgetCategory = () => {
    axios.get(
      `${BaseURL.appURL}/call/api/v1/getCategory`,
      config
    ).then(function (res) {
            console.log(res)
      if (res.status == 200) {
            console.log(res.data)
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

  // get all categories
  const getCourses = () => {
    // reset everything
    setDisplayParentVer(false)
    setCourseNum(0)
    setSubcategories([])
    setCourses([])
    setBreadcrumb([])
    // get categories
    axios.post(
      `${BaseURL.appURL}/call/api/v1/getUserCourses`,
      {
        id: 1
      },
      config
    ).then(function (res) {
      if (res.status == 200) {
        setCategories(res.data.user_courses)
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

  // display CourseCatalogParent component and set breadcrumb
  const displayParentModule = (index, name) => {
    setDisplayParentVer(true)
    setCourseNum(index)
    if (breadcrumb.length != 0) {
      for (let i = 0; i < breadcrumb.length; i++) {
        breadcrumbArray.push(breadcrumb[i])
      }
    }
    breadcrumbArray.push({
      id: index,
      name,
      type: 'module'
    })
    setBreadcrumb(breadcrumbArray)
  }

  const renderCategoryCard = (category, index) => {
  var img_num = 0
      if (category.LEVEL == 'Phonics Series 1 B1') {
        img_num = 0
      } else if (category.LEVEL == 'Phonics Series 1 B2') {
        img_num = 1
      } else if (category.LEVEL == 'Phonics Series 1 B3') {
        img_num = 2
      } else {
        img_num = null
      }
    return (
      // <Card style={styles.card} key={'card' + category.id} name={category.name} num={category.number_of_courses} press={() => getCourses(category.id, category.name)} />
      <Card style={styles.card} key={'card' + category.NO} name={category.LEVEL} image={img_num} num={0} press={() => { props.setMedia(category.MEDIA); props.navigation.navigate('ContainerPage') }} />

    );
  }

  const renderCategoryCardList = (category, index) => {
  var img_num = 0
      if (category.LEVEL == 'Phonics Series 1 B1') {
        img_num = 0
      } else if (category.LEVEL == 'Phonics Series 1 B2') {
        img_num = 1
      } else if (category.LEVEL == 'Phonics Series 1 B3') {
        img_num = 2
      } else {
        img_num = null
      }
    return (
      <CardList style={styles.cardList} key={'cardList' + category.NO} name={category.LEVEL} image={img_num} num={0} press={() => { props.setMedia(category.MEDIA); props.navigation.navigate('ContainerPage') }} />
//      <CardList style={styles.cardList} key={'cardList' + category.NO} name={category.LEVEL} image={img_num} num={0} press={() => getCourses(category.NO, category.HEADING)} />
      // <CardList style={styles.cardList} key={'cardList' + category.id} name={category.name} num={category.number_of_courses} press={() => { alert('HELLO WORLD') }} />
    );
  }

  const renderCourseCard = (course, index) => {
    // hardcoded for the displaying of mindchamps course thumbnail
    var num = 0
    if (course.LEVEL == 'Phonics Series 1 B1') {
      num = 0
    } else if (course.LEVEL == 'Phonics Series 1 B2') {
      num = 1
    } else if (course.LEVEL == 'Phonics Series 1 B3') {
      num = 2
    } else {
      num = null
    }
    // end of hardcoding
    return (
      // image={num} is hardcoded
      // supposed to be image={course.image}
      // <Card userRole={props.userRole} style={styles.card} key={'card' + course.CHAPTER} paymentStatus={paymentStatus} image={num} name={course.LEVEL} price={course.regular_price} sale={course.sale_price} subscription={course.subscription} interval={course.subscription_interval} intervalCount={course.subscription_interval_count}
      //   press={props.userRole == 'true' ? () => {
      //     scrollRef.current?.scrollTo({
      //       y: 0,
      //       animated: true,
      //     });
      //     displayParentModule(index, course.LEVEL);
      //     // props.setChapter(num) is hardcoded
      //     // supposed to be props.setChapter(course.CHAPTER)
      //   } : () => { props.setChapter(num); props.navigation.navigate('ContainerPage') }} />

      <Card userRole={props.userRole} style={styles.card} key={'card' + course.CHAPTER} paymentStatus={paymentStatus} image={num} name={course.LEVEL} price={course.regular_price} sale={course.sale_price} subscription={course.subscription} interval={course.subscription_interval} intervalCount={course.subscription_interval_count}
        press={() => { props.setChapter(num); props.navigation.navigate('ContainerPage') }} />
    )
  }

  const renderCourseCardList = (course, index) => {
    // hardcoded for the displaying of mindchamps course thumbnail
    var num = 0
    if (course.LEVEL == 'Phonics Series 1 B1') {
      num = 0
    } else if (course.LEVEL == 'Phonics Series 1 B2') {
      num = 1
    } else if (course.LEVEL == 'Phonics Series 1 B3') {
      num = 2
    } else {
      num = null
    }
    // end of hardcoding
    return (
      // image={num} is hardcoded
      // supposed to be image={course.image}

      <CardList userRole={props.userRole} style={styles.cardList} key={'cardList' + course.CHAPTER} paymentStatus={paymentStatus} image={num} name={course.LEVEL} price={course.regular_price} sale={course.sale_price} subscription={course.subscription} interval={course.subscription_interval} intervalCount={course.subscription_interval_count}
        press={props.userRole == 'true' ? () => {
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
          displayParentModule(index, course.LEVEL);
          // props.setChapter(num) is hardcoded
          // supposed to be props.setChapter(course.CHAPTER)
        } : () => { props.setChapter(num); props.navigation.navigate('ContainerPage') }} />
    )
  }

  const handleSearch = (e) => {
    setsearchText(e.nativeEvent.text)
    console.log(e.nativeEvent.text)
    if(e.nativeEvent.text != ''){
        let searched = categories.filter((category) => {
              if(category.LEVEL.toLowerCase().includes(e.nativeEvent.text.toLowerCase() )){
                return category
              }
        //    console.log(category.LEVEL)
        })
        console.log(searched)
        setsearchCategory(searched)
    }
    else{
        setsearchCategory([])
        console.log('searchCategory has been resetted')
    }
  }

  useEffect(() => {
    if(searchText == ''){
        console.log('text is null')
    }
    else{
        console.log('text is not null')
    }
  }, [searchText])

  useEffect(() => {
    getCourses()
    getCategories()
    getUserRole()
    getgetCategory()
  }, [])

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
      {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
      <ScrollView contentContainerStyle={styles.contentContainerStyle} style={{ backgroundColor: '#FFFFFF' }} ref={scrollRef}>
        <TopHeaderBar
          navigation={props.navigation}
          setOpenSideNav={setOpenSideNav}
          cartQuantity={props.cartQuantity}
          userRole={props.userRole}
        />
        <Text style={styles.myCourses}>My eBooks</Text>
        <SearchBar style={styles.searchBar} placeholder={'Search course name'}
            onChange={e => handleSearch(e)}
            value = {searchText}
        />
        <Dropdown
            openDropdown={openReceiverDropdown}
            setOpenDropdown={setOpenReceiverDropdown}
            selectedValue={selectedValue}
            valueStyle={styles.receiverValue}
            style={styles.receiverDropdown}
            page={'Help'} />
        {openReceiverDropdown ?
            <DropdownList
                setSelectedValue={setSelectedValue}
                setOpenDropdown={setOpenReceiverDropdown}
                data={receiver}
                valueStyle={styles.receiverValueList}
                width={windowWidth - 95}
                top={42}
                left={45}
        /> : null}
                                                                                                                                {/* getCourses={getCourses} */}
        <BreadCrumbWrap modeOfCards={modeOfCards} setModeOfCards={setModeOfCards} displayGrid={true} breadcrumbObj={breadcrumb} getCourses={getCourses} />
        {displayParentVer ?
          <CourseCatalogParent course={courses} index={courseNum} config={config} breadcrumb={breadcrumb} {...props} paymentStatus={paymentStatus} /> : null}
        {!displayParentVer && subcategories.length != 0 ?
          <View style={styles.categoryCards}>
            <Text style={styles.bigTitle}>Sub-Categories</Text>
            <View style={styles.cardRow}>{modeOfCards == 'grid' ? subcategories.map(renderCategoryCard) : null}</View>
            {modeOfCards == 'list' ? subcategories.map(renderCategoryCardList) : null}
          </View>: null}
        {!displayParentVer && courses.length != 0 ?
          <View style={styles.categoryCards}>
            <Text style={styles.bigTitle}>Courses</Text>
            <View style={styles.cardRow}>{modeOfCards == 'grid' ? courses.map(renderCourseCard) : null}</View>
            {modeOfCards == 'list' ? courses.map(renderCourseCardList) : null}
          </View> : null}

        {!displayParentVer && categories.length != 0 ?
          <View style={styles.categoryCards}>
            {
            searchText == ''
            ?
            <View style={styles.cardRow}>{modeOfCards == 'grid' ? categories.map(renderCategoryCard) : null}</View>
            :
            <View style={styles.cardRow}>{modeOfCards == 'grid' ? searchCategory.map(renderCategoryCard) : null}</View>
            }
            {
            searchText == ''
            ?
                modeOfCards == 'list' ? categories.map(renderCategoryCardList) : null
            :
                modeOfCards == 'list' ? searchCategory.map(renderCategoryCardList) : null
            }

          </View> : null}
        <Footer style={styles.footer} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  error: {
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
    backgroundColor: '#ff7b7b',
    padding: 5,
    width: '70%',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 15,
    borderRadius: 5,
    position: 'absolute',
    zIndex: 15,
    top: 15
  },
  contentContainerStyle: {
    minHeight: windowHeight,
    width: windowWidth,
  },
  myCourses: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#121212',
    fontSize: 20,
    lineHeight: 41,
    marginTop: 15,
    marginLeft: 25,
  },
  bigTitle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#121212',
    fontSize: 18,
    lineHeight: 41,
    marginTop: 15,
  },
  searchBar: {
    height: 20,
    width: windowWidth - 50,
    marginTop: 7,
    alignSelf: 'center',
  },
  categoryCards: {
    width: windowWidth,
    backgroundColor: '#FFFFFF',
    paddingTop: 5,
    padding: 25,
    marginBottom: 50,
  },
  cardList: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  cardRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: windowWidth - 50,
    marginTop: 0,
    marginBottom: 0,
  },
  card: {
    width: '49%',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  parentPurchase: {
    width: windowWidth,
    padding: 25,
  },
  moduleNum: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(44,44,44,0.5)',
    lineHeight: 25,
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
    color: '#2c2c2c',
    lineHeight: 25,
    marginBottom: 20,
  },
  price: {
    width: '100%',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: '#10af41',
    lineHeight: 25,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 40,
  },
  wrapper: {
    width: '100%',
    marginTop: 30,
  },
  subtitle: {
    width: '100%',
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
    color: '#2c2c2c',
    lineHeight: 41,
    marginBottom: 15,
  },
  description: {
    width: '100%',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#2c2c2c',
    lineHeight: 30,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
  }
})

export default CourseCatalog
