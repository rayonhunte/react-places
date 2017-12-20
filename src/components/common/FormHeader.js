
import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';



const FormHeader = (props)=>{
  return (
      <Text 
        {...props} 
        style={[styles.textHeader, props.style]}>
        {props.children}
      </Text>
  
);
}

const styles = StyleSheet.create({
  textHeader:{
    fontSize:28,
    fontWeight:"bold"
}
})


export default FormHeader;