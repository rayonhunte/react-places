import React from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';


class PlaceInput extends React.Component{
  
  state = {
    placeName: ""
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }
    this.props.onPlaceAdded(this.state.placeName);
  };

  render(){
     return (
         <View style={styles.inputContainer}>
          <TextInput 
            placeholder="An Awesome Place"
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
            style={styles.placeInput}
          />
          <Button
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
         </View>
     );
  }
}


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