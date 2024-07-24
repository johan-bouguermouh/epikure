import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Avatar from "../common/Avatar";

function ProductCard({ navigation, command }) {
  const { id, name, thumbnail, farmers } = command;

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.containerImage}
        onPress={() => navigation.navigate("Produit", { productId: id })}
      >
        <Image source={{ uri: thumbnail }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.containerOthers}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.farmers}>
          {farmers.map((farmer, index) => {
            if (index <= 2) {
              return (
                <View style={styles.avatarFarmer} key={index}>
                  <Avatar
                    // key={index}
                    uriImage={farmer.avatarUrl}
                    size={50}
                    isPressable={true}
                    onPressHandler={() =>
                      navigation.navigate("Producteur", {
                        farmerId: farmer.id,
                      })
                    }
                  />
                </View>
              );
            } else if (index === 3) {
              return (
                <Text key={index} style={styles.moreFarmers}>
                  +{farmers.length - 3}
                </Text>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    opacity: 0.92,
    borderWidth: 1,
    borderColor: "#E6CCE6",
    borderRadius: 8,
    marginBottom: 4,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    gap: 11,
  },

  containerImage: {
    width: 95,
    height: 92,
    borderRadius: 8,
    elevation: 5,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },

  containerOthers: {
    width: "66%",
    paddingTop: 8,
    flexDirection: "column",
    alignItems: "flex-start",
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 0,
    marginVertical: 0,
    width: "100%",
  },

  //les producteurs doivent se chevaucher
  farmers: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24,
  },

  avatarFarmer: {
    marginLeft: -33,
  },

  moreFarmers: {
    fontSize: 14,
    marginLeft: +25,
  },
});

export default ProductCard;
