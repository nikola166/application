import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux'

import IndexScreen from '../screen/IndexScreen'
import StatsScreen from '../screen/StatsScreen'

import {Icon} from 'react-native-elements'

// Главный компонент приложения
class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router sceneStyle={{backgroundColor: '#fff'}}>
                <Scene key="root"
                       tabs={true}
                       tabBarPosition="bottom"
                       lazy={true}
                       labelStyle={{
                           fontSize: 12
                       }}
                       activeTintColor={'#2089dc'}
                       animationEnabled={false}>
                    <Scene
                        key="index"
                        component={IndexScreen}
                        title="Главная страница"
                        initial={true}
                        direction="vertical"
                        backTitle="Назад"
                        tabBarLabel="Главная"
                        icon={() => <Icon underlayColor="transparent"
                                          type="entypo"
                                          name="home"
                                          size={30}/>}
                    />
                    <Scene
                        key="stats"
                        component={StatsScreen}
                        title="Страница котировок"
                        direction="vertical"
                        tabBarLabel="Котировоки"
                        backTitle="Назад"
                        icon={() => <Icon underlayColor="transparent"
                                          type="entypo"
                                          name="line-graph"
                                          size={30}/>}
                    />
                </Scene>
            </Router>
        );
    }
}

export default App;
