/**
 * Created by Lawrence on 2016/10/19.
 *
 */
import React, {Component} from 'react';
import {View, Text, WebView, Dimensions, StyleSheet} from 'react-native';
import JPushModule from 'jpush-react-native';
import SharedPreferences from 'react-native-shared-preferences';

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'unknown',
            status: '正常',
            normal: true,
            protectCode: 'unknown',
            phoneNumber: 'unknown',
            locX: 113.426881,
            locY: 41.655687,
            uri: {uri: 'http://reveur.me/map/index.html'},
            pushMsg: ''
        };
        SharedPreferences.getItem('protectCode', (value) => {
            if(value) {
                this.setState({
                    protectCode: value
                });
                fetch('http://192.168.50.199:8080/Mojito/user/getRealName.do?' + 'custodyCode=' + this.state.protectCode, {
                    method: 'GET'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({
                            name: responseJson.name,
                            locX: responseJson.locX,
                            locY: responseJson.locY,
                            uri: {uri: 'http://reveur.me/map/index.html?xLoc=' + responseJson.locX + '&yLoc=' + responseJson.locY }
                        })
                    })
                    .catch((e) => {console.log(e)});
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

        JPushModule.resumePush();
        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({
                pushMsg: message,
                status: '异常'
            });
        });
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: " + map.alertContent);
            console.log("extras: " + map.extras);
            this.setState({
                normal: false,
                status: '异常'
            });
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
        JPushModule.stopPush();
    }

    render() {
        if(!this.state.phoneNumber) return (<View><Text>Error: -1</Text></View>);
        return (
            <View>
                <Text style={styles.info}>姓名: {this.state.name}</Text>
                <Text style={this.state.normal ? styles.status : styles.alert}>状态: {this.state.status}</Text>
                <WebView
                    source={this.state.uri}
                    style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height - 80
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    info: {
        fontSize: 20
    },
    status: {
        fontSize: 20
    },
    alert: {
        fontSize: 24,
        color: 'red'
    }
});