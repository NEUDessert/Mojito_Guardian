/**
 * Created by Lawrence on 2016/10/22.
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from 'react-native-button';

export default class AuthScene extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>请输入您的手机号：</Text>
                <TextInput editable={true} placeholder={''}/>
                <Button
                    style={{fontSize: 20, color: '#999999'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => {
                        this.props.navigator.push({
                            title: 'LoginScene'
                        });
                    }
                    }>
                    确认
                </Button>
            </View>
        );
    }
}