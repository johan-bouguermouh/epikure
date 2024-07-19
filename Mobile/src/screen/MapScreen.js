import React, { useState, useEffect, useContext } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import le usercontext
import { UserContext } from "../contexts/UserContext";

function MapScreen({ navigation }) {
  // on récupère le context
  const { uuid } = useContext(UserContext);
  const [location, setLocation] = useState({
    latitude: 43.3,
    longitude: 5.4,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("UUID HERE", uuid);
  }, [uuid]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let result = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    console.log("LOCATION", location);
  }, [location]);

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.paragraph}>{location.latitude}</Text>
  //     <Text style={styles.paragraph}>{location.longitude}</Text>
  //   </View>
  // );

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
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
