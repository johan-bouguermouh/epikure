import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: 43.3,
    longitude: 5.4,
  });
  const [uuid, setUuid] = useState("");

  const [test, setTest] = useState("test");

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onBoarded");
      if (value) {
        console.log("UUID", value);
        setUuid(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkOnBoarding();
  }, [uuid]);

  return (
    <UserContext.Provider value={{ location, setLocation, uuid }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
