import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Application   from './app/component/App'

import {StatStore} from './app/stores/stat-store';

const stores = { StatStore };

import { Provider } from 'mobx-react';

export default class App extends React.Component {
    render() {
        return (
            <Provider { ...stores }>
                <Application/>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
