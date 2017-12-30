import React, { Component } from "react";
import {connect} from 'react-redux'; 
import { authLogout } from '../../store/actions';
import DefButton from '../../components/common/DefButton';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";




class Settings extends Component {
  logoutHandler = () =>{
      this.props.onLogout()
  }
  render(){
    return (
      <View style={styles.container}>
           <DefButton textColor="white" color="red">Logout</DefButton>        
      </View>
    )
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onLogout: () => dispatch(authLogout())
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoutButton:{
    backgroundColor: "red",
    color: "white"
  }
}) 

export default connect(null,mapDispatchToProps)(Settings);