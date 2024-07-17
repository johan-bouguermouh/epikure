import { useState, useEffect } from "react";
import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
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
      if (value !== null) {
        setOnBoarded(true);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const removeOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem("onBoarded");
      setOnBoarded(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("CHECKING ONBOARDING");
    console.log("ONBOARDED", onBoarded);
    checkOnBoarding();
  }, [onBoarded]);

  if (loading) {
    return <Text style={styles.container}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {onBoarded ? (
        // <NavigationContainer>
        //   <MyTabs />
        // </NavigationContainer>
        <View>
          <Text>APPLICATION</Text>
          <Button title="Remove OnBoarding" onPress={removeOnBoarding} />
        </View>
      ) : (
        <OnBoarding onBoarded={onBoarded} setOnBoarded={setOnBoarded} />
      )}
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
