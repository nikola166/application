import React from 'react'
import { View, StyleSheet, Text } from 'react-native'


const IndexScreen = (props) => {
    const {
        container
    } = styles

    return (
        <View style={container}>
            <Text>Главная страница</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default IndexScreen;