import React, { useState, useRef } from "react";
import { Dimensions, FlatList, Image, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ProductGridComponent = ({ products, navigation }) => {
  const displayWidth = Dimensions.get("window").width;
  const imageWidth = displayWidth / 4 - 8 - 24 / 4;
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);

  // Diviser les produits en groupes de 16
  const groupedProducts = [];
  for (let i = 0; i < products.length; i += 16) {
    groupedProducts.push(products.slice(i, i + 16));
  }

  const renderGroup = ({ item }) => {
    return (
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        style={{
          width: displayWidth - 24,
          height: displayWidth - 24,
          maxWidth: displayWidth - 24,
        }}
        numColumns={4}
        scrollEnabled={false} // Désactiver le défilement vertical
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={`${item._id}-${index}`}
        onPress={() => navigation.navigate("Produit", { productId: item.id })}
        style={{
          elevation: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={{
            width: imageWidth,
            height: imageWidth,
            margin: 4,
            borderRadius: 8,
            borderColor: "#F7EEF7",
            borderWidth: 0.3,
            boxShadow: "0 0 10px #00000033",
            shadowColor: "#00000033",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
          }}
        />
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(offsetX / (displayWidth - 24));
    setCurrentPage(pageIndex);
  };

  const PaginationDots = ({ currentPage, totalPages }) => {
    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={groupedProducts}
        renderItem={renderGroup}
        keyExtractor={(item, index) => `group-${index}`}
        horizontal={true} // Défilement horizontal
        contentContainerStyle={{
          flexDirection: "row",
          height: displayWidth - 24,
          maxHeight: displayWidth - 24,
        }} // Disposition en colonnes
        style={{
          width: "100%",
          height: displayWidth - 24,
          maxHeight: displayWidth - 24,
        }} // Hauteur pour 4 lignes
        snapToInterval={displayWidth - 24} // Définit l'intervalle de défilement pour 4 rangées
        decelerationRate="fast" // Rend le défilement plus rapide
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <PaginationDots
        currentPage={currentPage}
        totalPages={groupedProducts.length}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#AD59AD",
  },
  inactiveDot: {
    backgroundColor: "#FFC3B3",
  },
});

export default ProductGridComponent;
