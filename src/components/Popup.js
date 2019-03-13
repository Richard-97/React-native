import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ImageSVG from 'react-native-remote-svg';
import { setCategoryFilter, userDelete } from '../actions';

class Popup extends Component{
    filterCategories() {
        return [ 'All users','Single', 'Married', 'Divorced', 'Widowed', 'Engagement', 'Complicated' ];
    }
    filterIcons(i){
        const src = [require('../img/allusers.svg'),
                    require('../img/single.svg'), 
                    require('../img/married.svg'),
                    require('../img/divorced.svg'),
                    require('../img/widowed.svg'),
                    require('../img/engagement.svg'),
                    require('../img/complicated.svg')
                ]
        return src[i]
    }
    renderFilterCategories(items, onDecline) {
        return items.map((item, i) => {
           const src = this.filterIcons(i)
            return <TouchableWithoutFeedback key={item} onPress={()=>{this.props.setCategoryFilter(item);onDecline() }}><View style={styles.categoryStyle}>
                            <ImageSVG style={styles.imageStyle} source={src}/>
                            <Text style={styles.categoryTextStyle}>{item}</Text>
                        </View></TouchableWithoutFeedback>
        });
    }
    renderSettings = (onDecline) => {
        return <TouchableWithoutFeedback onPress={()=>{this.props.userDelete({id:this.props.user_id}); onDecline() }}><View style={styles.categoryStyle}>
                    <ImageSVG style={styles.imageStyle} source={require('../img/deleteUser.svg')}/>
                    <Text style={styles.categoryTextStyle}>Delete user</Text>
                </View></TouchableWithoutFeedback>
    }
    renderInfos = () => {
        return (
            <View style={styles.categoryStyle}>
                <ImageSVG style={styles.imageStyle} source={require('../img/exclamation.svg')}/>
                <Text style={styles.categoryTextStyle}>All data must be filled in.</Text>
            </View>
        )
    }
    render(){
        const { visible, onDecline } = this.props;
        const { filterHeaderStyle, containerStyle, filterTextStyle, categoryTextStyle, imageStyle, categoryStyle } = styles;
        return(
            <Modal transparent visible={visible} animationType="slide" >
            <View style={containerStyle}>
                <View style={filterHeaderStyle}>
                    <View>
                        <Text style={filterTextStyle}>{this.props.type.toUpperCase()}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableWithoutFeedback onPress={onDecline}>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end', marginRight: 15, marginTop: 15}}>
                                <ImageSVG style={{height: 30, width: 30,}} source={require('../img/cancel.svg')}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    
                </View>
                {
                    this.props.type === 'filter' ?
                        this.renderFilterCategories(this.filterCategories(), onDecline)
                    :
                    this.props.type === 'settings' ?
                        this.renderSettings(onDecline)
                    :
                        this.renderInfos()
                }
            </View>
        </Modal>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor: 'rgba(255,255,255, .95)',
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-start',
    },
    filterHeaderStyle:{
        backgroundColor: '#b1cbbb',
        display: 'flex',
        flexDirection: 'row',
        borderColor: 'rgba(0,0,0, .4)',
        borderBottomWidth: 2
    },
    filterTextStyle:{
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
        padding: 15,
        letterSpacing: 2
    },
    categoryStyle:{
        flexDirection:'row',
        borderColor: 'rgba(0,0,0, .4)',
        borderBottomWidth: 2,
        alignItems: 'center'
    },
    categoryTextStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: 'rgba(0,0,0, .7)',
        padding: 15,
    },
    imageStyle: {
        height: 30,
        width: 30,
        marginLeft: 5,
        marginRight: 5
    },
})

export default connect(null , { setCategoryFilter, userDelete })(Popup);