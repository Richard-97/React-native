import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';


const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, rows, style }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return( 
        <View style={ [containerStyle, style] }>
            {
                label &&
                    <Text style={labelStyle}>{label}</Text>
            }
            <TextInput 
                placeholder={placeholder}
                value={value}
                style={inputStyle}
                onChangeText={onChangeText}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                multiline = {true}
                numberOfLines = {rows}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle:{
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1 // 2/3 z miesta lebo labelstyle ma flex 1
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1 // 1/3 zo sirky
    },
    containerStyle:{
        height: 70,
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0, .5)',
        borderBottomWidth: 2,
    }
})

export { Input }