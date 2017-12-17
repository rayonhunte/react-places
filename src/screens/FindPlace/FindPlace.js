import React, { Component } from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import ListContainer from '../../components/ListContainer/ListContainer';

class FindPlace extends Component{
  render(){
    return (
      <View>
         <ListContainer places={this.props.places} />
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