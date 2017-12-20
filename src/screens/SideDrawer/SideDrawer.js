import React from 'react';
import {View,Text, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'



class SideDrawer extends React.Component{ 
  logout =  () => {
   alert("logout"); 
  } 
  render(){
    return(
      <View style={[styles.container,{width: Dimensions.get("window").width * 0.8}]}>
        <TouchableWithoutFeedback onPress={this.logout}>
          <View style={styles.logoutStyle}>
              <Icon size={40} name="sign-out" color="red"/>
              <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

styles = StyleSheet.create({
  container:{
    paddingTop: 22, 
    backgroundColor: "white",
    flex: 1
  },
  logoutStyle:{
    flexDirection:"row",
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: "#979797",
    padding:5,
    backgroundColor: "#eee"
  },
  logoutText:{
    fontSize:30,
    fontWeight:"bold",
    color: "#979797",
    paddingBottom: 5
  }
});

export default SideDrawer;