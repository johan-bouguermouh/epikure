import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import Profile from '../screen/Profile';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default MyStack