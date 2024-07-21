import React, { useState, useEffect, useContext } from "react";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { UserContext } from "../contexts/UserContext";
import cursor from "../../assets/curser map.png";
import image_shop from "../../assets/image_shop.png";
import ModalPlace from "../components/map/ModalPlace";

function MapScreen({ navigation }) {
  const { location, errorMsg } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: null,
    image: null,
    address: {
      street: null,
      postalCode: null,
      city: null,
    },
    description: null,
  });

  const handleCloseModal = (e) => {
    if (e.nativeEvent.action !== "marker-press") {
      setModalOpen(false);
      setModalContent(null);
    }
  };

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
        onPress={(e) => handleCloseModal(e)}
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
          className="marker"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          image={cursor}
          onPress={() => {
            setModalContent({
              title: "L'ilot vert",
              image: image_shop,
              address: {
                street: "299 Av. de Mazargues",
                postalCode: "13009",
                city: "Marseille",
              },
              description:
                "lundi: 9h-12h30, 15h-19h\nmardi: 9h-12h30, 15h-19h\nmercredi: 9h-12h30, 15h-19h\njeudi: 9h-12h30, 15h-19h\nvendredi: 9h-12h30, 15h-19h\nsamedi: 9h-12h30, 15h-19h\n",
            });
            setModalOpen(true);
          }}
        >
          <Callout tooltip />
        </Marker>
      </MapView>

      {modalOpen && (
        <View style={styles.modal}>
          <ModalPlace content={modalContent} navigation={navigation} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%",
    backgroundColor: "#FFFFFF",
    opacity: 0.92,
    zIndex: 1,
  },
});

export default MapScreen;
