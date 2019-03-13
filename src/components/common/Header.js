import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import ImageSVG from 'react-native-remote-svg';
import PopUp from '../Popup';
import { Actions } from 'react-native-router-flux';

class Header extends Component{
    state={
        showMenu: false
    }
    toogleMenu = () => {
        this.setState({showMenu: !this.state.showMenu})
    }
    onDecline(){
        this.setState({ showMenu: false })
    }
    render(){
        const { headerStyle, titleStyle } = styles;
        return(
            <View style={headerStyle}>
                <TouchableWithoutFeedback onPress={()=> Actions.allusers()}>
                    <View style={{flex: 1}}>
                        <ImageSVG style={{height: 40, width: 40, alignSelf: 'flex-start', marginLeft: 10}} source={require('../../img/home.svg')}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={titleStyle}>{this.props.title === '' ? 'ALL USERS' : this.props.title}</Text>
                </View>
                <TouchableWithoutFeedback onPress={this.toogleMenu}>
                    {this.props.rightComponent()}
                </TouchableWithoutFeedback>
                <PopUp visible={this.state.showMenu} onDecline={this.onDecline.bind(this)} type={this.props.type} user_id={this.props.user_id} >
                    Are you sure you want to delete this?
                </PopUp>
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        height: 60,
        flexDirection: 'row',   
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#786f72',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        matginTop: 5,
        borderColor: 'rgba(0,0,0, .7)',
        borderBottomWidth: 2
    },
    titleStyle: {
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        letterSpacing: 2
        
    }
  }

export { Header };