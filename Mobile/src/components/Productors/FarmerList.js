import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../common/Avatar";

export default function FarmerList({ farmers, navigation }) {
  return (
    <View style={{ gap: 8 }}>
      {farmers.map((farmer) => (
        <TouchableOpacity
          style={{ flex: 1, width: "100%" }}
          key={farmer.id}
          onPress={() => {
            navigation.navigate("Producteur", { farmerId: farmer.id });
          }}
        >
          <View
            style={{
              padding: 4,
              backgroundColor: "#FFD6CB",
              borderRadius: 8,
              borderColor: "#D9B3D9",
              borderWidth: 0.5,
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Avatar size={80} uriImage={farmer.avatarUrl} />
            <View style={{ flex: 1, gap: 4 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#672B67",
                  fontWeight: "500",
                  maxWidth: "100%",
                  padding: 0,
                  margin: 0,
                }}
              >
                {farmer.publicName}
              </Text>
              <Text
                style={{
                  padding: 0,
                  margin: 0,
                  //on limite la width pour éviter que le texte ne dépasse de la carte
                  maxWidth: "100%",
                }}
              >
                {farmer.shortDescription}
              </Text>
              <Text
                style={{
                  padding: 0,
                  margin: 0,
                  //on limite la width pour éviter que le texte ne dépasse de la carte
                  maxWidth: "100%",
                  fontWeight: 300,
                }}
              >
                {farmer.city}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
