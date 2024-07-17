import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Favoris from "../screen/Favoris";
import Store from "../components/Stores/Store";
import Product from "../components/products/Product";
import Recipe from "../components/Recipes/Recipe";
import Productor from "../components/Productors/Productor";

const Stack = createStackNavigator();

function FavoriteTab({ renderHeaderLeft }) {
  return (
    <Stack.Navigator initialRouteName="Mes Favoris">
      <Stack.Group>
        <Stack.Screen name="Mes favoris" component={Favoris} />
        <Stack.Screen
          name="Magasin"
          component={Store}
          options={({ navigation }) => ({
            headerLeft: () => renderHeaderLeft({ navigation }),
          })}
        />
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
        <Stack.Screen
          name="Producteur"
          component={Productor}
          options={({ navigation }) => ({
            headerLeft: () => renderHeaderLeft({ navigation }),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default FavoriteTab;
