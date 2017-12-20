import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';



class LocateMe extends Component {
  render(){
    return(
      <View style={Styles.container}>
        <View style={Styles.placeHolder}>
          <Text>MAP</Text>
        </View>
        <View style={Styles.buttonStyle}>
          <Button title="Locate Me" onPress={()=>{"locate me"}}/>
        </View>
      </View> 
    );
  }

}

const Styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  placeHolder:{
    borderWidth:1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height:150
  },
  buttonStyle:{
    margin:8
  }
});



export default LocateMe;


