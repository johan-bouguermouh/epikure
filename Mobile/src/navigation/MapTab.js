import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screen/MapScreen";
import Store from "../components/Stores/Store";
import Product from "../components/products/Product";
import Productor from "../components/Productors/Productor";

const Stack = createStackNavigator();

function MapTab({ renderHeaderLeft }) {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      // screenOptions={{ headerShown : false }}
    >
      <Stack.Group>
        <Stack.Screen name="Map" component={MapScreen} />
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

export default MapTab;
