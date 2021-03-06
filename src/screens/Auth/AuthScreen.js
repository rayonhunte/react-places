import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TextInput, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import Input from '../../components/common/Input';
import FormHeader from '../../components/common/FormHeader';
import MainText from '../../components/common/MainText';
import backgroundImage from '../../assets/background.jpg';
import DefButton from '../../components/common/DefButton';
import validate from '../../utility/validation';
import {connect} from 'react-redux';
import {tryAuth, authAutoSignIn} from '../../store/actions';

class AuthScreen extends Component {
    state = {
       viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape",
       authMode: "login",
       controls: {
           email:{
               value:"",
               valid:false,
               validationRules:{
                   isEmail: true
               },
               touched: false
           },
           password:{
               value:"",
               valid:false,
               validationRules:{
                minLength: 6
            },
            touched: false
           },
           confirmPassword:{
               value:"",
               valid:false,
               validationRules:{
                equalTo: 'password'
            },
            touched: false
           }
       }
      }
    constructor(props){
        super(props)
        Dimensions.addEventListener("change", this.updateStyles)
    }
    componentWillUnmount(){
        Dimensions.removeEventListener("change",this.updateStyles)
    }
    componentDidMount(){
        console.log("auto sign")
        this.props.onAutoSignIn()
    }
    updateStyles = (dims) =>{
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
         });
    }
    
    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return {
             authMode: prevState.authMode === 'login' ? 'signup': "login"
            }
        });
    }
    
    authHandler = ()=>{
        const {email, password} = this.state.controls
        const authData = {
            email: email.value,
            password: password.value
        }
        this.props.onTryAuth(authData, this.state.authMode);
   }
   updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

   render () {
        let headingText = null;
        let confirmPasswordControl = null;
        const {email, password,confirmPassword} = this.state.controls 

        let submitAuth = (
            <DefButton 
                onPress={this.authHandler} 
                color="#29aaf4"
                disabled={!email.valid || !password.valid || !confirmPassword.valid && this.state.authMode==='signup'}
                > 
                Submit
            </DefButton>
        )
        if (this.props.isLoading){
            submitAuth = (
                <ActivityIndicator />
            )
        }

        if (this.state.viewMode === "portrait"){
            headingText = (
               <MainText>
                 <FormHeader>Please Login</FormHeader>
                </MainText>
            );
        }
        if (this.state.authMode === 'signup'){
            confirmPasswordControl = (
                <View style={
                    this.state.viewMode === 'portrait' ? styles.portrait : styles.landscape
                }>
                <Input 
                    placeholder="Confirm Password" 
                    style={styles.input} 
                    value={confirmPassword.value}
                    onChangeText={val => this.updateInputState('confirmPassword', val)}
                    valid={email.valid}
                    touched={email.touched}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    />
                </View>
            );
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                    <ImageBackground source={backgroundImage} style={styles.backImage}>
                        <KeyboardAvoidingView behavior="padding" style={styles.container}>
                                {headingText}
                                <DefButton color="#29aaf4" onPress={this.switchAuthModeHandler}>
                                    {this.state.authMode === 'login' ? 'Switch To SingUp': 'Switch To Login'}
                                </DefButton>
                                    <View style={styles.inputContainer}>
                                        <Input 
                                            placeholder="Your Email Address" 
                                            style={styles.input} 
                                            value={email.value}
                                            onChangeText={val => this.updateInputState('email', val)}
                                            valid={email.valid}
                                            touched={email.touched}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            />
                                        
                                        <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitContainer : styles.landscapeContainer}>
                                            <View style={
                                                this.state.viewMode === 'portrait' || this.state.authMode ==='login' ? styles.portrait : styles.landscape
                                            }>
                                            <Input 
                                                placeholder="Password"  
                                                style={styles.input} 
                                                value={password.value}
                                                onChangeText={val => this.updateInputState('password', val)}
                                                valid={email.valid}
                                                touched={email.touched}
                                                autoCapitalize="none"
                                                secureTextEntry={true}
                                                />
                                            </View>
                                            { confirmPasswordControl }
                                        </View>
                                    </View>
                            {submitAuth}
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container:{
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


const mapDispatchToProps = dispatch =>{
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    }
  }
  
  const mapStateToProps = state =>{
    return {
      isLoading: state.ui.isLoading

    }
  }


export default connect(null,mapDispatchToProps)(AuthScreen);