import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, View, } from 'react-native';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import ListContainer from './src/components/ListContainer/ListContainer';
import placeImage from './src/assets/kitty.jpeg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import { addPlace, deletePlace, deselectPlace, selectPlace } from './src/store/actions';



class App extends React.Component {

  placeAddHandler = placeName =>{
   this.props.onAddPlace(placeName)
  }
  placeSelectedHandler = key => {
    this.props.onSelectPlace(key);
  }
  placeDeletedHandler = ()=>{
     this.props.onDeletePlace()
  }
  modalCloseHandler = ()=>{
   this.props.onDeselectPlace()
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail 
          selectedPlace={this.props.selectedPlace} 
          onItemDeleted={this.placeDeletedHandler}
          onModalClosed = {this.modalCloseHandler}
        />
        <PlaceInput 
          onPlaceAdded={this.placeAddHandler}
        />
        <ListContainer places={this.props.places} onItemSelected={this.placeSelectedHandler}/>
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



const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: name => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectPlace: key => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
