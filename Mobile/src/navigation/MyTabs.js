import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackActions } from "@react-navigation/native";

import ProductTab from "./ProductTab";
import RecipeTab from "./RecipeTab";
import MapTab from "./MapTab";
import FavoriteTab from "./FavoriteTab";
import NotifTab from "./NotifTab";

import { TouchableOpacity } from "react-native";
import TabNavigation from "../components/common/tabNavigation/TabNavigation";

const Tab = createBottomTabNavigator();

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
      tabBar={(props) => <TabNavigation {...props} />}
    >
      <Tab.Screen
        name="Products"
        children={() => <ProductTab renderHeaderLeft={renderHeaderLeft} />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="Recettes"
        children={() => <RecipeTab renderHeaderLeft={renderHeaderLeft} />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="MapTab"
        screenOptions={{ unmountOnBlur: true }}
        children={() => <MapTab renderHeaderLeft={renderHeaderLeft} />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="Favoris"
        children={() => <FavoriteTab renderHeaderLeft={renderHeaderLeft} />}
        listeners={resetTabStacksOnBlur}
      />
      <Tab.Screen
        name="NotifTab"
        children={() => <NotifTab renderHeaderLeft={renderHeaderLeft} />}
        listeners={resetTabStacksOnBlur}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
