import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function ModalPlace({ content, navigation }) {
  // TODO : rajouter le composant banner quand il sera fait

  return (
    <View style={styles.modalContent}>
      <View style={styles.imageContainer}>
        <Image source={content.image} style={styles.modalImage} />
        <Text style={styles.modalTitle}>{content.title}</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.addressContainer}>
          <Text>{content.address.street}</Text>
          <View style={styles.cityContainer}>
            <Text>{content.address.postalCode}</Text>
            <Text>{content.address.city}</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Horaires d'ouverture:{" "}
          </Text>
          <Text style={styles.modalDescription}>{content.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.navigation}>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Magasin")}
        >
          <Text style={styles.buttonText}>Voir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    flexDirection: "column",
    color: "white",
    width: "100%",
    margin: "auto",
    gap: 10,
  },
  imageContainer: {
    width: "100%",
    height: "45%",
    // borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "black",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    //TODO : mettre la police et changer la fontWeight a semi-bold
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#FFFFFF",
    dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.66)",
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 10,
  },
  addressContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cityContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },

  timeContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  modalDescription: {},

  navigation: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    paddingBottom: 10,
  },

  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E6CCE6",
  },
  button: {
    width: "90%",
    backgroundColor: "#FFE3DC",
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222A3B",
    textAlign: "center",
  },
});

export default ModalPlace;
