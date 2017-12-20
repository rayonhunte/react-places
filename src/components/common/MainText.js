import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';


const MainText = props=>{
  return (
    <Text style={Styles.mainText}>
        {props.children}
    </Text>
  );
}


const Styles = StyleSheet.create({
  mainText:{
    color:"black",
    backgroundColor: "transparent"
  }
})

export default MainText;