import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
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
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ padding: 12 }}>
      <Text style={{ fontWeight: 700, marginVertical: 4 }}>
        Si la saison s'étale du 1 ou 12{" "}
      </Text>
      <SeasonalFrieze harvestStartMounth={1} harvestEndMounth={12} />
      <Text style={{ fontWeight: 700, marginVertical: 4 }}>
        Si nous définissons pas de date, alors il prend la saison actuelle{" "}
      </Text>
      <SeasonalFrieze />
      <Text style={{ fontWeight: 700, marginVertical: 4 }}>
        Si la saison s'étale sans coupure dans l'année{" "}
      </Text>
      <SeasonalFrieze harvestStartMounth={6} harvestEndMounth={8} />
      <Text style={{ fontWeight: 700, marginVertical: 4 }}>
        Si la saison s'étale sur deux années{" "}
      </Text>
      <SeasonalFrieze harvestStartMounth={11} harvestEndMounth={3} />
      <Text style={{ fontWeight: 700, marginVertical: 4 }}>
        Si la saison d'un produit est d'un seul mois{" "}
      </Text>
      <SeasonalFrieze harvestStartMounth={3} harvestEndMounth={3} />
      <Text>Produits</Text>
      <ProductGridComponent products={products} navigation={navigation} />
    </SafeAreaView>
  );
}

export default Produits;
