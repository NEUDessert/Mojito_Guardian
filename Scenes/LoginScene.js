/**
 * Created by Lawrence on 2016/10/19.
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from 'react-native-button';
import SharedPreferences from 'react-native-shared-preferences'

export default class LoginScene extends Component {

    render() {
        SharedPreferences.getItem('protectCode', (value) => {
            if(value) {
                this.props.navigator.push({
                    title: 'AuthScene'
                });
                return (
                    <View>Nothing.</View>
                );
            }
        });
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>请输入监护代码：</Text>
                <TextInput editable={true} placeholder={'123'}/>
                <Button
                    style={{fontSize: 20, color: '#999999'}}
                    styleDisabled={{color: 'red'}}
                    onPress={() => {
                        this.props.navigator.push({
                            title: 'AuthScene',
                        });
                    }
                    }>
                    确认
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   base: {
       textAlign: 'center'
   }
});