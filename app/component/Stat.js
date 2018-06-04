import React from "react"

import {View, Text} from 'react-native'

const Stats = (props) => {
    const {item} = props;

    return (
        <View style={[{flexDirection: 'column', borderBottomWidth: 1}, item.newValue ? {backgroundColor: '#fff2db'} : {}]}>
            <Text>Название: {item.name}</Text>
            <Text>Last: {item.last}</Text>
            <Text>highestBid: {item.highestBid}</Text>
            <Text>percentChange: {item.percentChange}</Text>
        </View>
    );
}

export default Stats;