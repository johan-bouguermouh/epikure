import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HeaderScreen({
  urlBannerImage,
  title,
  addFavoriteHandler,
  isFavorite,
  deleteFavoriteHandler,
  isCallableFavorite,
}) {
  const [isInFavorite, setIsFavorite] = useState(isFavorite);
  return (
    <View style={{ height: 200, width: "100%", position: "relative" }}>
      <Image
        source={{ uri: urlBannerImage }}
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
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: 600,
            justifyContent: "space-between",
            padding: 10,
            textShadowColor: "rgba(0, 0, 0, 0.75)",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3,
          }}
        >
          {title}
        </Text>
        {isCallableFavorite && (
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
        )}
      </View>
    </View>
  );
}
