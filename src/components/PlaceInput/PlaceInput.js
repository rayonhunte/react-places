import React from 'react';
import {View,StyleSheet, Button} from 'react-native';
import Input from '../../components/common/Input';


const PlaceInput = props =>(
          <Input 
            placeholder="Place Name"
            value={props.placeData.value}
            valid={props.placeData.valid}
            touched={props.placeData.touched}
            onChangeText={props.onChangeText}
          />
);


export default PlaceInput;


