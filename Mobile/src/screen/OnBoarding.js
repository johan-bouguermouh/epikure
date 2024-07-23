import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import FirstScreen from "../components/onBoarding/FirstScreen";
import SecondScreen from "../components/onBoarding/SecondScreen";
import LastScreen from "../components/onBoarding/LastScreen";
import Stepper from "../components/onBoarding/Stepper";
import { newGuest } from "../services/guest.service";

function OnBoarding({ setOnBoarded }) {
  const [step, setStep] = useState(0);
  const onBoarding = [
    { id: 0, component: <FirstScreen /> },
    { id: 1, component: <SecondScreen /> },
    {
      id: 2,
      component: <LastScreen />,
    },
  ];

  const setLocalStorage = async () => {
    try {
      const id = uuid.v4();
      const response = await newGuest(id);

      if (!response) {
        throw new Error("Error while creating guest");
      }
      await AsyncStorage.setItem("onBoarded", id);
      setOnBoarded(true);
    } catch (e) {
      console.log(e);
    }
  };

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
