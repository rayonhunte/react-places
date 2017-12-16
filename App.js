import React from 'react';
import { StyleSheet, View, } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import ListContainer from './src/components/ListContainer/ListContainer';
import placeImage from './src/assets/kitty.jpeg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends React.Component {
  state = {
    placeName: '',
    selectedPlace: null,
    places: []
  }
  placeNameChangeHandler = val =>{
    this.setState({
      placeName: val,
    })
  };

  placeSubmitHandler = placeName =>{
    if(this.state.placeName.trim() === ""){
      return;
    }
    this.setState(prevState =>{
      return {
        places: prevState.places.concat(
          {
            key: Math.random(), 
            name: prevState.placeName,
            image: placeImage
          })
      }
    })
  }
  placeSelectedHandler = key => {
    this.setState(prevState =>{
      return {
        selectedPlace: prevState.places.find(
          place => {
            return place.key === key; 
          }
        )
      }
    });
  }
  placeDeletedHandler = ()=>{
      this.setState(prevState => {
        return{
          places: prevState.places.filter(place =>{
            return place.key !== prevState.selectedPlace.key;
          }),
          selectedPlace: null
        }
      })
  }
  modalCloseHandler = ()=>{
    this.setState({
      selectedPlace: null
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.state.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed = {this.modalCloseHandler}
        />
        <PlaceInput 
          placeholder="Awesome Places"
          value={this.state.placeName}
          onChangeText = {this.placeNameChangeHandler}
          onPress={this.placeSubmitHandler}
        />
        <ListContainer places={this.state.places} onItemSelected={this.placeSelectedHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
