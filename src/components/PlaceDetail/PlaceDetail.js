import React from 'react';
import {View,Text, StyleSheet, Button, Modal, Image} from 'react-native';



const PlaceDetail = props =>{
  let modalContent = null;
  if(props.selectedPlace){
    modalContent = (
      <View>
         <Image  source={props.selectedPlace.image} style={styles.placeImage}/>
         <Text style={styles.textStyle}>{props.selectedPlace.name}</Text>
      </View>
    )
  }
  return(
    <Modal visible={props.selectedPlace !== null} animationType="slide" onRequestClose={props.onModalClosed}>
      <View style={styles.modalContainer}>
          {modalContent}
        <View>
          <Button title="Delete" color='red' onPress={props.onItemDeleted}/>
          <Button  title="Close" onPress={props.onModalClosed}/>
        </View>
      </View>
    </Modal>
  )
};

styles = StyleSheet.create({
  modalContainer: {
    margin:22
  },
  placeImage:{
    width: "100%",
    height: 200 
  },
  textStyle:{
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  }
})

export default PlaceDetail;