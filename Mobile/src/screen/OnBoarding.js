import React, { useState, useEffect } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FirstScreen from "../components/onBoarding/FirstScreen";
import SecondScreen from "../components/onBoarding/SecondScreen";
import LastScreen from "../components/onBoarding/LastScreen";
import Stepper from "../components/onBoarding/Stepper";

function OnBoarding({ onBoarded, setOnBoarded }) {
  const [step, setStep] = useState(0);
  const onBoarding = [
    { id: 0, component: <FirstScreen step={step} /> },
    { id: 1, component: <SecondScreen step={step} /> },
    {
      id: 2,
      component: <LastScreen step={step} setOnBoarded={setOnBoarded} />,
    },
  ];

  const setLocalStorage = async () => {
    try {
      await AsyncStorage.setItem("onBoarded", "true");
      setOnBoarded(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("OnBoarded HERE", onBoarded);
  }, [onBoarded]);

  return (
    <View style={styles.container}>
      {onBoarding[step].component}
      <Stepper
        step={step}
        setStep={setStep}
        onBoarding={onBoarding}
        setLocalStorage={setLocalStorage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default OnBoarding;
