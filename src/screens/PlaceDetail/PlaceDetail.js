import React from 'react';
import {View,Text, StyleSheet, Button,Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';
import { deletePlace } from '../../store/actions/places';


class PlaceDetail extends React.Component {
  
  placeDeletedHandler = () =>{
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop();
  }
  render(){
  return(
      <View style={styles.container}>
        <View>
          <Image  source={this.props.selectedPlace.image} style={styles.placeImage}/>
          <Text style={styles.textStyle}>{this.props.selectedPlace.name}</Text>
        </View>    
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.iconStyle}>
              <Icon size={30} name="trash" color="red"/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
  )
}
};

const mapDispatchToProps = dispatch =>{
  return {
      onDeletePlace: key => dispatch(deletePlace(key))
  }
}

const mapStateToProps = state =>{
  return {
    places: state.places.places
  }
}


styles = StyleSheet.create({
  container: {
    margin:22
  },
  placeImage:{
    width: "100%",
    height: 200 
  },
  textStyle:{
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  iconStyle:{
    alignItems: "center"
  }
})

export default connect(null,mapDispatchToProps)(PlaceDetail);