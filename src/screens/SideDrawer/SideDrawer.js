import React, { Component } from "react";
import {connect} from 'react-redux'; 
import { authLogout } from '../../store/actions';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

class SideDrawer extends Component {
  logoutHandler = () =>{
    this.props.onLogout()
  }
  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
        <TouchableOpacity onPress={this.logoutHandler}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "sign-out" : "sign-out"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onLogout: () => dispatch(authLogout())
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1,
    width: width - 60,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});


export default connect(null,mapDispatchToProps)(SideDrawer);
