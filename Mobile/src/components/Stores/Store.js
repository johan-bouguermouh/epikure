import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getInfoPlace } from "../../services/place.service";
import HeaderScreen from "../common/HeaderScreen";
import ProductsListCategories from "./ProductsListCategories";
import {
  addFavoritePlace,
  deleteFavoritePlace,
} from "../../services/guest.service";
import { UserContext } from "../../contexts/UserContext";

function Store({ route, navigation }) {
  const { addFavoritePlaceStore, removeFavoritePlaceStore, thisPlaceIsFav } =
    useContext(UserContext);
  const [infoPlace, setInfoPlace] = useState(null);
  const [commands, setCommands] = useState([null]);
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const id = route.params.placeId;

  const url = process.env.EXPO_PUBLIC_BASE_URL;

  if (!id) {
    navigation.navigate("Map");
  }

  const daysTranslate = [
    { name: "Lundi", short: "Lun", value: 1 },
    { name: "Mardi", short: "Mar", value: 2 },
    { name: "Mercredi", short: "Mer", value: 3 },
    { name: "Jeudi", short: "Jeu", value: 4 },
    { name: "Vendredi", short: "Ven", value: 5 },
    { name: "Samedi", short: "Sam", value: 6 },
    { name: "Dimanche", short: "Dim", value: 0 },
  ];

  useEffect(() => {
    getInfoPlace(id).then((result) => {
      // mettre le tableau result.command dans le state commands et le restant dans infoPlace
      const { command, ...rest } = result;
      if (
        result.openingHours.periods.length &&
        result.openingHours.periods[0].open.day === 0
      ) {
        const lastDayOfWeek = result.openingHours.periods.shift();
        result.openingHours.periods.push(lastDayOfWeek);
      }
      setCommands(command);
      setInfoPlace(rest);
    });
  }, []);

  useEffect(() => {
    if (infoPlace) {
      setLoading(false);

      const splitAddress = infoPlace?.address.split(",");
      setStreet(splitAddress[0].trim());
      setPostalCode(splitAddress[1].trim());

      setImage(infoPlace?.urlImage.replace("http://localhost", url));
    }
  }, [infoPlace]);

  if (loading) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={"#AD59AD"} />
      </View>
    );
  }

  return (
    <View>
      <View>
        <ScrollView>
          <HeaderScreen
            urlBannerImage={image}
            title={infoPlace?.name}
            isFavorite={thisPlaceIsFav(id)}
            addFavoriteHandler={() => {
              addFavoritePlace(id);
              addFavoritePlaceStore(infoPlace);
            }}
            deleteFavoriteHandler={() => {
              deleteFavoritePlace(id);
              removeFavoritePlaceStore(id);
            }}
            isCallableFavorite={true}
          />
          <View style={styles.content}>
            <View style={styles.addressContainer}>
              <Text style={{ fontSize: 18 }}>{street}</Text>
              <Text style={{ fontSize: 18 }}>{postalCode}</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timingTitle}>Horaires d'ouverture: </Text>
              {infoPlace.openingHours.periods.length &&
                daysTranslate.map((period, index) => {
                  const { name, value } = period;
                  const day = infoPlace.openingHours.periods.find(
                    (period) => period?.open?.day === value
                  );
                  return (
                    <View key={index} style={styles.timing}>
                      <Text style={{ fontWeight: 500 }}>{name}</Text>
                      <View
                        style={{
                          marginHorizontal: 8,
                          flex: 1,
                          height: 1,
                          borderStyle: "dotted",
                          borderBottomWidth: 2,
                          borderBottomColor: "#D9B3D9",
                        }}
                      ></View>
                      <Text style={{ fontWeight: 300 }}>
                        {!day
                          ? "Fermé"
                          : `${day.open.hour}:${
                              day.open.minute == 0 ? "00" : day.open.minute
                            } - ${day.close.hour}:${
                              day.close.minute == 0 ? "00" : day.close.minute
                            }`}
                      </Text>
                    </View>
                  );
                })}
            </View>
          </View>
          <View style={styles.separator}></View>
          {commands.length ? (
            <ProductsListCategories
              commands={commands}
              navigation={navigation}
            />
          ) : (
            <Text>Aucun produit disponible</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  modalTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    //TODO : mettre la police et changer la fontWeight a semi-bold
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    color: "#FFFFFF",
    dropShadow: "0px 4px 4px rgba(0, 0, 0, 0.66)",
    padding: 10,
    borderRadius: 10,
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 10,
    gap: 10,
    marginTop: 10,
  },
  addressContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  // cityContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   gap: 10,
  // },

  timeContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 2,
  },

  timingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  timing: {
    flexDirection: "row",
    justifyContent: "space-arround",
    alignItems: "center",
    width: "100%",
  },

  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E6CCE6",
    marginTop: 10,
  },
});

export default Store;
