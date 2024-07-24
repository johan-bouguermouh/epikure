import { useState, useEffect } from "react";
import "./gesture-handler";
import UserProvider from "./src/contexts/UserContext";
import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/navigation/MyTabs";
import OnBoarding from "./src/screen/OnBoarding";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [onBoarded, setOnBoarded] = useState(false);

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onBoarded");
      if (value) {
        setOnBoarded(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // SI BESOIN DE SUPPRIMER LE ONBOARDING POUR LE REVOIR (Dans une version avec profil utilisateur éventuellement)
  // const removeOnBoarding = async () => {
  //   try {
  //     await AsyncStorage.removeItem("onBoarded");
  //     setOnBoarded(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    checkOnBoarding();
  }, [onBoarded]);

  if (loading) {
    return <Text style={styles.container}>Loading...</Text>;
  }

  if (onBoarded) {
    return (
      <UserProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </UserProvider>

      // <View style={styles.container}>
      //   <Text>APPLICATION</Text>
      //   <Text>OnBoarding Completed</Text>
      //   <Button title="Remove OnBoarding" onPress={removeOnBoarding} />
      // </View>
    );
  }

  return (
    <View style={styles.container}>
      <OnBoarding setOnBoarded={setOnBoarded} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
});
