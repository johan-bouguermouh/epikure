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
    { Légume: true },
    { Fruit: true },
    { Viande: true },
    { Autre: true },
  ]);

  const [Vegetables, setVegetables] = useState([]);
  const [Fruits, setFruits] = useState([]);
  const [Meats, setMeats] = useState([]);
  const [Others, setOthers] = useState([]);

  const getVegetables = () => {
    setVegetables([]);
    commands.map((command) => {
      if (command.categoryProduct.name === "Légume") {
        setVegetables((prev) => [...prev, command]);
      }
    });
  };

  const getFruits = () => {
    setFruits([]);
    commands.map((command) => {
      if (command.categoryProduct.name === "Fruit") {
        setFruits((prev) => [...prev, command]);
      }
    });
  };

  const getMeats = () => {
    setMeats([]);
    commands.map((command) => {
      if (command.categoryProduct.name === "Viande") {
        setMeats((prev) => [...prev, command]);
      }
    });
  };

  const getOthers = () => {
    setOthers([]);
    commands.map((command) => {
      if (command.categoryProduct.name === "Autre") {
        setOthers((prev) => [...prev, command]);
      }
    });
  };

  useEffect(() => {
    getVegetables();
    getFruits();
    getMeats();
    getOthers();
  }, [commands]);

  useEffect(() => {
    console.log("VEGETABLES", Vegetables.length);
  }, [Vegetables]);

  useEffect(() => {
    console.log("FRUITS", Fruits.length);
  }, [Fruits]);

  useEffect(() => {
    console.log("MEATS", Meats.length);
  }, [Meats]);

  useEffect(() => {
    console.log("OTHERS", Others.length);
  }, [Others]);

  return (
    <View>
      <View style={styles.categories}>
        {categs.map((categ, index) => (
          <TouchableOpacity
            key={index}
            style={categ[Object.keys(categ)] ? styles.active : styles.inactive}
            onPress={() => {
              setCategs((prev) => {
                return prev.map((categ, i) => {
                  if (i === index) {
                    return {
                      [Object.keys(categ)]: !categ[Object.keys(categ)],
                    };
                  }
                  return categ;
                });
              });
            }}
          >
            <Text
              style={{
                color: "#6B453B",
              }}
            >
              {Object.keys(categ)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.separator}></View>
      <ScrollView contentContainerStyle={styles.list}>
        {categs[0].Légume &&
          Vegetables.map((command, index) => (
            <ProductCard
              key={index}
              command={command}
              navigation={navigation}
            />
          ))}
        {categs[1].Fruit &&
          Fruits.map((command, index) => (
            <ProductCard
              key={index}
              command={command}
              navigation={navigation}
            />
          ))}
        {categs[2].Viande &&
          Meats.map((command, index) => (
            <ProductCard
              key={index}
              command={command}
              navigation={navigation}
            />
          ))}
        {categs[3].Autre &&
          Others.map((command, index) => (
            <ProductCard
              key={index}
              command={command}
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
    borderColor: "#FFE3DC",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  inactive: {
    borderWidth: 1,
    borderColor: "#FFE3DC",
    backgroundColor: "#FFF6F4",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    opacity: 0.33,
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
