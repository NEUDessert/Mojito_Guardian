/**
 * Created by Lawrence on 2016/10/19.
 */
import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Button from 'react-native-button';
import SharedPreferences from 'react-native-shared-preferences'

export default class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            protectCode: '',
            phoneNumber: '',
            returnValue: ''
        };
        SharedPreferences.getItem('protectCode', (value) => {
            if(value) {
                this.props.navigator.push({
                    title: 'AuthScene'
                });
            }
        });
    }

    submitData() {
        let data = {
            custodyCode: this.state.protectCode,
            phoneNumber: this.state.phoneNumber
        };
        fetch('http://192.168.50.199:8080/Mojito/user/contactsLogin.do?' + 'custodyCode=' + data.custodyCode + '&phoneNumber=' + data.phoneNumber, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error == 0) {
                    this.props.navigator.push({
                        title: 'PersonalInfo'
                    });
                }
                else {
                    this.setState({
                        returnValue: responseJson.error
                    })
                }
            })
            .catch((e) => {
                this.setState({
                    returnValue: e
                })
            })
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{fontSize: 20}}>请输入监护代码：</Text>
                <TextInput editable={true} placeholder={'受监护人的11位监护代码'} onChangeText={(e) => {
                    this.setState({
                        protectCode: e
                    })
                }} />
                <Text style={{fontSize: 20}}>请输入您的手机号：</Text>
                <TextInput editable={true} placeholder={'受监护人指定的应急联系人手机号'} onChangeText={(e) => {
                    this.setState({
                        phoneNumber: e
                    })
                }} />
                <Button
                    style={{fontSize: 24, color: '#999999'}}
                    styleDisabled={{color: 'red'}}
                    onPress={this.submitData.bind(this)}
                >
                    确认
                </Button>
                <Text>{this.state.protectCode}</Text>
                <Text>{this.state.phoneNumber}</Text>
                <Text>{this.state.returnValue}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   base: {
       textAlign: 'center'
   }
});