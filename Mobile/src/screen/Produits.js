import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { getProducts } from "../services/product.service";
import ProductGridComponent from "../components/products/ProductGridComponent";

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
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 12,
        width: "100%",
      }}
    >
      <Text>Produits</Text>
      <ProductGridComponent products={products} navigation={navigation} />
    </SafeAreaView>
  );
}

export default Produits;
