import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { getProducts } from "../services/product.service";
import ProductGridComponent from "../components/products/ProductGridComponent";
import SeasonalFrieze from "../components/products/SeasonalFrieze";
import working_progress from "../../assets/working_progress.png";

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
      <ScrollView>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DDD6C6",
          }}
        >
          <Image
            source={working_progress}
            style={{ width: 320, height: 320 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: 600,
              marginVertical: 12,
            }}
          >
            Work in progress !
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: 18,
              paddingHorizontal: "8%",
              marginBottom: "20%",
            }}
          >
            Bientôt, des recettes avec les produits de vos producteurs préférés
            !
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Produits;
