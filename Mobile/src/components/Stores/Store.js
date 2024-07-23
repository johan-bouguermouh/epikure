import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getPlace } from "../../services/place.service";
import HeaderScreen from "../common/HeaderScreen";

function Store({ route, navigation }) {
  const [place, setPlace] = useState(null);
  const [openingHours, setOpeningHours] = useState({
    lundi: {
      open: null,
      close: null,
    },
    mardi: {
      open: null,
      close: null,
    },
    mercredi: {
      open: null,
      close: null,
    },
    jeudi: {
      open: null,
      close: null,
    },
    vendredi: {
      open: null,
      close: null,
    },
    samedi: {
      open: null,
      close: null,
    },
    dimanche: {
      open: null,
      close: null,
    },
  });
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const id = route.params.placeId;

  const url = process.env.EXPO_PUBLIC_BASE_URL;

  if (!id) {
    navigation.navigate("Map");
  }

  useEffect(() => {
    getPlace(id).then((result) => {
      setPlace(result);
    });
  }, []);

  useEffect(() => {
    if (place) {
      console.log("place", place);
      setLoading(false);

      const splitAddress = place?.address.split(",");
      setStreet(splitAddress[0].trim());
      setPostalCode(splitAddress[1].trim());

      setImage(place?.urlImage.replace("http://localhost", url));

      place.openingHours.periods.forEach((period) => {
        switch (period.close.day) {
          case 0:
            setOpeningHours((prev) => ({
              ...prev,
              dimanche: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 1:
            setOpeningHours((prev) => ({
              ...prev,
              lundi: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 2:
            setOpeningHours((prev) => ({
              ...prev,
              mardi: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 3:
            setOpeningHours((prev) => ({
              ...prev,
              mercredi: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 4:
            setOpeningHours((prev) => ({
              ...prev,
              jeudi: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 5:
            setOpeningHours((prev) => ({
              ...prev,
              vendredi: {
                // add a 0 if number less than 10
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          case 6:
            setOpeningHours((prev) => ({
              ...prev,
              samedi: {
                open: `${
                  period.open.hour < 10
                    ? `0${period.open.hour}`
                    : period.open.hour
                }h${period.open.minute}`,
                close: `${
                  period.close.hour < 10
                    ? `0${period.close.hour}`
                    : period.close.hour
                }h${period.close.minute}`,
              },
            }));
            break;
          default:
            break;
        }
      });
    }
  }, [place]);

  // useEffect(() => {
  //   if (openingHours) {
  //     console.log("openingHours", openingHours);
  //   }
  // }, [openingHours]);

  return (
    <View>
      {/* <Text>Magasin</Text>
      <Button
        title="Go to Produit"
        onPress={() => navigation.push("Produit")}
      />
      <Button
        title="Go to Producteur"
        onPress={() => navigation.push("Producteur")}
      /> */}

      {loading ? (
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
      ) : (
        <ScrollView>
          <HeaderScreen
            urlBannerImage={image}
            title={place?.name}
            addFavoriteHandler={() => console.log("Add favorite")}
            isFavorite={false}
            deleteFavoriteHandler={() => console.log("Delete favorite")}
            isCallableFavorite={true}
          />
          <View style={styles.content}>
            <View style={styles.addressContainer}>
              <Text style={{ fontSize: 18 }}>{street}</Text>
              <Text style={{ fontSize: 18 }}>{postalCode}</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.timingTitle}>Horaires d'ouverture: </Text>
              <View style={styles.timing}>
                <Text>
                  Lundi: {openingHours.lundi.open} - {openingHours.lundi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Mardi: {openingHours.mardi.open} - {openingHours.mardi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Mercredi: {openingHours.mercredi.open} -{" "}
                  {openingHours.mercredi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Jeudi: {openingHours.jeudi.open} - {openingHours.jeudi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Vendredi: {openingHours.vendredi.open} -{" "}
                  {openingHours.vendredi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Samedi: {openingHours.samedi.open} -{" "}
                  {openingHours.samedi.close}
                </Text>
              </View>
              <View style={styles.timing}>
                <Text>
                  Dimanche: {openingHours.dimanche.open} -{" "}
                  {openingHours.dimanche.close}
                </Text>
              </View>
            </View>

            <View style={styles.separator}></View>
          </View>
        </ScrollView>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E6CCE6",
  },
});

export default Store;
