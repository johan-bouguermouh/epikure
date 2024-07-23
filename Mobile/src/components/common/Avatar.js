import React from "react";
import { Image, View, ViewBase } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Avatar({
  uriImage,
  isPressable,
  onPressHandler,
  size,
}) {
  //On calcul la taille du borderWidh de manière a ce qu'un avatar de 50px face 3px de bordure
  const borderWidth = 3 * (size / 50);

  return (
    <View
      style={{
        width: size + 10,
        height: size + 10,
        borderRadius: size / 2 + 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isPressable ? (
        <TouchableOpacity
          onPress={onPressHandler}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Image
            source={{ uri: uriImage }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: borderWidth,
              borderColor: "white",
            }}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: uriImage }}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
            }}
          />
        </View>
      )}
    </View>
  );
}
