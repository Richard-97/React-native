import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ onPress, children }) => {
    const { buttonStyle, textStyle } = styles;
    return(
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#007aff',
        marginRight: 5,
        width: 150
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 13,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
})

export { Button };