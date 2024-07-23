import React from "react";
import { View,StyleSheet,Text, Image } from "react-native";
import {vh} from 'react-native-expo-viewport-units';
import illustration_3 from '../../../assets/illustration_3.png';

function LastScreen() {
  return (
    
    <View style={styles.container}>
      <Image source={illustration_3} style={styles.image} />
      <Text style={styles.text}><Text style={{fontWeight: 'bold', color: "#913C91"}}>Cuisinez de saison </Text>: découvrez des recettes inspirées par les fruits et légumes du moment.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
    height: vh(80),
    width: "80%",
   }, 
  image: {
    width: 370,
    height: 370,
  },
  text: {
    fontSize: 20,
  },
});

export default LastScreen;
