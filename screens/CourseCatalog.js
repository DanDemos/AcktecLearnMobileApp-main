import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faThLarge } from '@fortawesome/free-solid-svg-icons';
import {faSignal} from '@fortawesome/free-solid-svg-icons';
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
  const [catalogReceive,setCatalogReceive]=useState([])
  const [catalogarray,setCategoryarray]=useState([])
  const [categoryValue,setCategoryValue]=useState('')
  const [categoryLevel,setCategoryLevel]=useState([])

  const [userLevel,setUserLevel]=useState([])
  const [levelArray,setLevelArray]=useState([])
  const [levelValue,setLevelValue]=useState('')

  const [levelSearch,setLevelSearch]=useState([])

  const [selectedValue, setSelectedValue] = useState(<Text styles={{paddingTop: 5}}>Category  <FontAwesomeIcon style={{color:'gray'}} icon={faThLarge} /> </Text>);

  const [selectedValue2, setSelectedValue2] = useState(<Text styles={{paddingTop: 5}}>Level  <FontAwesomeIcon style={{color:'gray'}} icon={faSignal} /> </Text>);
  const [openReceiverDropdown, setOpenReceiverDropdown] = useState(false);
  const [openReceiverDropdown2, setOpenReceiverDropdown2] = useState(false);

  const [viewCategory,setViewCategory]=useState('');
  const [viewLevel,setViewLevel]=useState('');

  const [dropdown,setDropDown]=useState('All');



  var breadcrumbArray = [];
  var myarray=[];

 useEffect(() => {
    catalogReceive.map((receivename)=>{
        myarray.push({value:receivename.name});
        //console.log(myarray);
        setCategoryarray(myarray);

    });
    myarray.unshift({value:"All"})
  }, [catalogReceive])

  var levelarray=[];
  useEffect(()=>{
    userLevel.map((receivelevel)=>{
       levelarray.push({value:receivelevel.name})
       //console.log(levelarray);
       setLevelArray(levelarray);
        //setCategoryarray(levelarray);
    });
    levelarray.unshift({value:"All"})
  },[userLevel])



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

    //console.log(breadcrumb);
    // set category breadcrumb
    if (breadcrumb.length != 0) {
      for (let i = 0; i < breadcrumb.length; i++) {
        if (breadcrumb[i].id < id && breadcrumb[i].type == 'module') {
         //console.log(breadcrumb[i]);
          breadcrumbArray.push(breadcrumb[i])
        }
      }
    }
    breadcrumbArray.push({
      id,
      name,
      type: 'module'
    })
    //console.log(breadcrumbArray);
    setBreadcrumb(breadcrumbArray)
    // get courses
    axios.get(
      `${BaseURL.appURL}/call/api/v1/getAllCategories`,
      config
    ).then(function (res) {
          //console.log(res.data);
      if (res.status == 200) {
           //console.log(res.data.categories);

//       setCategoriesName(res.data.categories)
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
            //console.log(res)
      if (res.status == 200) {
            //console.log(res.data)
      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }
   //get user category
   const getUserCategory=()=>{
        axios.get(
            `${BaseURL.appURL}/call/api/v1/getUserCategory`,
            config
        ).then(function (res){
            //console.log(res)
        if(res.status==200){
            //console.log(res.data)

            setCatalogReceive(res.data.catalog)
            }
        }).catch(function (error){
            setErrorMsg(error.response.data.msg+"\nPlease try again!")
            setTimeout(()=>{
                setErrorMsg('')
            },2000);
        });
   }

   //get user Level
    const getUserLevel=()=>{
           axios.get(
               `${BaseURL.appURL}/call/api/v1/getUserLevel`,
               config
           ).then(function (res){
               //console.log(res)
           if(res.status==200){
               //console.log(res.data.level)
               setUserLevel(res.data.level)

            }
           }).catch(function (error){
               setErrorMsg(error.response.data.msg+"\nPlease try again!")
               setTimeout(()=>{
                   setErrorMsg('')
               },2000);
           });
      }
  // get all categories
  const getCourses = (id,name) => {
    // reset everything
    setDisplayParentVer(false)
    setCourseNum(0)
    setSubcategories([])
    setCourses([])
    setBreadcrumb([])

    // set category breadcrumb
        if (breadcrumb.length != 0) {
          for (let i = 0; i < breadcrumb.length; i++) {
            if (breadcrumb[i].id < id && breadcrumb[i].type == 'course') {
             //console.log(breadcrumb[i]);
              breadcrumbArray.push(breadcrumb[i])
            }
          }
        }
        breadcrumbArray.push({
          id,
          name,
          type: 'course'
        })
        //console.log(breadcrumbArray);
        setBreadcrumb(breadcrumbArray)
    // get categories
    axios.post(
      `${BaseURL.appURL}/call/api/v1/getUserCourses`,
      {
        id: 1
      },
      config
    ).then(function (res) {
      if (res.status == 200) {
        //console.log(res.data.user_courses);

        setCategories(res.data.user_courses)
        //console.log(res.data.username)

      }
    }).catch(function (error) {
      setErrorMsg(error.response.data.msg + "\nPlease try again!")
      setTimeout(() => {
        setErrorMsg('')
      }, 2000);
    });
  }

  const getProgress=(person,course,category)=>{
  //console.log(person,course,category);
     axios.post(
          `${BaseURL.appURL}/call/api/v1/getProgress`,
          {
            id: 1,
            person_id:person,
            course_id:course,
            category_id:category,

          },
          config
        ).then(function (res) {
          if (res.status == 200) {
          console.log(res.data.progress);
//            console.log(res.data.category_id);
//            console.log(res.data.course_id);
//            console.log(res.data.userId);
//            console.log(res.data.username);

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
           console.log(breadcrumb[i]);
            breadcrumbArray.push(breadcrumb[i])
          }
        }
        breadcrumbArray.push({
          id: index,
          name,
          type: 'module'
        })
        setBreadcrumb(breadcrumbArray)
        console.log(breadcrumbArray)
      }


  const renderCategoryCard = (category, index) => {
   //console.log(category.MEDIA);
   if(category.MEDIA.includes('https://mindchamps.acktec.com/')){
    //console.log("include")

   }else{
    //console.log("not include")
    category.MEDIA = 'https://mindchamps.acktec.com/'+ category.MEDIA;

   }
  //console.log(index);
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
      <Card style={styles.card} key={'card' + category.NO} name={category.LEVEL} image={img_num} num={0} press={() => {
      getProgress(category.username,category.CATEGORY_TITLE,category.CHAPTER);
      props.setMedia(category.MEDIA); props.navigation.navigate('ContainerPage') }} />

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

        <Card userRole={props.userRole} style={styles.card} key={'card' + course.CHAPTER} paymentStatus={paymentStatus} image={num} name={course.LEVEL} price={course.regular_price} sale={course.sale_price} subscription={course.subscription} interval={course.subscription_interval} intervalCount={course.subscription_interval_count}
          press={() => { props.setChapter(courses.CHAPTER); props.navigation.navigate('ContainerPage') }} />
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
            } : () => { props.setChapter(courses.CHAPTER); props.navigation.navigate('ContainerPage') }} />
        )
      }



  const renderCategoryCardList = (category, index) => {

  //console.log(category.LEVEL);
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

  const handleSearch = (e) => {
    setsearchText(e.nativeEvent.text)
   // console.log(e.nativeEvent.text)
    if(e.nativeEvent.text != ''){
        let searched = categories.filter((category) => {
              if(category.LEVEL.toLowerCase().includes(e.nativeEvent.text.toLowerCase() )){
                return category

              }
            //console.log(category.LEVEL)
        })
        //console.log(searched)
        setsearchCategory(searched)
    }
    else{
        setsearchCategory([])
        //console.log('searchCategory has been resetted')
    }
  }

  useEffect(() => {
    if(searchText == ''){
        //console.log('text is null')
    }
    else{
        //console.log('text is not null')
    }
  }, [searchText])

  useEffect(() => {
    getCourses()
    getCategories()
    getUserRole()
    getgetCategory()
    getUserCategory()
    getUserLevel()
    getProgress()
  }, [])

function myfontawesome (e){
    //console.log(e);
    setViewCategory(e);
    if(e=="All"){
    setCategoryValue('');
    }else{
    setCategoryValue(e);
    }

    return (<Text styles={{marginTop: 25}}><FontAwesomeIcon style={styles.myfont} icon={faThLarge}/></Text>);
}


function myfontawesome2 (e){
    //console.log(e);
    setViewCategory(e);
    setOpenReceiverDropdown(false);
    if(e=="All"){
    setLevelValue('');

    }else{
    setLevelValue(e);
    }

    return (<Text styles={{marginTop: 25}}><FontAwesomeIcon style={styles.myfont} icon={faSignal}/></Text>);
}
    function dropdownclick1(e){
        setDropDown('Category');
        //console.log(openReceiverDropdown);
        if(openReceiverDropdown == true){
         //console.log("category close click");
         setOpenReceiverDropdown(false);
        }else if(openReceiverDropdown == false){
         //console.log("category open click");

         setOpenReceiverDropdown(true);
         setOpenReceiverDropdown2(false);
         setLevelValue('');
         //setBreadcrumb('Category')


        }



    }

    function dropdownclick2(e){
            setDropDown('Level');
            //console.log(openReceiverDropdown2);
            if(openReceiverDropdown2 == true){
             //console.log("level close click");
             setOpenReceiverDropdown2(false);

            }else if(openReceiverDropdown2 == false){
             //console.log("level open click");

             setOpenReceiverDropdown2(true);
             setOpenReceiverDropdown(false);
             setCategoryValue('');

            }



        }

    useEffect(()=>{
         let categorySearch = categories.filter((category) => {
            //console.log(category.LevelName);
            if(category.name.toLowerCase()== categoryValue.toLowerCase()){
              return category
              //console.log(category)
            }else{

            }

          })
          //console.log(catalogReceive);
          //console.log(categorySearch);
          setCategoryLevel(categorySearch);

    },[categoryValue])
    useEffect(()=>{
             let levelsearch = categories.filter((category) => {
                //console.log(category.LevelName);
                if(category.LevelName.toLowerCase()== levelValue.toLowerCase()){
                  return category
                  //console.log(category)
                }else{

                }

              })
              //console.log(catalogReceive);
              //console.log(levelsearch);
              setLevelSearch(levelsearch);

        },[levelValue])

    //console.log(categoryLevel);
      useEffect(() => {
        if(categoryValue == ""){
             console.log('category is null')
        }
        else{
            console.log('category is not null')

        }
      }, [categoryValue])
      useEffect(() => {
              if(levelValue == ""){
                   console.log('level is null')
              }
              else{
                  console.log('level is not null')

              }
            }, [levelValue])

        useEffect(()=>{
            //console.log(viewCategory);
        },[viewCategory])


         useEffect(()=>{
            //console.log(dropdown)
         },[dropdown]);
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
        <View style={styles.myRow}>
            <Dropdown
                        openDropdown={openReceiverDropdown}
                        //onClick={console.log('shit')}
                        setOpenDropdown={e => dropdownclick1(e)}
                        selectedValue={selectedValue}
                        valueStyle={styles.receiverValue1}
                        style={styles.receiverDropdown1}
                        page={'CourseCatalog'} />
            <Dropdown
                        openDropdown={openReceiverDropdown2}
                        setOpenDropdown={e => dropdownclick2(e)}
                        selectedValue={selectedValue2}
                        valueStyle={styles.receiverValue2}
                        style={styles.receiverDropdown2}
                        page={'CourseCatalog'} />
        </View>

        <View>

            {openReceiverDropdown ?
           <DropdownList
                  //onClick={console.log("click")}
                  setSelectedValue={e => myfontawesome(e)}
                  setOpenDropdown={setOpenReceiverDropdown}
                  data={catalogarray}
                  //data={levelArray}
                  valueStyle={styles.receiverValueList}

                  width={windowWidth-50}
                  top={10}
                  left={25}
           /> : null}
           {openReceiverDropdown2 ?
                      <DropdownList
                             setSelectedValue={e => myfontawesome2(e)}
                             setOpenDropdown={setOpenReceiverDropdown2}
                             //data={catalogarray}
                             data={levelArray}
                             valueStyle={styles.receiverValueList}

                             width={windowWidth-50}
                             top={10}
                             left={25}
                      /> : null}
         </View>



                                                                                                                                     {/* getCourses={getCourses} */}
        <BreadCrumbWrap modeOfCards={modeOfCards} setModeOfCards={setModeOfCards} displayGrid={true} breadcrumbObj={breadcrumb}  getBreadLevel={dropdown} getBreadCategory={viewCategory}/>



        {!displayParentVer && categories.length != 0 ?
          <View style={styles.categoryCards}>
          {
            (searchText == '' && categoryValue == '' && levelValue == '')
            ?
            <View style={styles.cardRow}>{modeOfCards == 'grid' ? categories.map(renderCategoryCard) : null}</View>
            :
                (searchText != '' && categoryValue == '' && levelValue == '')
                ?
                <View style={styles.cardRow}>{modeOfCards == 'grid' ? searchCategory.map(renderCategoryCard) : null}</View>
                :
                    (searchText == '' && categoryValue != '' && levelValue == '')
                    ?
                    <View style={styles.cardRow}>{modeOfCards == 'grid' ? categoryLevel.map(renderCategoryCard) : null}</View>
                    :

                        (searchText == '' && categoryValue == '' && levelValue != '')
                        ?
                        <View style={styles.cardRow}>{modeOfCards == 'grid' ? levelSearch.map(renderCategoryCard) : null}</View>
                        :
                        <View style={styles.cardRow}>{modeOfCards == 'grid' ? searchCategory.map(renderCategoryCard) : null}</View>
           }
           {
               (searchText == '' && categoryValue == '' && levelValue == '')
               ?
               modeOfCards == 'list' ? categories.map(renderCategoryCardList) : null
               :
                   (searchText != '' && categoryValue == '' && levelarray == '')
                   ?
                   modeOfCards == 'list' ? searchCategory.map(renderCategoryCardList) : null
                   :
                       (searchText == '' && categoryValue != '' && levelValue == '')
                       ?
                       modeOfCards == 'list' ? categoryLevel.map(renderCategoryCardList) : null
                       :
                        (searchText == '' && categoryLevel == '' && levelValue != '')
                        ?
                        modeOfCards == 'list' ? levelSearch.map(renderCategoryCardList) : null
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
  myRow:{
    marginTop:10,
    backgroundColor:'#fff',
    flexWrap:'wrap',
    flexDirection:'row',
    margin:5,
    zIndex:50,


  },
  searchBar: {
    width: windowWidth-50,
    height:50,
    marginTop: 7,

    alignSelf: 'center',
  },

  receiverDropdown1:{
    height:50,
    width:200,
    marginLeft:20,
    //marginRight:5,
    color:'#ff0000',
    alignSelf:'center',
    paddingLeft:10,
    paddingTop:3,
    flex:1

  },
    receiverDropdown2:{
        height:50,
         width:200,
         marginLeft:15,
         marginRight:20,
         color:'#ff0000',
         alignSelf:'center',
         paddingLeft:10,
         paddingTop:3,
         flex:1

    },
  receiverValue1: {
          marginLeft:15,
          fontSize: 16,
      },
    receiverValue2: {
            marginLeft:25,
            fontSize: 16,
        },
      receiverValueList: {
           width:windowWidth,
          fontSize: 16,
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
