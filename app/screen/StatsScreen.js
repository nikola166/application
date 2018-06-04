import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Stats from '../component/Stats'

const StatsScreen = (props) => {
    const {
        container
    } = styles

    return (
        <View style={container}>
            <Stats/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    }
});

export default StatsScreen;