import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

const TextArea = ({ placeholder, placeholderTextColor, lines, value, onChangeText }) => {
    return(
        <View style={styles.textAreaContainer} >
            <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                numberOfLines={lines}
                multiline={true}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5
    },
})

export { TextArea }