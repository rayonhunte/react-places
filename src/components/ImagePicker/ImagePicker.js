import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import Input from '../../components/common/Input';
import MainText from '../../components/common/MainText'
import FormHeader from '../../components/common/FormHeader';
import imagePlaceHolder from '../../assets/kitty.jpeg';


class ImagePicker extends Component{
  render(){
    return (
        <View style={styles.container}>
          <MainText>
                <FormHeader>Share a Place With Us!</FormHeader>
          </MainText>
          <View style={styles.placeHolder}> 
              <Image source={imagePlaceHolder} style={styles.previewImage}/>
          </View>
          <View style={styles.buttonStyle}>
            <Button title="Pick Image" onPress={()=>{alert("pick image")}}/>
          </View>
        </View> 
    );
  }
};


const styles = StyleSheet.create({
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