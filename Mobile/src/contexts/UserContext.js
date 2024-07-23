import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { getGuest, getUser } from "../services/guest.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [uuid, setUuid] = useState("");
  const [favProducts, setFavProducts] = useState([]);
  const [favFarmers, setFavFarmers] = useState([]);
  const [favPlaces, setFavPlaces] = useState([]);

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onBoarded");
      if (value) {
        setUuid(value);
        const result = await getGuest();
        console.log(result);
        const { products, farmers, places } = result;
        setFavProducts(products);
        setFavFarmers(farmers);
        setFavPlaces(places);
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

  /**
   * Verifie si un produit est dans les favoris
   * @param {number} productId
   * @returns {boolean}
   */
  function thisProductIsFav(productId) {
    return favProducts.some((product) => product.id === productId);
  }

  /**
   * Verifie si un producteur est dans les favoris
   * @param {number} farmerId
   * @returns {boolean}
   */
  function thisFarmerIsFav(farmerId) {
    return favFarmers.some((farmer) => farmer.id === farmerId);
  }

  /**
   * Verifie si un lieu est dans les favoris
   * @param {number} placeId
   * @returns {boolean}
   */
  function thisPlaceIsFav(placeId) {
    return favPlaces.some((place) => place.id === placeId);
  }

  /**
   * Ajoute un produit aux favoris
   * @param {Product} product
   * @returns {void}
   */
  async function addFavoriteProduct(product) {
    setFavProducts([...favProducts, { product }]);
  }

  /**
   * Retire un produit des favoris
   * @param {number} productId
   * @returns {void}
   */
  async function removeFavoriteProduct(productId) {
    setFavProducts(favProducts.filter((product) => product.id !== productId));
  }

  /**
   * Ajoute un producteur aux favoris
   * @param {Farmer} farmer
   * @returns {void}
   */
  async function addFavoriteFarmer(farmer) {
    setFavFarmers([...favFarmers, { farmer }]);
  }

  /**
   * Retire un producteur des favoris
   * @param {number} farmerId
   * @returns {void}
   */
  async function removeFavoriteFarmer(farmerId) {
    setFavFarmers(favFarmers.filter((farmer) => farmer.id !== farmerId));
  }

  /**
   * Ajoute un lieu aux favoris
   * @param {Place} place
   * @returns {void}
   */
  async function addFavoritePlace(place) {
    setFavPlaces([...favPlaces, { place }]);
  }

  /**
   * Retire un lieu des favoris
   * @param {number} placeId
   * @returns {void}
   */
  async function removeFavoritePlace(placeId) {
    setFavPlaces(favPlaces.filter((place) => place.id !== placeId));
  }

  return (
    <UserContext.Provider
      value={{
        location,
        setLocation,
        errorMsg,
        uuid,
        favProducts,
        favFarmers,
        favPlaces,
        thisProductIsFav,
        thisFarmerIsFav,
        thisPlaceIsFav,
        addFavoriteProduct,
        removeFavoriteProduct,
        addFavoriteFarmer,
        removeFavoriteFarmer,
        addFavoritePlace,
        removeFavoritePlace,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
