import React, { Component } from 'react';
import { Image, TextInput, View, Picker, Text } from 'react-native';
import ImageSVG from 'react-native-remote-svg';
import { Button, TextArea, Header } from '../components/common';
import { connect } from 'react-redux';
import { userUpdate } from '../actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class EditUser extends Component{
    state = {
        name: this.props.user.name,
        description: this.props.user.description,
        categories: this.props.user.categories,
        image_url: this.props.user.image_url ? this.props.user.image_url : ''
    }
    categories() {
        return [ 'Single', 'Married', 'Divorced', 'Widowed', 'Engagement', 'Complicated' ];
    }
    renderPickerItems(items) {
        return items.map(item => <Picker.Item key={item} label={item} value={item} />);
    }
    renderRightHeaderElement = () => {
        return(
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 10}}>
                <ImageSVG style={{height: 50, width: 50}} source={require('../img/settings.svg')} />
            </View>
        )
    }
    render(){
        return(
            <KeyboardAwareScrollView
                style={{flex: 1}}
                behavior="padding"
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                >
                <Header rightComponent={this.renderRightHeaderElement} type={'settings'} user_id={this.props.user.ID}/>
                {
                    !this.props.user.image_url ?
                        <ImageSVG style={{height: 150, width: 150, alignSelf: 'center'}} source={require('../img/profile.png')}/>
                    :
                    <Image style={styles.imageStyle} source={{ uri: this.props.user.image_url }}/>
                }
                <View style={styles.inputsStyle}>
                    <TextInput style={styles.nameStyle} placeholder="Name" value={this.state.name} onChangeText={name => this.setState({ name })}/>
                </View>
                <Text style={styles.descStyle}>Describtion:</Text>
                <TextArea placeholder={"Description"} placeholderTextColor={"gray"} lines={5} value={this.state.description} onChangeText={description=>this.setState({ description })} />
                <View style={styles.inputsStyle} >
                    <Picker selectedValue={this.state.categories} onValueChange={categories => this.setState({ categories })} style={{ width: 150 }}>
                        {this.renderPickerItems(this.categories())}
                    </Picker>
                </View>
                <View style={styles.inputsStyle} >
                    <Button onPress={()=>this.props.userUpdate({ name: this.state.name, description: this.state.description, categories: this.state.categories, id: this.props.user.ID, image_url: this.state.image_url })}>
                        Save changes
                    </Button>
                </View>
                <View style={{ height: 60 }} />
            </KeyboardAwareScrollView>
        )
    }
}

const styles = {
    imageStyle: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 50,
        marginTop: 15,
        backgroundColor: 'white',
        borderColor: 'rgba(255,255,255,.5)',
        borderWidth: 4
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
    },
    pickerTextStyle: {
        fontSize: 15,
        paddingLeft: 20,
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    nameStyle: {
        padding: 5,
        fontSize: 23,
        fontWeight: '600',
        color: 'rgba(0,0,0,.5)',
    },
    descStyle: {
        fontSize: 15,
        color: 'black',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputsStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default connect(null, { userUpdate })(EditUser)