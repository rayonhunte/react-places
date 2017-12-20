import React, { Component } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import { connect } from 'react-redux';
import ListContainer from '../../components/ListContainer/ListContainer';

class FindPlace extends Component{
  
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    showAnim: new Animated.Value(0)
  }
  
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  
  constructor(props){
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
  }
  OnNavigatorEvent = event =>{
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left",
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
  placesLoadedHandler =  () =>{
    Animated.timing(this.state.showAnim,
      {
        toValue:1,
        duration: 500,
        useNativeDriver: true,
      }).start()
  }

  placesSearchHandler = ()=>{
    Animated.timing(this.state.removeAnim,
      {
        toValue:0,
        duration: 500,
        useNativeDriver: true,
      }).start(()=>{
        this.setState({
          placesLoaded:true
        })
        this.placesLoadedHandler();
      });
  }


  render(){
    let content = (
      <Animated.View style={{
        opacity: this.state.removeAnim,
        transform: [
          {
            scale: this.state.removeAnim.interpolate({
              inputRange:[0,1],
              outputRange:[12, 1]
            })
          }
        ]
      }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if(this.state.placesLoaded){
      content = (
        <Animated.View style={{
           opacity: this.state.showAnim,
        }}>
        <ListContainer 
              places={this.props.places} 
              onItemSelected={this.itemSelectedHandler}
        />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null: styles.buttonContainerStyle}>
         {content}
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

const styles = StyleSheet.create({
  buttonContainerStyle:{
    flex:1,
    justifyContent:"center",
    alignItems: "center"
  },
  searchButton:{
    borderColor: "orange",
    borderWidth:3,
    borderRadius:50,
    padding:20,
  }, 
  searchButtonText:{
    color:"orange",
    fontWeight:"bold",
    fontSize:26
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace);