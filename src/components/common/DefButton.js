import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  TouchableOpacity, 
  TouchableNativeFeedback,
  Platform
} from 'react-native';


const DefButton = props =>{
  const content = (
    <View style={[styles.buttonStyle, {backgroundColor: props.color}, props.disabled ?  styles.disabled: null]}>
      <Text style={[styles.textStyle, props.disabled ? styles.disabledText: null]}>{props.children}</Text>
    </View>
  );
  
  if(props.disabled){
    return content
  }
  if(Platform.OS === "android"){
  return(
    <TouchableNativeFeedback onPress={props.onPress}>
      {content}
    </TouchableNativeFeedback>
    )
  }
  return(
    <TouchableOpacity onPress={props.onPress}>
      {content} 
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({  
  buttonStyle:{
    padding:10,
    margin:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:"black"
  },
  textStyle:{
    fontSize:20
  },
  disabled:{
    backgroundColor: "#eee",
    //color: "#aaa",
    borderColor: "#aaa"
  },
  disabledText:{
    color:"red"
  }
})
export default DefButton;