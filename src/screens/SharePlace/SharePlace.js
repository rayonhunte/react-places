import React, { Component } from 'react';
import {Text, View, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';
import Input from '../../components/common/Input';
import MainText from '../../components/common/MainText';
import FormHeader from '../../components/common/FormHeader';
import imagePlaceHolder from '../../assets/kitty.jpeg';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import LocateMe from '../../components/LocateMe/LocateMe';
import PlaceInput from '../../components/PlaceInput/PlaceInput';


class SharePlace extends Component{
  
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  
  constructor(props){
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
  }
  state={
    placeName:""
  }
  placeNameChangedHandler = placeName =>{
    this.setState({
      placeName
    })
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
  placeAddedHandler = () =>{
    if(this.state.placeName.trim() !== "" ){
      this.props.onAddPlace(this.state.placeName);
    }
  }
  render(){
    return (
      <ScrollView>
          <View>
            <ImagePicker/>
            <LocateMe/>
            <PlaceInput 
              value={this.state.placeName}
              onChangeText={this.placeNameChangedHandler}
              />
            <View style={styles.buttonStyle}>
              <Button title="Share Place!" onPress={this.placeAddedHandler}/>
            </View>
          </View>
      </ScrollView>
    );
  } 
}

const mapDispatchToProps = dispatch =>{
  return{
    onAddPlace: (placeName)=> dispatch(addPlace(placeName))
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  placeHolder:{
    borderWidth:1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "80%",
    height:150
  },
  buttonStyle:{
    margin:8
  },
  previewImage:{
    width:"100%",
    height:"100%",
    flex:1
  }
});

export default connect(null,mapDispatchToProps)(SharePlace);