import React from 'react';
import {View,Text, StyleSheet, Button,Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux';
import { deletePlace } from '../../store/actions/places';


class PlaceDetail extends React.Component {
  
  state = {
    viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
  } 
  constructor(props){
    super(props)
    Dimensions.addEventListener("change", this.updateStyles)
  } 

  componentWillUnmount(){
    Dimensions.removeEventListener("change",this.updateStyles)
  }
  updateStyles = (dims)=>{
    this.setState({
      viewMode: Dimensions.get('window').height > 500 ? "portrait" : "landscape"
    }) 
  }

  placeDeletedHandler = () =>{
    this.props.onDeletePlace(this.props.selectedPlace.key)
    this.props.navigator.pop();
  }
  render(){
    console.log(styles)
    return(
      <View style={this.state.viewMode === 'portrait' ? styles.container : styles.lContainer }>
        <Image
            style={[this.state.viewMode === 'portrait' ? styles.placeImage : styles.lPlaceImage]}
            source={this.props.selectedPlace.image}/>
        <View style={this.state.viewMode === 'portrait' ? null : styles.lDetail}>
          <Text style={styles.textStyle}>{this.props.selectedPlace.name}</Text>    
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


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    margin:22
  },
  lContainer:{
    flexDirection:"row",
    justifyContent:"space-between", 
    alignItems: "center",
    margin: 20
  },
  lDetail:{
    flexDirection:"column",
    justifyContent:"center",
    width:"40%"
  },
  placeImage:{
    width: "100%",
    height: 200 
  },
  lPlaceImage:{
      width:"50%",
      height:200
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