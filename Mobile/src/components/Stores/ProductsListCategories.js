import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ProductCard from "./ProductCard";

function ProductsListCategories({ navigation, commands }) {
  const [categs, setCategs] = useState([
    { name: "Légume", isActive: true },
    { name: "Fruit", isActive: true },
    { name: "Viande", isActive: true },
    { name: "Autre", isActive: true },
  ]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(commands);
  }, [commands]);

  useEffect(() => {
    const newProducts = commands.filter((command) => {
      const categoriesToFilter = categs.filter(
        (categ) => categ.isActive === true
      );
      return categoriesToFilter.some(
        (categ) => categ.name === command.categoryProduct.name
      );
    });
    setProducts(newProducts);
  }, [categs]);

  /**
   * Verifies si un catégorie n'a pas de produits
   * @param {*} categories
   * @returns {boolean} true si la catégorie n'a pas de produits, false sinon
   */
  function isCategoriesHasNoProducts(categorie) {
    let hasNoProducts = true;
    const categoriesHasFind = commands.findIndex(
      (product) => product.categoryProduct.name == categorie
    );
    if (categoriesHasFind !== -1) {
      hasNoProducts = false;
    }
    return hasNoProducts;
  }

  return (
    <View>
      <View style={styles.categories}>
        {categs.map((categ, index) => (
          <TouchableOpacity
            key={index}
            disabled={isCategoriesHasNoProducts(categ.name)}
            style={
              !isCategoriesHasNoProducts(categ.name)
                ? categ.isActive
                  ? styles.active
                  : styles.inactive
                : styles.disabled
            }
            onPress={() => {
              const newCategs = [...categs];
              newCategs[index].isActive = !categ.isActive;
              setCategs(newCategs);
            }}
          >
            <Text
              style={{
                color: "#6B453B",
              }}
            >
              {categ.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator}></View>
      <ScrollView contentContainerStyle={styles.list}>
        {products.length > 0 &&
          products.map((product, index) => (
            <ProductCard
              key={index}
              command={product}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E6CCE6",
  },

  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },

  active: {
    borderWidth: 1,
    borderColor: "#FFC3B3",
    backgroundColor: "#FFF6F4",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  inactive: {
    borderWidth: 1,
    borderColor: "#FFE3DC",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  disabled: {
    borderWidth: 1,
    borderColor: "#FFE3DC",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    opacity: 0.5,
  },

  list: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default ProductsListCategories;
