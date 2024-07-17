import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Notifications from "../screen/Notifications";

const Stack = createStackNavigator();

function NotifTab({ renderHeaderLeft }) {
  return (
    <Stack.Navigator initialRouteName="Notifications">
      <Stack.Group>
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default NotifTab;
