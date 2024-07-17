import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";

import Recettes from "../screen/Recettes";
import MapScreen from "../screen/MapScreen";
import Produits from "../screen/Produits";
import Favoris from "../screen/Favoris";
import Notifications from "../screen/Notifications";

import Product from "../components/products/Product";
import Recipe from "../components/Recipes/Recipe";
import Store from "../components/Stores/Store";

import { TouchableOpacity } from "react-native";
import Productor from "../components/Productors/Productor";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const renderHeaderLeft = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleGoBack} style={{ marginLeft: 10 }}>
      <Feather name="chevron-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

const ProductTab = () => {
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
};

const RecipeTab = () => {
  return (
    <Stack.Navigator initialRouteName="RecettesStack">
      <Stack.Group>
        <Stack.Screen name="RecettesStack" component={Recettes} />
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
};

const MapTab = () => {
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
};

const FavoriteTab = () => {
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
};

const NotifTab = () => {
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Group>
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

function MyTabs() {
  const resetTabStacksOnBlur = ({ navigation }) => ({
    blur: () => {
      const state = navigation.getState();

      state.routes.forEach((route, tabIndex) => {
        if (state?.index !== tabIndex && route.state?.index > 0) {
          navigation.dispatch(StackActions.popToTop());
        }
      });
    },
  });

  return (
    <Tab.Navigator
      initialRouteName="MapTab"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Products"
        children={() => <ProductTab />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="Recettes"
        children={() => <RecipeTab />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="MapTab"
        screenOptions={{ unmountOnBlur: true }}
        children={() => <MapTab />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="Favoris"
        children={() => <FavoriteTab />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="NotifTab"
        children={() => <NotifTab />}
        listeners={resetTabStacksOnBlur}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
