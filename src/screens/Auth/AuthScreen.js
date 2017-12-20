import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, ImageBackground, Dimensions} from 'react-native';
import startTabs from '../MainTabs/startMainTabs';
import Input from '../../components/common/Input';
import FormHeader from '../../components/common/FormHeader';
import MainText from '../../components/common/MainText';
import backgroundImage from '../../assets/background.jpg';
import DefButton from '../../components/common/DefButton';

class AuthScreen extends Component {
    state = {
       viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
      }
    constructor(props){
        super(props)
        Dimensions.addEventListener("change", this.updateStyles)
    }
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles)
    }

    updateStyles = (dims) =>{
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
         });
    }


    loginHandler = ()=>{
        startTabs();
   }
    render () {
        let headingText = null;
        if (this.state.viewMode === "portrait"){
            headingText = (
               <MainText>
                 <FormHeader>Please Login</FormHeader>
                </MainText>
            );
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backImage}>
                <View style={styles.container}>
                    {headingText}
                    <DefButton color="#29aaf4">Switch To Login</DefButton>
                    <View style={styles.inputContainer}>
                        <Input placeholder="Your Email Address" style={styles.input}/>
                        <View style={this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer}>
                            <View style={
                                this.state.viewMode === 'portrait' ? styles.portrait : styles.landscape
                            }>
                                <Input placeholder="Password"  style={styles.input}/>
                            </View>
                            <View style={
                                this.state.viewMode === 'portrait' ? styles.portrait : styles.landscape
                            }>
                            <Input placeholder="Confirm Password" style={styles.input}/>
                            </View>
                        </View>
                    </View>
                    <DefButton onPress={this.loginHandler} color="#29aaf4"> Submit </DefButton>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        //borderWidth: 1,
        //borderColor: "red",
        flex: 1,
        justifyContent: "center", 
        alignItems: "center" 
    },
    inputContainer:{
        width:"80%"
    },
    input:{
        backgroundColor: "#eee",
        borderColor:"#bbb"    
    },
    backImage:{
        width: "100%",
        flex: 1
    },
    landscapeContainer:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    portraitContainer:{
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    landscape:{
        width:"45%"
    },
    portrait:{
        width:"100%"
    }
})

export default AuthScreen;