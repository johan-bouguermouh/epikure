import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Produits from "../screen/Produits";
import Product from "../components/products/Product";
import Recipe from "../components/Recipes/Recipe";

const Stack = createStackNavigator();

function ProductTab({ renderHeaderLeft }) {
  return (
    <Stack.Navigator initialRouteName="Produits">
      <Stack.Group screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Produits" component={Produits} />
        <Stack.Screen
          name="Produit"
          component={Product}
          options={({ navigation }) => ({
            headerLeft: () => renderHeaderLeft({ navigation }),
          })}
        />
        <Stack.Screen
          name="Recette"
          component={Recipe}
          options={({ navigation }) => ({
            headerLeft: () => renderHeaderLeft({ navigation }),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default ProductTab;
