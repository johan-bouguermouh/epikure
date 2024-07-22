import React from "react";
import { View,StyleSheet,Text, Image } from "react-native";
import {vh} from 'react-native-expo-viewport-units';
import illustration_4 from '../../../assets/illustration_4.png';

function FirstScreen({ step }) {
  return (
    
    <View style={styles.container}>
      <Image source={illustration_4} style={styles.image} />
      <Text style={styles.text}><Text style={{ fontWeight: 'bold', color: "#913C91"}}>Adoptez une alimentation de saison </Text>: suivez le calendrier des fruits et légumes avec notre application.</Text>
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
    width: 450,
    height: 450,
  },
  text: {
    fontSize: 20,
  },
});

export default FirstScreen;
