import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/Home";
import Profile from "../screen/Profile";
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
    <Stack.Navigator initialRouteName="Recettes">
      <Stack.Group>
        <Stack.Screen name="Recettes" component={Recettes} />
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
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen
        name="Products"
        children={() => <ProductTab />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            if (navigation.canGoBack()) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Produits" }],
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="Recettes"
        children={() => <RecipeTab />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            if (navigation.canGoBack()) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Recettes" }],
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="MapTab"
        children={() => <MapTab />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            if (navigation.canGoBack()) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Map" }],
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="Favoris"
        children={() => <FavoriteTab />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            if (navigation.canGoBack()) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Mes favoris" }],
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="NotifTab"
        children={() => <NotifTab />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // e.preventDefault();
            if (navigation.canGoBack()) {
              navigation.reset({
                index: 0,
                routes: [{ name: "Notifications" }],
              });
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
