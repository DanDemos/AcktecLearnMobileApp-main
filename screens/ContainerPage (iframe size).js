// this set of code is to display only the content
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faAngleRight, faAngleLeft, faMinus, faArrowsAltH, faArrowsAltV, faCheck } from '@fortawesome/free-solid-svg-icons';
import RNFS from "react-native-fs";
import { unzip } from 'react-native-zip-archive';
import axios from 'axios';
import Orientation from 'react-native-orientation';
import { BaseURL } from './BaseURL';

const defaultAspectRatio = 1.78;

function ContainerPage(props) {
    const [openMenu, setOpenMenu] = useState(false);
    const [orientation, setOrientation] = useState('');
    const [mode, setMode] = useState('single');
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [openPrompt, setOpenPrompt] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio);
    const [iframes, setIframes] = useState([]);
    const [moduleArray, setModuleArray] = useState([]);
    const [scrollToIndex, setScrollToIndex] = useState(0);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [download, setDownload] = useState(false);
    const scrollRef = useRef();
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };

    const checkPortrait = () => {
        const dim = Dimensions.get('window');
        setWidth(dim.width);
        setHeight(dim.height);
        return dim.height >= dim.width;
    }

    Dimensions.addEventListener('change', () => {
        setOrientation(checkPortrait() ? 'portrait' : 'landscape');
    });

    useLayoutEffect(() => {
        setOrientation(checkPortrait() ? 'portrait' : 'landscape');
    }, []);

    const getModules = () => {
        axios.post(
            `${BaseURL.appURL}/call/api/v1/getModules`,
            { chapter: props.chapter },
            config
        ).then(function (res) {
            if (res.status == 200) {
                var array = [];
                var modules = res.data.modules;
                for (let i = 0; i < modules.length; i++) {
                    array.push([modules[i].HEADING, `${BaseURL.appURL}/${modules[i].MEDIA}`, false, 0, modules[i].NO, modules[i].CATEGORY_TITLE]);
                    // array.push([modules[i].HEADING,'https://master3.acktechnologies.com/tutorial/cGRZL1duSWFSbC84UnZNSVpLdVpXUT09/Q3dHY0hwM3h6YmJISmZSQkxmZ1NXUT09/',false,0,modules[i].NO,modules[i].CATEGORY_TITLE])
                }
                setModuleArray(array);
            }
        }).catch(function (error) {
            setErrorMsg(error.response.data.msg + "\nPlease try again!");
            setTimeout(() => {
                setErrorMsg('');
            }, 2000);
        });
    }

    const downloadContent = () => {
        RNFS.downloadFile({
            fromUrl: `${BaseURL.appURL}/tutorial/PhonicsB1_test.zip`,
            toFile: RNFS.DocumentDirectoryPath + '/PhonicsB1_test.zip'
        }).promise.then((result) => {
            const sourcePath = `${RNFS.DocumentDirectoryPath}/PhonicsB1_test.zip`;
            const targetPath = `${RNFS.DocumentDirectoryPath}`;
            unzip(sourcePath, targetPath)
                .then((path) => {
                    setSuccessMsg('Download completed!');
                })
                .catch((error) => {
                    setErrorMsg(error);
                })
        }).catch((err) => {
            setErrorMsg(err);
        });
    }

    const renderMenuLink = (link, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (mode == 'single') {
                        if (index == currentPage + 1 || currentPage == moduleArray.length - 1) {
                            moduleArray[currentPage][2] = true;
                        }
                        setCurrentPage(index)
                    } else {
                        setScrollToIndex(index)
                        scrollHandler()
                    }
                    setOpenMenu(false)
                }}
                disabled={((index == currentPage || index == currentPage + 1) && !moduleArray[index][2]) || moduleArray[index][2] ? false : true}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                {link[2] ?
                    <View style={styles.tickCircle}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: '#FFFFFF' }}
                            size={12}
                        />
                    </View> : null}
                <Text
                    style={[
                        styles.link,
                        currentPage == index ? { color: '#10AF41' } : null,
                        ((index == currentPage || index == currentPage + 1) && !moduleArray[index][2]) || moduleArray[index][2] ? null : { color: 'rgba(rgba(0, 0, 0, 0.3)' }
                    ]}>{link[0]}</Text>
            </TouchableOpacity>
        )
    };

    const renderContent = (link, index) => {
        var ratio = defaultAspectRatio
        if (link[3] != 0) {
            ratio = link[3]
        }
        return (
            <View
                key={index}
                style={orientation == 'portrait' ? { marginTop: 100, marginTop: 100 } : null}
                onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    iframes[index] = layout.y;
                    setIframes(iframes);
                }}
            >
                {orientation == 'portrait' ? <Text style={styles.contentTitle}>{link[0]}</Text> : null}
                <View
                    style={[
                        styles.iframe,
                        orientation == 'landscape' ?
                            (ratio < 1.5 ? { height: (height * 0.89), width: (height * 0.90) * ratio } : { width: (width * 0.82), height: (width * 0.83) / ratio }) :
                            { width: width * 0.95, height: (width * 0.95) / ratio },
                    ]}>
                    <WebView
                        source={{ uri: link[1] }}
                    />
                </View>
            </View>
        )
    };

    const renderAspectRatio = () => {
        if (moduleArray[currentPage][3] != 0) {
            setAspectRatio(moduleArray[currentPage][3])
        } else {
            setAspectRatio(defaultAspectRatio)
        }
    };

    const renderProgressBar = (module, index) => {
        return (
            <TouchableOpacity key={index}
                style={[
                    styles.bar,
                    { width: width / moduleArray.length },
                    module[2] ? { backgroundColor: 'rgba(69, 200, 109, 0.3)' } : null,
                    currentPage == index ? { backgroundColor: 'rgba(16, 175, 65, 0.6)' } : null,
                    orientation == 'landscape' ? { height: 10 } : null]}
                onPress={() => {
                    if (mode == 'single') {
                        if (index == currentPage + 1 || currentPage == moduleArray.length - 1) {
                            moduleArray[currentPage][2] = true;
                        }
                        setCurrentPage(index)
                    } else {
                        setScrollToIndex(index)
                        scrollHandler()
                    }
                    setOpenMenu(false)
                }}
                disabled={((index == currentPage || index == currentPage + 1) && !module[2]) || module[2] ? false : true}
            >
                <View
                    style={[
                        styles.dot,
                        module[2] ? { backgroundColor: 'rgb(16, 175, 65)' } : null,
                        orientation == 'landscape' ? { width: 10, height: 10 } : null]}></View>
            </TouchableOpacity>
        )
    };

    const scrollHandler = () => {
        setCurrentPage(scrollToIndex)
        moduleArray[scrollToIndex][2] = true;
        if (iframes.length > scrollToIndex) {
            scrollRef.current?.scrollTo({
                x: 0,
                y: iframes[scrollToIndex],
                animated: true,
            });
        } else {
            alert('Out of Max Index');
        }
    };

    useEffect(() => {
        getModules();
        Orientation.lockToPortrait();
    }, []);

    return (
        <View style={[styles.container, { width: width, height: height }, orientation == 'landscape' ? { backgroundColor: '#393939' } : null]}>
            {successMsg != '' ? <Text style={styles.success}>{successMsg}</Text> : null}
            {errorMsg != '' ? <Text style={styles.error}>{errorMsg}</Text> : null}
            {openPrompt ?
                <View style={[styles.blackOverlay, { width: width, height: height }]}>
                    <View style={[styles.prompt, { width: width * 0.85 }]}>
                        <Text style={styles.promptQuestion}>
                            Would you like to download this content to view it offline?
                        </Text>
                        <Image
                            source={require('../assets/images/Download_icon.png')}
                            style={{ marginTop: 30 }} />
                        <View style={styles.answersWrap}>
                            <TouchableOpacity onPress={() => {
                                // setOpenPrompt(false)
                                // setDownload(true)
                                // setSuccessMsg('Please wait for the download to be completed.')
                                // downloadContent()
                            }}>
                                <Text style={[styles.promptAnswer, { color: '#10AF41', marginRight: 50 }]}>OK!</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setOpenPrompt(false)}>
                                <Text style={[styles.promptAnswer, { color: 'rgba(0,0,0,0.5)' }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}
            <View>
                <TouchableOpacity style={styles.menuBtn} onPress={() => setOpenMenu(true)}>
                    <FontAwesomeIcon
                        icon={faBars}
                        style={styles.menuIcon}
                        size={23}
                    />
                </TouchableOpacity>
                {openMenu ?
                    (<View style={[styles.menu, { width: width, maxHeight: height - 10 }]}>
                        <View style={styles.menuControls}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => props.navigation.navigate('CourseCatalog')}>
                                <FontAwesomeIcon
                                    icon={faAngleLeft}
                                    style={{ color: 'rgba(0,0,0,0.3)' }}
                                    size={40}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeMenu} onPress={() => setOpenMenu(false)}>
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    style={{ color: 'rgba(0,0,0,0.3)' }}
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.moduleContent}>Module Contents</Text>
                        <ScrollView contentContainerStyle={[styles.menuStyle, { height: 40 * moduleArray.length, width: width }]} style={styles.menuLinks}>
                            {moduleArray.map(renderMenuLink)}
                        </ScrollView>
                    </View>) : null}
                {moduleArray.length > 1 ?
                    <View style={orientation == 'landscape' ? [styles.controls, { flexDirection: 'column-reverse' }] : styles.controls}>
                        <TouchableOpacity
                            style={[styles.single, mode == 'single' ? (orientation == 'landscape' ? { backgroundColor: 'rgb(99, 99, 99)' } : { backgroundColor: '#e8e8e8' }) : null]}
                            onPress={() => {
                                setMode('single')
                                scrollRef.current?.scrollTo({
                                    y: 0,
                                    animated: true,
                                });
                                setCurrentPage(0)
                                setOpenMenu(false)
                            }}>
                            <FontAwesomeIcon
                                icon={faArrowsAltH}
                                style={orientation == 'landscape' ? { color: 'rgba(255,255,255,0.5)' } : { color: 'rgba(0,0,0,0.3)' }}
                                size={23}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.scroll, mode == 'scroll' ? (orientation == 'landscape' ? { backgroundColor: 'rgb(99, 99, 99)' } : { backgroundColor: '#e8e8e8' }) : null]}
                            onPress={() => {
                                setMode('scroll')
                                scrollRef.current?.scrollTo({
                                    y: 20,
                                    animated: true,
                                });
                                for (let i = 0; i < moduleArray.length; i++) {
                                    moduleArray[i][2] = true;
                                }
                                setOpenMenu(false)
                            }}>
                            <FontAwesomeIcon
                                icon={faArrowsAltV}
                                style={orientation == 'landscape' ? { color: 'rgba(255,255,255,0.5)' } : { color: 'rgba(0,0,0,0.3)' }}
                                size={23}
                            />
                        </TouchableOpacity>
                    </View> : null}
            </View>
            <ScrollView
                contentContainerStyle={[
                    styles.contentContainerStyle,
                    mode == 'scroll' ?
                        (orientation == 'landscape' ?
                            { height: (height * 0.90) * moduleArray.length, width: width, marginTop: 13, marginBottom: 13 } :
                            { height: (height * 0.65) * moduleArray.length, width: width, marginTop: height * 0.2, marginBottom: height * 0.2 }) :
                        { height: (height * 0.90), justifyContent: 'center', alignItems: 'center' }
                ]}
                ref={scrollRef} >
                {mode == 'single' ? (
                    <View>
                        {orientation == 'portrait' ? <Text style={styles.contentTitle}>{moduleArray.length != 0 ? moduleArray[currentPage][0] : null}</Text> : null}
                        <View
                            style={[
                                styles.iframe,
                                orientation == 'landscape' ?
                                    (aspectRatio < 1.5 ? { height: (height * 0.89), width: (height * 0.90) * aspectRatio } : { width: (width * 0.82), height: (width * 0.83) / aspectRatio }) :
                                    { width: width * 0.95, height: (width * 0.95) / aspectRatio }]}
                        >
                            {moduleArray.length != 0 ? <WebView
                                onLoadProgress={renderAspectRatio}
                                source={{ uri: moduleArray[currentPage][1] }}
                            /> : null}

                        </View>
                    </View>
                ) : moduleArray.map(renderContent)}
            </ScrollView>
            <View
                style={[
                    styles.progressBar,
                    { width: width },
                    orientation == 'landscape' ? { height: 10 } : null
                ]}>
                {moduleArray.map(renderProgressBar)}
            </View>
            <View style={mode == 'scroll' ? { display: 'none' } : null}>
                <TouchableOpacity
                    style={[styles.previous, currentPage == 0 ? { display: 'none' } : null]}
                    onPress={() => {
                        if (currentPage > 0) {
                            if (currentPage == moduleArray.length - 1) {
                                moduleArray[currentPage][2] = true;
                            }
                            var newCurrentPage = currentPage - 1
                            setCurrentPage(newCurrentPage)
                        }
                        setOpenMenu(false)
                    }}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        style={orientation == 'landscape' ? { color: 'rgba(255,255,255,0.5)' } : { color: 'rgba(0,0,0,0.3)' }}
                        size={35}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.next, currentPage == moduleArray.length - 1 ? { display: 'none' } : null]}
                    onPress={() => {
                        if (currentPage >= 0 || currentPage < moduleArray.length - 1) {
                            var newCurrentPage = currentPage + 1
                            moduleArray[currentPage][2] = true;
                            setCurrentPage(newCurrentPage)
                        }
                        setOpenMenu(false)
                    }}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        style={orientation == 'landscape' ? { color: 'rgba(255,255,255,0.5)' } : { color: 'rgba(0,0,0,0.3)' }}
                        size={35}
                    />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    success: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFFFF',
        backgroundColor: '#2DAB54',
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
    blackOverlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    prompt: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    answersWrap: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    promptQuestion: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C2C2C',
        fontSize: 16,
        lineHeight: 30,
        textAlign: 'center'
    },
    promptAnswer: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'center'
    },
    contentContainerStyle: {
        flexGrow: 1,
        height: '100%',
    },
    menuBtn: {
        position: 'absolute',
        top: 10,
        width: 50,
        height: 60,
        backgroundColor: '#e8e8e8',
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    menuIcon: {
        color: 'rgba(0,0,0,0.3)'
    },
    menu: {
        backgroundColor: '#e8e8e8',
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,
        position: 'absolute',
        top: 10,
        zIndex: 20,
        padding: 20,
        paddingLeft: 20,
        paddingRight: 30,
    },
    menuControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    closeMenu: {
        marginLeft: 'auto',
    },
    moduleContent: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#2C2C2C',
        fontSize: 18,
        lineHeight: 40,
        marginLeft: 20
    },
    menuLinks: {
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 30
    },
    menuStyle: {
        flexGrow: 1,
        height: '100%'
    },
    link: {
        fontFamily: 'Montserrat-Medium',
        color: '#2C2C2C',
        fontSize: 16,
        lineHeight: 40,
    },
    tickCircle: {
        width: 24,
        height: 24,
        borderRadius: 50,
        backgroundColor: '#2DAB54',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    controls: {
        position: 'absolute',
        right: 0,
        top: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        zIndex: 10,
    },
    single: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginLeft: 10,
        marginBottom: 10,
    },
    scroll: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginLeft: 10,
        marginBottom: 10,
    },
    iframe: {
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    contentTitle: {
        fontFamily: 'Montserrat-SemiBold',
        color: 'rgba(44,44,44,0.5)',
        fontSize: 12,
        lineHeight: 34,
        textAlign: 'center'
    },
    progressBar: {
        height: 5,
        borderRadius: 50,
        backgroundColor: 'rgb(242, 242, 242)',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    bar: {
        height: 5,
        backgroundColor: 'rgb(242, 242, 242)',
        borderRadius: 50,
    },
    dot: {
        height: 5,
        width: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 50,
        marginLeft: 'auto'
    },
    previous: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 70,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    next: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 70,
        height: 60,
        justifyContent: 'center',
        marginLeft: 'auto',
        alignItems: 'center',
        marginBottom: 10,
    }
});

export default ContainerPage;
