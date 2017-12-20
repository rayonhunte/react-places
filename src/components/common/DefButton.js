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
    <View style={[Styles.buttonStyle, {backgroundColor: props.color}]}>
      <Text style={styles.textStyle}>{props.children}</Text>
    </View>
  );
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

const Styles = StyleSheet.create({  
  buttonStyle:{
    padding:10,
    margin:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:"black"
  },
  textStyle:{
    fontSize:20
  }
})
export default DefButton;