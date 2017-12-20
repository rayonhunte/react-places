import React from 'react';
import {View,StyleSheet, Button} from 'react-native';
import Input from '../../components/common/Input';


const PlaceInput = props => {
     return (
          <Input 
            placeholder="Place Name"
            value={props.placeName}
            onChangeText={props.onChangeText}
          />
     );
}

export default PlaceInput;