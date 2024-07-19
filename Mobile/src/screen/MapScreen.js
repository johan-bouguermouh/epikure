import React, { useState, useEffect, useContext } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { UserContext } from "../contexts/UserContext";
import cursor from "../../assets/curser map.png";
import ModalPlace from "../components/map/ModalPlace";

function MapScreen({ navigation }) {
  const { location, errorMsg } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalContent, setModalContent] = useState({
    title: "Magasin",
    description: "Magasin de produits locaux",
  });

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  useEffect(() => {
    console.log("MODAL OPEN", modalOpen);
  }, [modalOpen]);

  useEffect(() => {
    console.log("MODAL CONTENT", modalContent);
  }, [modalContent]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        showsUserLocation
        loadingEnabled
        loadingIndicatorColor="#AD59AD"
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={cursor}
          title="Magasin"
          description="Magasin de produits locaux"
        >
          <Callout tooltip />
        </Marker>
      </MapView>

      {modalOpen && (
        <View style={styles.modal}>
          <ModalPlace content={modalContent} />
        </View>
      )}

      {/* <TouchableOpacity
        onPress={() => navigation.push("Magasin")}
        style={{ position: "absolute", bottom: 20, right: 20 }}
      >
        <Text>Magasin</Text>
      </TouchableOpacity> */}
      {/* <Text>Map</Text>
      <Button
        title="Go to Magasin"
        onPress={() => navigation.push("Magasin")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   display: "flex",
  //   flex: 1,
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  map: {
    width: "100%",
    height: "100%",
    // zIndex: 0,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    // bottom: 0,
    // right: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    opacity: 0.5,
    zIndex: 1,
  },
});

export default MapScreen;
