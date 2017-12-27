import React, { Component } from 'react';
import {Text, View, Button, StyleSheet, Image, Dimensions} from 'react-native';
import MapView from 'react-native-maps';



class LocateMe extends Component {
  state = {
    focusedLocation:{
      latitude: 6.787627,
      longitude: -58.186553,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
    },
    locationChosen:false
  }
  mapPressHandler = event => {
    const coords = event.nativeEvent.coordinate
    this.map.animateToRegion(
      {
        ...this.state.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      }
    );
    this.setState(prevState =>{
      return {
        focusedLocation:{
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen:true
      }
    })
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }
  getLocationHandler = () =>{
    navigator.geolocation.getCurrentPosition(pos=>{
      const coordsEvent = {
        nativeEvent:{
          coordinate:{
            latitude:pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      this.mapPressHandler(coordsEvent)
    }, err=>{
      console.log(err);
      alert("error getting your location please select one from the map !!!")
    });
  }
  render(){
    let marker = null;
    if (this.state.locationChosen){
      marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
    }
    return(
      <View style={styles.container}>
       <MapView 
        initialRegion={this.state.focusedLocation}
        style={styles.map}
        onPress={this.mapPressHandler}
        ref={ref => this.map = ref}
       >
        {marker}
       </MapView>
        <View style={styles.buttonStyle}>
          <Button title="Locate Me" onPress={this.getLocationHandler}/>
        </View>
      </View> 
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  map:{
    width: "90%",
    height:250
  },
  buttonStyle:{
    margin:8
  }
});



export default LocateMe;


