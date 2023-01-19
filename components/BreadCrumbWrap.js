import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';
import { faList, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import CircleButton from './CircleButton';
import BreadCrumb from './BreadCrumb';
import Orientation from 'react-native-orientation';

const windowWidth = Dimensions.get('window').width;

function BreadCrumbWrap(props) {
    const renderBreadCrumb = (breadCrumb, index) => {
        return (
            <View key={index} style={{ flexDirection: 'row' }}>
                <Text style={styles.breadcrumb}>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</Text>
                {breadCrumb.type == 'course' ? <BreadCrumb breadcrumb={breadCrumb.name} onPress={() => props.getCourses(breadCrumb.id, breadCrumb.name)} /> : null}
                {breadCrumb.type == 'module' ? <BreadCrumb breadcrumb={breadCrumb.name} /> : null}
            </View>
        );
    };
    useEffect(() => {
        Orientation.lockToPortrait();
    });
    return (
        <View style={[styles.BreadCrumbWrapRow, props.width]}>
            <View style={{
                flexDirection: 'row', width: windowWidth - 150, alignItems: 'center', flexWrap: 'wrap'
            }}>
                <BreadCrumb breadcrumb={'Category'} />
                {props.breadcrumbObj.map(renderBreadCrumb)}
            </View>
            {props.displayGrid ?
                <View style={styles.row}>
                    <CircleButton
                        style={props.modeOfCards == 'grid' ? [styles.grid, styles.selected] : styles.grid}
                        icon={faGripVertical}
                        size={20}
                        press={() => props.setModeOfCards('grid')} />
                    <CircleButton
                        style={props.modeOfCards == 'list' ? [styles.list, styles.selected] : styles.list}
                        icon={faList}
                        size={18}
                        press={() => props.setModeOfCards('list')} />
                </View>
                : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    breadcrumb: {
        fontFamily: 'Montserrat-Medium',
        color: 'rgba(0,0,0,0.5)',
        lineHeight: 20,
        marginTop: 10,
    },
    selected: {
        backgroundColor: '#f3f3f3',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    row: {
        position: 'absolute',
        right: 25,
        flexDirection: 'row',
    },
    grid: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    list: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginLeft: 10,
    },
    BreadCrumbWrapRow: {
        minHeight: 40,
        flexDirection: 'row',
        marginTop: 14,
        paddingLeft: 30,
        paddingRight: 25,
        width: windowWidth
    },
});

export default BreadCrumbWrap;
