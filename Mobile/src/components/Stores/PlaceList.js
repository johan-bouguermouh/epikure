import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { defineMetricPrefixes } from "../../services/distance.service";

const PlaceList = ({ places, navigation }) => {
  const [numberOfPlaces, setNumberOfPlaces] = useState(5);
  return (
    <View>
      {places.slice(0, numberOfPlaces).map((place) => (
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
            <FontAwesome6 name="location-dot" size={20} color="#913C91" />
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
      {places.length > numberOfPlaces && (
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
  );
};

export default PlaceList;
