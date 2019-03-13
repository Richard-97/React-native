import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import ImageSVG from 'react-native-remote-svg'


const ImgButton = ({ onPress, img }) => {
    const { buttonStyle } = styles;
    return(
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
                {
                    img === 'info' ?
                        <ImageSVG style={{height: 35, width: 35, }} source={require('../../img/info.svg')}/>
                    :
                    <ImageSVG style={{height: 35, width: 35, }} source={require('../../img/camera.svg')}/>
                }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderColor: '#7FDBFF',
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export { ImgButton };