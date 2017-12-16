import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ListItem from '../ListItem/ListItem';


 
const ListContainer = props =>{

  return(
  <FlatList 
    style={styles.listContainer}
    data={props.places}
    renderItem={(info)=>(
      <ListItem
         placeName={info.item.name} 
         placeImage={info.item.image}
         onItemPress={()=> props.onItemSelected(info.item.key)}
      />
    )}
   />
  );
};

const styles = StyleSheet.create({
  listContainer:{
    width: "100%"
  }
});

export default ListContainer;