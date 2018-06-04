import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import {getSnapshot} from 'mobx-state-tree'
import {View, Text, StyleSheet, Dimensions, FlatList, RefreshControl, Platform} from 'react-native'

import Stat from './Stat'

@inject("StatStore")
@observer
export default class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {timer: null};
    }

    componentDidMount() {
        const { StatStore } = this.props;
        StatStore.loadStats()
    }

    componentWillMount() {
        const { StatStore } = this.props;
        this.setState({
            timer: Platform.OS !== 'sketch' ? setInterval(() => {
                StatStore.updateLoadStats()
            }, 5000) : null
        })
    }

    componentWillUnmount() {
        if (this.state.timer) {
            clearInterval(this.state.timer)
            this.setState({timer: null })
        }
    }

    _keyExtractor = (item, index) => index.toString()

    render() {
        const { StatStore } = this.props;
        const { loadStats } = StatStore;
        const snapShotAfter = getSnapshot(StatStore);

        const {isLoading, error, isLoaded} = snapShotAfter;

        return (
            <View style={styles.container}>
                {
                    isLoading ?
                        <View style = {styles.activityIndicatorContainer}>
                            <Text>Загрузка....</Text>
                        </View>:
                        error ?
                            <View style = {styles.activityIndicatorContainer}>
                                <Text>При загрузке произошла ошибка</Text>
                            </View> : isLoaded ?
                        <View style = {{flex: 1}}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                refreshControl = {
                                    <RefreshControl
                                        tintColor = {'#000'}
                                        refreshing = {isLoading}
                                        onRefresh = {loadStats}
                                    />
                                }
                                numColumns={1}
                                data={StatStore.sortedAvailableStats}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item}) => {
                                    return (
                                        <Stat item={item}/>
                                    );
                                }}
                                onEndReached={() => {}}
                            />
                        </View>: null
                }
            </View>
        );
    }
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    activityIndicatorContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: win.width
    },
    containerColumn: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});