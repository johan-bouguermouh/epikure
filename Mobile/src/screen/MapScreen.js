import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.3,
          longitude: 5.4,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 43.3, longitude: 5.4 }}
          title="Magasin"
          description="Magasin de produits locaux"
        />
      </MapView>
      {/* <Text>Map</Text>
      <Button
        title="Go to Magasin"
        onPress={() => navigation.push("Magasin")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
