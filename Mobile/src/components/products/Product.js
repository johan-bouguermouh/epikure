import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getProduct } from "../../services/product.service";
import { UserContext } from "../../contexts/UserContext";
import HeaderScreen from "../common/HeaderScreen";
import SeasonalFrieze from "./SeasonalFrieze";
import { defineMetricPrefixes } from "../../services/distance.service";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "../../services/guest.service";

// on récupère l'id du produit envoyer par la navigation et on le passe à la fonction getProducts

function Product({ route, navigation }) {
  const { productId } = route.params;
  const { location, errorMsg } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [numberOfPlaces, setNumberOfPlaces] = useState(5);

  useEffect(() => {
    getProduct(productId, location).then((result) => {
      setProduct(result);
      setLoading(false);
    });
  }, [productId]);

  return (
    <SafeAreaView>
      {loading ? (
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
      ) : (
        <ScrollView>
          <View style={{ paddingBottom: 24 }}>
            <HeaderScreen
              urlBannerImage={product.urlBannerImage}
              isCallableFavorite={true}
              title={product.name}
              isFavorite={false}
              addFavoriteHandler={() => {
                addFavoriteProduct(product.id);
              }}
              deleteFavoriteHandler={() => {
                removeFavoriteProduct(product.id);
              }}
            />
            <View style={{ padding: 12 }}>
              <Text>{product.description}</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 12,
                  borderBottomColor: "#D9B3D9",
                  borderBottomWidth: 1,
                }}
              >
                Saisonalité
              </Text>
              <SeasonalFrieze
                harvestStartMounth={product.harvestStartMounth}
                harvestEndMounth={product.harvestEndMounth}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 12,
                  borderBottomColor: "#D9B3D9",
                  borderBottomWidth: 1,
                }}
              >
                Informations nutritionelles{" "}
                <Text style={{ fontSize: 14, fontWeight: 300 }}>
                  (Pour 100g)
                </Text>
              </Text>
              {product.nutriscore.map((nutriscore) => (
                <View
                  key={nutriscore.name}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingVertical: 4,
                  }}
                >
                  <Text style={{ fontWeight: 500 }}>{nutriscore.name}</Text>
                  <View
                    style={{
                      marginHorizontal: 8,
                      flex: 1,
                      height: 1,
                      borderStyle: "dotted",
                      borderBottomWidth: 2,
                      borderBottomColor: "#D9B3D9",
                    }}
                  ></View>
                  <Text>{nutriscore.value}</Text>
                </View>
              ))}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 12,
                  borderBottomColor: "#D9B3D9",
                  borderBottomWidth: 1,
                }}
              >
                Où trouver ce produit ?
              </Text>
              {product.findPlaces.slice(0, numberOfPlaces).map((place) => (
                <TouchableOpacity
                  key={place.name}
                  style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                    backgroundColor: "#FFE3DC",
                    borderRadius: 8,
                    marginBottom: 8,
                    borderColor: "#D9B3D9",
                    borderWidth: 0.5,
                  }}
                  onPress={() => {
                    navigation.navigate("Magasin", { placeId: place.id });
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      paddingRight: 8,
                      borderRightColor: "#913C91",
                      borderRightWidth: 1.5,
                      minWidth: 74,
                    }}
                  >
                    <FontAwesome6
                      name="location-dot"
                      size={20}
                      color="#913C91"
                    />
                    <Text style={{ fontWeight: 400 }}>
                      {defineMetricPrefixes(place.distance)}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: 500,
                      flex: 1,
                      textAlignVertical: "center",
                      ellipsizeMode: "tail",
                    }}
                  >
                    {place.name}
                  </Text>
                </TouchableOpacity>
              ))}
              {product.findPlaces.length > numberOfPlaces && (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor: "#E6CCE6",
                    borderRadius: 8,
                  }}
                  onPress={() => {
                    setNumberOfPlaces(numberOfPlaces + 5);
                  }}
                >
                  <Text>Voir d'autres magasins</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Product;
