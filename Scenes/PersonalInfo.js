/**
 * Created by Lawrence on 2016/10/19.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import JPushModule from 'jpush-react-native';
import SharedPreferences from 'react-native-shared-preferences';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '123',
            state: '正常',
            protectCode: '',
            phoneNumber: ''
        };
        SharedPreferences.getItem('protectCode', (value) => {
            if(value) {
                this.setState({
                    protectCode: value
                });
            }

        });
        SharedPreferences.getItem('phoneNumber', (value) => {
            if(value) {
                this.setState({
                    phoneNumber: value
                });
            }
        });
        //JPushModule.initPush();
        ////JPushModule.setTags(["VIP", "NOTVIP"], () => {
        ////    console.log("Set tag succeed");
        ////}, () => {
        ////    console.log("Set tag failed");
        ////});
        //JPushModule.setAlias(this.state.phoneNumber, () => {
        //    console.log("Set alias succeed");
        //}, () => {
        //    console.log("Set alias failed");
        //});
    }
    componentDidMount() {
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({pushMsg: message});
        });
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: " + map.alertContent);
            console.log("extras: " + map.extras);
            // var extra = JSON.parse(map.extras);
            // console.log(extra.key + ": " + extra.value);
        });
        //JPushModule.addReceiveOpenNotificationListener((map) => {
        //    console.log("Opening notification!");
        //    this.props.navigator.push({name: "pushActivity"});
        //})
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener(receiveCustomMsgEvent);
        JPushModule.removeReceiveNotificationListener(receiveNotificationEvent);
    }

    render() {
        if(!this.state.phoneNumber) return (<View><Text>Error: -1</Text></View>);
        return (
            <View>
                <Text>{this.state.protectCode}</Text>
                <Text>{this.state.name}</Text>
            </View>
        )
    }
}