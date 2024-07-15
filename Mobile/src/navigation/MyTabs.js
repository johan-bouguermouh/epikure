import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Recettes from '../screen/Recettes';
import MapScreen from '../screen/MapScreen';
import Produits from '../screen/Produits';
import Favoris from '../screen/Favoris';
import Notifications from '../screen/Notifications';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Produits" component={Produits} />
      <Tab.Screen name="Recettes" component={Recettes} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Favoris" component={Favoris} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}


export default MyTabs