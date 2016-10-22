import React, {Component} from 'react';
import {AppRegistry, Navigator, Text} from 'react-native';
import LoginScene from './Scenes/LoginScene';
import AuthScene from './Scenes/AuthScene';
import SharedPreferences from 'react-native-shared-preferences'
const scenes = {
    LoginScene: LoginScene,
    AuthScene: AuthScene
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
        //SharedPreferences.setItem('protectCode', '123');
        return (
            <Navigator
                initialRoute={{title: this.state.initRoute}}
                configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) => {
                    let Component = scenes[route.title];
                    return <Component navigator={navigator} />
                }}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={{
                            LeftButton: (route, navigator, index, navState) =>
                            { return (<Text style={{fontSize: 20}} onPress={() => navigator.pop()}>{this.state.leftButton}</Text>) },
                            RightButton: (route, navigator, index, navState) =>
                            { },
                            Title: (route, navigator, index, navState) =>
                            { },
                        }}
                        //style={}
                    />
                }
            />

        );
    }
}
AppRegistry.registerComponent('Mojito_Guardian', () => MojitoGuardian);