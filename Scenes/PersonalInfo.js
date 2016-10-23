/**
 * Created by Lawrence on 2016/10/19.
 */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import JPushModule from 'jpush-react-native';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);

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
        JPushModule.initPush();
        //JPushModule.setTags(["VIP", "NOTVIP"], () => {
        //    console.log("Set tag succeed");
        //}, () => {
        //    console.log("Set tag failed");
        //});
        JPushModule.setAlias('qwerty', () => {
            console.log("Set alias succeed");
        }, () => {
            console.log("Set alias failed");
        });
        return (
            <View><Text>Nothing.</Text></View>
        )
    }
}