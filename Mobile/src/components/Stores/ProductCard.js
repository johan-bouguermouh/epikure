import React from "react";
import { Text, View, StyleSheet } from "react-native";

function ProductCard() {
  return (
    <View style={styles.card}>
      <Text>ProductCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    opacity: 0.92,
    borderWidth: 1,
    borderColor: "#E6CCE6",
    borderRadius: 8,
    margin: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default ProductCard;
