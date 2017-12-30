import React, { Component } from 'react';
import {Text, View, TextInput, Button, StyleSheet, ScrollView, Image, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions';
import Input from '../../components/common/Input';
import MainText from '../../components/common/MainText';
import FormHeader from '../../components/common/FormHeader';
import imagePlaceHolder from '../../assets/kitty.jpeg';
import LocateMe from '../../components/LocateMe/LocateMe';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import validate from '../../utility/validation';
import PickerImage from '../../components/PickerImage/PickerImage';
import {startAddPlace} from '../../store/actions/index';


class SharePlace extends Component{
  
  static navigatorStyle = {
    navBarButtonColor: "orange"
  }
  
  constructor(props){
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.OnNavigatorEvent);
  }
  componentWillMount(){
    this.reset()
  }
  componentDidUpdate(){
    if(this.props.placeAdded){
      this.props.navigator.switchToTab({tabIndex:0})
    }
  }
  
  OnNavigatorEvent = event =>{
    console.log(event.type)
    if(event.type === "ScreenChangedEvent"){
      if(event.id === "willAppear"){
        this.props.onStartAddPlace();
      }
    }
    if(event.type === "NavBarButtonPress"){
      if(event.id === "sideDrawerToggle"){
        this.props.navigator.toggleDrawer({
          side: "left"
        })
      }
    }
  }
  
  reset = () => {
    this.setState({
      controls: {
        placeName:{
          value:"",
          valid:false,
          validationRules:{
            noPlace:false
          },
          touched: false
        },
        location:{
          value: null,
          valid: false
        },
        image:{
          value: null,
          valid: false
        }
      }
    })
  }
  placeNameChangedHandler = val =>{
    this.setState(prevState =>{
      return {
        controls: {
          ...prevState.controls,
          placeName:{
            ...prevState.controls.placeName,
            value: val,
            valid:
              validate(
                val,
                prevState.controls.placeName.validationRules
              ),
            touched: true
          }
        }
      }
    })
  }
  locationPickHandler = location =>{
    this.setState(prevState =>{
      return {
      controls:{
        ...prevState.controls,
        location:{
          value: location,
          valid: true
        }
      }
    }
    });
  }
  imagePickHandler = (image, base64) =>{
    this.setState(prevState =>{
      return {
        controls:{
          ...prevState.controls,
          image:{
            value: image,
            valid: true
          }
        }
      }
    })
  }
  
  placeAddedHandler = () =>{
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
    this.reset();
    this.imagePicker.reset()
    this.locateMe.reset()
  }
  
  render(){
    let submitButton = (
      <Button 
        title="Share Place"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid || 
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid 
          }
        color="#29aaf4"
      />
    );
    if (this.props.isLoading){
      submitButton = (
        <ActivityIndicator />
      );
    } 
    return (
      <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <PickerImage onImagePick={this.imagePickHandler}
            ref={ref => this.imagePicker = ref}
            />
            <LocateMe onLocationPick={this.locationPickHandler}
              ref={ ref=>this.locateMe = ref}
            />
            <PlaceInput 
              placeData = {this.state.controls.placeName}
              onChangeText={this.placeNameChangedHandler}
              />
            <View style={styles.container}>
              {submitButton}
            </View>
            </KeyboardAvoidingView>
      </ScrollView>
    );
  } 
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    placeAdded: state.places.placeAdded
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAddPlace: (placeName, location, image)=> dispatch(addPlace(placeName, location, image)),
    onStartAddPlace: () => dispatch(startAddPlace())
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

export default connect(mapStateToProps,mapDispatchToProps)(SharePlace);