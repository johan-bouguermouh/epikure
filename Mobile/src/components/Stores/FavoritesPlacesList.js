import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../common/Avatar";
import StatusIndicator from "./StatusIndicator";

const url = process.env.EXPO_PUBLIC_BASE_URL;

export default function FavoritesPlacesList({ places, navigation }) {
  return (
    <View style={{ gap: 8 }}>
      {places.map((place) => {
        //on change l'url le localhost de l'url image par l'ip de la machine
        console.log(place.urlImage);
        place.urlImage = place.urlImage.replace("http://localhost", url);
        console.log(place.urlImage);

        return (
          <TouchableOpacity
            style={{ flex: 1, width: "100%", elevation: 2 }}
            key={place.id}
            onPress={() => {
              navigation.navigate("Magasin", { placeId: place.id });
            }}
          >
            <View
              style={{
                padding: 8,
                backgroundColor: "#FFFFFF66",
                borderRadius: 8,
                borderColor: "#D9B3D9",
                borderWidth: 0.5,
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Image
                style={{ width: 80, height: 80, borderRadius: 8 }}
                source={{ uri: place.urlImage }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontWeight: "500",
                    maxWidth: "100%",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {place.name}
                </Text>
                <Text
                  style={{
                    padding: 0,
                    margin: 0,
                    //on limite la width pour éviter que le texte ne dépasse de la carte
                    maxWidth: "100%",
                  }}
                >
                  {place.address}
                </Text>
                <StatusIndicator isOpen={place.isOpen} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
