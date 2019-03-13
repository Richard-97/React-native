import React from 'react';
import { View } from 'react-native';

const CardSection = ({children, color}) => {
    return (
        <View style={styles.containerStyle}>
            {children}
        </View>
    );
}

const styles = {
    containerStyle: {
        borderRadius: 10,
        display: 'flex',
        height: 70,
        justifyContent: 'center',
        itemAlign: 'center',
        borderBottomWidth: 1,
        padding: 5,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 10,
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0, .7)',
        borderWidth: 5,
        borderRadius: 10,
        marginLeft: 10,
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
}

export { CardSection };