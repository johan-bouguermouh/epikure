import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

function ProductsListCategories({ navigation, placeId }) {
  return (
    <View>
      <Text>Catégories</Text>
      <View style={styles.separator}></View>
      <ProductCard />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E6CCE6",
  },
});

export default ProductsListCategories;
