import React, {Component} from 'react';
import {AppRegistry, Navigator, Text} from 'react-native';
import LoginScene from './Scenes/LoginScene';
import PersonalInfo from './Scenes/PersonalInfo';
import SharedPreferences from 'react-native-shared-preferences';
import JPushModule from 'jpush-react-native';

const scenes = {
    LoginScene: LoginScene,
    PersonalInfo: PersonalInfo
};

class MojitoGuardian extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftButton: 'Back',
            initRoute: 'LoginScene'
        };

    }
    render() {
        return (
            <Navigator
                initialRoute={{title: this.state.initRoute}}
                configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) => {
                    let Component = scenes[route.title];
                    return <Component navigator={navigator} />
                }}
            />

        );
    }
}
AppRegistry.registerComponent('Mojito_Guardian', () => MojitoGuardian);