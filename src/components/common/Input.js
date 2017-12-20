import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';



const Input = (props)=>{
  return (
      <TextInput 
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style]} 
      />
  );
}

const styles = StyleSheet.create({
  input:{
      width:"100%",
      borderWidth: 1,
      borderColor: "#eee",
      padding:5,
      marginTop :8,
      marginBottom:8
  }
})


export default Input;