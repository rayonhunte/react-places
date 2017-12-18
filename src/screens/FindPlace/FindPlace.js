import React, { Component } from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import ListContainer from '../../components/ListContainer/ListContainer';

class FindPlace extends Component{
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
  itemSelectedHandler = key =>{
    const selectedPlace = this.props.places.find(place =>{
      return place.key === key
    })
    this.props.navigator.push({
      screen:"awesome-places.PlaceDetails",
      title: selectedPlace.name,
      passProps: {
        selectedPlace
      }
     })
  }
  render(){
    return (
      <View>
         <ListContainer places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
      </View>
    );
  } 
}

const mapDispatchToProps = dispatch =>{
  return {

  }
}

const mapStateToProps = state =>{
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);