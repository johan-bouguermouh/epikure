import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { getFarmers } from "../../services/farmer.service";
import { UserContext } from "../../contexts/UserContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Avatar from "../common/Avatar";
import {
  addFavoriteFarmer,
  deleteFavoriteFarmer,
} from "../../services/guest.service";
import ProductGridComponent from "../products/ProductGridComponent";
import PlaceList from "../Stores/PlaceList";

function Productor({ route, navigation }) {
  const {
    location,
    thisFarmerIsFav,
    addFavoriteFarmerStore,
    removeFavoriteFarmerStore,
  } = useContext(UserContext);
  const { farmerId } = route.params;
  const [isloading, setIsLoading] = useState(true);
  const [isInFavorite, setIsFavorite] = useState(false);
  const [farmer, setFarmer] = useState({});
  const [products, setProducts] = useState([]);
  const [places, setPlaces] = useState([]);

  function addFavoriteHandler() {
    addFavoriteFarmer(farmerId);
    addFavoriteFarmerStore(farmer);
  }

  function deleteFavoriteHandler() {
    deleteFavoriteFarmer(farmerId);
    removeFavoriteFarmerStore(farmerId);
  }

  useEffect(() => {
    getFarmers(farmerId, location).then((data) => {
      setIsLoading(false);
      const { products, places, ...farmer } = data;
      setFarmer(farmer);
      setProducts(products);
      setPlaces(places);
      setIsFavorite(thisFarmerIsFav(farmerId));
    });
  }, [farmerId]);

  if (isloading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#AD59AD" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ height: 200, width: "100%", position: "relative" }}>
          <Image
            source={{ uri: farmer.bannerUrl }}
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 0,
                margin: 0,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 90,
                  position: "relative",
                  height: "100%",
                  backgroundColor: "red",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    top: -12,
                    left: 0,
                  }}
                >
                  <Avatar
                    uriImage={farmer.avatarUrl}
                    size={90}
                    isPressable={false}
                  />
                </View>
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: 600,
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  textAlign: "left",
                  textAlignVertical: "bottom",
                  textShadowColor: "rgba(0, 0, 0, 0.75)",
                  textShadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 3,
                  flex: 1,
                }}
              >
                {farmer.publicName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                isInFavorite ? deleteFavoriteHandler() : addFavoriteHandler();
                setIsFavorite(!isInFavorite);
              }}
            >
              {isInFavorite ? (
                <FontAwesome name="heart" size={24} color="white" />
              ) : (
                <Feather name="heart" size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 12, paddingVertical: 42, gap: 12 }}>
          {farmer.isBio && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#FFD6CB",
                padding: 12,
                borderRadius: 8,
                gap: 12,
                borderColor: "#D9B3D9",
                borderWidth: 0.5,
              }}
            >
              <FontAwesome5 name="seedling" size={24} color="#672B67" />
              <Text style={{ color: "#672B67", flex: 1, fontWeight: 500 }}>
                {`${farmer.publicName} pratique l'agriculture biologique`}
              </Text>
            </View>
          )}
          <Text style={{ fontSize: 18, fontWeight: 500 }}>
            {farmer.shortDescription}
          </Text>
          <Text>{farmer.description}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 12,
              borderBottomColor: "#D9B3D9",
              borderBottomWidth: 1,
            }}
          >
            Mes produits du moments
          </Text>
          <ProductGridComponent products={products} navigation={navigation} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 12,
              borderBottomColor: "#D9B3D9",
              borderBottomWidth: 1,
            }}
          >
            Localiser mes produits
          </Text>
          <PlaceList places={places} navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Productor;
