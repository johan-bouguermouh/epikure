import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: 43.3,
    longitude: 5.4,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [uuid, setUuid] = useState("");

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onBoarded");
      if (value) {
        setUuid(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let result = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    checkOnBoarding();
  }, [uuid]);

  return (
    <UserContext.Provider value={{ location, setLocation, errorMsg, uuid }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
