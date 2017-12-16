import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';


const PlaceInput = (props) =>(
  <View style={styles.inputContainer}>
    <TextInput style={styles.placeInput}
         placeholder={props.placeholder}
         value={props.placeName}
         onChangeText={props.onChangeText}
        />
    <Button style={styles.placeButton} title="Add" onPress={props.onPress}/>
  </View>
);

const styles = StyleSheet.create({
  inputContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeInput:{
    width: "70%"
  },
  placeButton:{
    width: "30%"
  },
})

export default PlaceInput;