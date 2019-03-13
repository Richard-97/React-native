import React, { Component } from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View, Image } from 'react-native';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';
import ImageSVG from 'react-native-remote-svg';
import { ImgButton } from './ImgButton';

class ListItem extends Component{
    onRowPress = () => {
        Actions.editUser({ user: this.props.user })
    }
    onAddUserPress = () => {
        Actions.newUser()
    }
    render(){
        if(this.props.user){
            return(
                <View>
                    <CardSection>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                {
                                    this.props.user.image_url === '' | this.props.user.image_url === undefined ?
                                        <ImageSVG style={{height: 50, width: 50, alignSelf: 'center'}} source={require('../../img/profile.png')}/>
                                    :
                                    <Image style={{height: 50, width: 50, alignSelf: 'center', borderRadius: 50}} source={{ uri: this.props.user.image_url }}/>
                                }
                            </View >
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text style={styles.textStyle}>{this.props.user.name}</Text>
                                <Text style={styles.subTextStyle}>{this.props.user.categories}</Text>
                            </View>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight:5}}>
                                    <ImgButton img={'info'} onPress={this.onRowPress} />
                                </View>
                    </CardSection>
                </View>
        );
        }
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
                <TouchableWithoutFeedback onPress={this.onAddUserPress}>
                    <View>
                        <ImageSVG style={{height: 35, width: 35 }} source={require('../../img/add-user.svg')}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 14,
        paddingLeft: 15 
    },
    subTextStyle: {
        alignSelf: 'flex-start',
        color: 'rgba(0,0,0, .7)',
        fontWeight: '300',
        fontSize: 15
    },
    textStyle: {
        alignSelf: 'flex-start',
        color: 'rgba(0,0,0, .7)',
        fontWeight: '300',
        fontSize: 18
    }
})

export { ListItem };