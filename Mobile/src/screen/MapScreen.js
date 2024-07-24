import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { UserContext } from "../contexts/UserContext";
import cursor from "../../assets/curser map.png";
import ModalPlace from "../components/map/ModalPlace";
import { getMap } from "../services/place.service";

function MapScreen({ navigation }) {
  const { location, errorMsg } = useContext(UserContext);
  const [places, setPlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: null,
    image: null,
    address: null,
    open: null,
  });
  const [delta, setDelta] = useState(0.008);

  const handleCloseModal = (e) => {
    if (e.nativeEvent.action !== "marker-press") {
      setModalOpen(false);
      setModalContent(null);
    }
  };

  useEffect(() => {
    if (location.latitude) {
      getMap(location).then((result) => {
        setPlaces(result);
        //on récupère le magasin le plus proche
        console.log(result[0].distance / 111000);
        const nearestPlace = (result[0].distance + 1000) / 111000;
        if (nearestPlace < 0.008) {
          setDelta(0.008);
        } else {
          setDelta(nearestPlace);
        }
      });
    }
  }, [location]);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location.latitude) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
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
          latitudeDelta: delta,
          longitudeDelta: delta,
        }}
        showsUserLocation
        loadingEnabled
        loadingIndicatorColor="#AD59AD"
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: Number(place.latitude),
              longitude: Number(place.longitude),
            }}
            image={cursor}
            onPress={() => {
              setModalContent({
                title: place.name,
                image: place.urlImage,
                address: place.address,
                open: place.openingHours,
                id: place.id,
              });
              setModalOpen(true);
            }}
          >
            <Callout tooltip />
          </Marker>
        ))}
      </MapView>

      {modalOpen && (
        <View style={styles.modal}>
          <ModalPlace
            content={modalContent}
            navigation={navigation}
            handleOpenModal={setModalOpen}
          />
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
    backgroundColor: "#FFFFFF",
    opacity: 0.92,
    zIndex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default MapScreen;
