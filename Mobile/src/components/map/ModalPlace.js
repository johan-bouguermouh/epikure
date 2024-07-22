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

import { Octicons } from "@expo/vector-icons";

function ModalPlace({ content, navigation }) {
  // TODO : rajouter le composant banner quand il sera fait
  const url = process.env.EXPO_PUBLIC_BASE_URL;

  const splitAddress = content.address.split(",");
  const street = splitAddress[0].trim();
  const postalCode = splitAddress[1].trim();

  const imageUrl = content.image.replace("http://localhost", url);

  console.log(content);

  return (
    <View style={styles.modalContent}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={styles.modalImage}
        />
        <Text style={styles.modalTitle}>{content.title}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.addressContainer}>
          <Text>{street}</Text>
          <View style={styles.cityContainer}>
            <Text>{postalCode}</Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            {content.open.isOpen ? (
              <View style={styles.pastilleOpen}>
                <Octicons
                  name="verified"
                  size={12}
                  color="#492549"
                  style={{
                    marginTop: 1.5,
                  }}
                />
                <Text
                  style={{
                    height: 20,
                    margin: 0,
                    color: "#492549",
                  }}
                >
                  ouvert
                </Text>
              </View>
            ) : (
              <View style={styles.pastilleClose}>
                <Octicons
                  name="x-circle"
                  size={12}
                  color="#6B453B"
                  style={{
                    marginTop: 1.5,
                  }}
                />
                <Text
                  style={{
                    height: 20,
                    margin: 0,
                    color: "#6B453B",
                  }}
                >
                  fermé
                </Text>
              </View>
            )}
            <Text>{content.open.message}</Text>
          </View>
        </View>
      </View>
      <View style={styles.navigation}>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push("Magasin", { place: content.id })}
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
    position: "relative",
    width: "100%",
    height: 200,
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

  pastilleOpen: {
    height: 24,
    verticalAlign: "middle",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F7EEF7",
    borderColor: "#E6CCE6",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },

  pastilleClose: {
    height: 24,
    verticalAlign: "middle",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF6F4",
    borderColor: "#FFE3DC",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 0,
  },

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
