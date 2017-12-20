import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import Input from '../../components/common/Input';
import MainText from '../../components/common/MainText'
import FormHeader from '../../components/common/FormHeader';
import imagePlaceHolder from '../../assets/kitty.jpeg';


class ImagePicker extends Component{
  render(){
    return (
        <View style={Styles.container}>
          <MainText>
                <FormHeader>Share a Place With Us!</FormHeader>
          </MainText>
          <View style={Styles.placeHolder}> 
              <Image source={imagePlaceHolder} style={Styles.previewImage}/>
          </View>
          <View style={Styles.buttonStyle}>
            <Button title="Pick Image" onPress={()=>{alert("pick image")}}/>
          </View>
        </View> 
    );
  }
};


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
  },
  previewImage:{
    width:"100%",
    height:"100%",
    flex:1
  }
});

export default ImagePicker;