import React, { Component } from 'react';
import { View, Picker, Image, Text } from 'react-native';
import { userCreate } from '../actions';
import { connect } from 'react-redux';
import {  Header, Button, Input, Spinner } from '../components/common';
import ImageSVG from 'react-native-remote-svg';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob'

const mapStateToProps = state => {
    return { 
        loading: state.addUserReducer.loading
    }
}

class CreateUser extends Component{
    state = {
        name: '',
        description: '',
        categories: 'Single',
        image_url: null,
        error: false,
    }
    categories() {
        return [ 'Single', 'Married', 'Divorced', 'Widowed', 'Engagement', 'Complicated' ];
    }
    renderPickerItems(items) {
        return items.map(item => <Picker.Item key={item} label={item} value={item} />);
    }
    addUser = () => {
        const { name, description, categories, image_url } = this.state;
        if(name !== '' && description !== '' &&  categories !== ''){
            this.setState({error: false})
            this.props.userCreate({ name, description, categories, image_url })
            if(!this.props.loading) {Actions.allusers()}
        }
        else{
            this.setState({error: true})
        }
    }

    chooseFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
          } else if (response.error) {
          } else if (response.customButton) {
            alert(response.customButton);
          } else {
            let source = response;
            this.setState({
              filePath: source,
            });
            this.uploadImage(source.uri, source.fileName).then(()=>console.log('success')).catch(()=>this.setState({error: true}))
         }
        });
      };

    uploadImage = async (uri, imageName) => {
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
    
        let uploadBlob = null
        const imageRef = firebase.storage().ref('/images').child(imageName)
        let mime = 'image/jpg'

        fs.readFile(uri, 'base64')
        .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
            })
        .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url) => {
            this.setState({ image_url: url })
            
        })
        .catch(() => {
            this.setState({ error: true })
        })  
    }
    renderRightHeaderElement = () => {
        return(
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: 10}}>
                <ImageSVG style={{height: 50, width: 50}} source={require('../img/info.svg')} />
            </View>
        )
    }
    render(){
        const { imageStyle, buttonViewStyle, inputViewStyle } = styles
        return(
            this.props.loading ?
            <Spinner />
            :
            <KeyboardAwareScrollView style={{flex: 1}}
                behavior="padding"
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                >
                <Header rightComponent={this.renderRightHeaderElement} type={'info'} />
                <View >
                        {
                            this.state.image_url !== null ?
                                <Image style={imageStyle} source={{ uri: this.state.image_url }}/>
                            :
                            <ImageSVG style={imageStyle} source={require('../img/profile.png')}/>
                        }
                </View>
                <View style={buttonViewStyle} >
                    <Button onPress={this.chooseFile}>
                        Upload Photo
                    </Button>
                </View>
                <View style={inputViewStyle} >
                    <Input rows={1} label="name:" placeholder="my name is" value={this.state.name} onChangeText={ text => this.setState({ name: text })}/>
                </View>
                <View style={inputViewStyle} > 
                    <Input rows={4} label="description:" placeholder="about you" value={this.state.description} onChangeText={ text => this.setState({ description: text })} />
                </View>
                <View style={inputViewStyle} >
                    <Picker selectedValue={this.state.categories} onValueChange={value => this.setState({ categories: value })} style={{ width: 150 }}>
                        {this.renderPickerItems(this.categories())}
                    </Picker>
                </View>
                <View style={buttonViewStyle}>
                    <Button onPress={()=>this.addUser()}>
                        Add user
                    </Button>
                    {
                        this.state.error &&
                            <Text style={{color: 'red', fontSize: 15, fonttWeight: '400'}}>Fill in all inputs.</Text>
                    }
                </View>
            </KeyboardAwareScrollView>
        );
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
    buttonViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    inputViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default connect(mapStateToProps, { userCreate })(CreateUser);