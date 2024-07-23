import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { getProducts } from "../services/product.service";
import ProductGridComponent from "../components/products/ProductGridComponent";
import SeasonalFrieze from "../components/products/SeasonalFrieze";

function Produits({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#AD59AD"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ padding: 12 }}>
      <SeasonalFrieze />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 12,
          borderBottomColor: "#D9B3D9",
          borderBottomWidth: 1,
        }}
      >
        Les produits de saison
      </Text>
      <ProductGridComponent products={products} navigation={navigation} />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 12,
          borderBottomColor: "#D9B3D9",
          borderBottomWidth: 1,
        }}
      >
        Les recettes de saison
      </Text>
    </SafeAreaView>
  );
}

export default Produits;
