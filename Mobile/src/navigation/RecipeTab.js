import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Recettes from "../screen/Recettes";
import Recipe from "../components/Recipes/Recipe";

const Stack = createStackNavigator();

function RecipeTab({ renderHeaderLeft }) {
  return (
    <Stack.Navigator initialRouteName="RecettesStack">
      <Stack.Group>
        <Stack.Screen
          name="RecettesStack"
          component={Recettes}
          options={{ title: "Recettes" }}
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

export default RecipeTab;
