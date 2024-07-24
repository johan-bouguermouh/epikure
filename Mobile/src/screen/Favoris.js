import React, { useContext, useRef } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { UserContext } from "../contexts/UserContext";
import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductGridComponent from "../components/products/ProductGridComponent";
import FarmerList from "../components/Productors/FarmerList";
import FavoritesPlacesList from "../components/Stores/FavoritesPlacesList";

function Favoris({ navigation }) {
  const { favProducts, favFarmers, favPlaces } = useContext(UserContext);
  const animationRef = useRef(null);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "white",
            elevation: 10,
          }}
        >
          <LottieView
            autoPlay
            ref={animationRef}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "#eeeeee00",
            }}
            loop
            source={require("../../assets/lotties/animation_favorite.json")}
          />
        </View>
        <View
          style={{
            paddingTop: 12,
            gap: 12,
            paddingBottom: 42,
            paddingHorizontal: 12,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 12,
              borderBottomColor: "#D9B3D9",
              borderBottomWidth: 1,
            }}
          >
            Mes produits favoris
          </Text>
          {favProducts.length > 0 ? (
            <ProductGridComponent
              products={favProducts}
              navigation={navigation}
            />
          ) : (
            <Text style={{ textAlign: "center" }}>
              Vous n'avez pas encore de produit favoris
            </Text>
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 12,
              borderBottomColor: "#D9B3D9",
              borderBottomWidth: 1,
            }}
          >
            Mes producteurs favoris
          </Text>
          {favFarmers.length > 0 ? (
            <FarmerList farmers={favFarmers} navigation={navigation} />
          ) : (
            <Text style={{ textAlign: "center" }}>
              Vous n'avez pas encore de producteur favoris
            </Text>
          )}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginVertical: 12,
              borderBottomColor: "#D9B3D9",
              borderBottomWidth: 1,
            }}
          >
            Mes magasins favoris
          </Text>
          {favPlaces.length > 0 ? (
            <FavoritesPlacesList places={favPlaces} navigation={navigation} />
          ) : (
            <Text style={{ textAlign: "center" }}>
              Vous n'avez pas encore de magasin favoris
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Favoris;
