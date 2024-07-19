import React from "react";
import { StyleSheet, View, Text } from "react-native";

function ModalPlace({ content }) {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{content.title}</Text>
      <Text style={styles.modalDescription}>{content.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    width: "95%",
    height: "95%",
    margin: "auto",
    backgroundColor: "red",
  },
  modalTitle: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  modalDescription: {},
});

export default ModalPlace;
