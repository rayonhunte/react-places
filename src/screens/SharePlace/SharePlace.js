import React, { Component } from 'react';
import {Text, View} from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions'

class SharePlace extends Component{
  constructor(props){
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
  }
  OnNavigatorEvent = event =>{
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }
  placeAddedHandler = placeName =>{
    this.props.onAddPlace(placeName);
  }
  render(){
    return (
      <View>
         <PlaceInput onPlaceAdded={this.props.onAddPlace}/>
      </View>
    );
  } 
}

const mapDispatchToProps = dispatch =>{
  return{
    onAddPlace: (placeName)=> dispatch(addPlace(placeName))
  };
}

export default connect(null,mapDispatchToProps)(SharePlace);