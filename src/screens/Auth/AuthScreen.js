import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
class AuthScreen extends Component {
   
    loginHandler = ()=>{
        startTabs();
   }
    render () {
        return (
            <View>
                <Text>Auth Screen</Text>
                <View>
                    <Button onPress={this.loginHandler} title="Login"/>
                </View>
            </View>
        );
    }
}

export default AuthScreen;