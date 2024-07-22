import React from "react";
import { View,StyleSheet,Text, Image } from "react-native";
import {vh} from 'react-native-expo-viewport-units';
import illustration_2 from '../../../assets/illustration_2.png';


function FirstScreen({ step }) {
  return (
    
    <View style={styles.container}>
      <Image source={illustration_2} style={styles.image} />
      <Text style={styles.text}><Text style={{fontWeight: 'bold', color: "#913C91"}}>Avec Epikure, revenez à l'essentiel </Text>: retrouvez les produits des agriculteurs et producteurs de votre région au plus proches de chez vous.</Text>
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
