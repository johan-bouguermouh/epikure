import React from "react";
import { View, Text } from "react-native";

export default function SeasonalFrieze({
  harvestStartMounth = 0,
  harvestEndMounth = 0,
}) {
  if (harvestStartMounth === 0 && harvestEndMounth === 0) {
    const date = new Date();
    harvestStartMounth = date.getMonth();
    harvestEndMounth = date.getMonth();
  } else {
    harvestStartMounth -= 1;
    harvestEndMounth -= 1;
  }

  const nameMounth = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aou",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        width: "calc(100% - 48px)",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 24,
        marginHorizontal: 12,
        marginTop: 12,
        paddingHorizontal: 12,
      }}
    >
      {nameMounth.map((mounth, index) => {
        let isInSeason = false;

        if (harvestStartMounth <= harvestEndMounth) {
          // Saison dans la même année
          isInSeason = index >= harvestStartMounth && index <= harvestEndMounth;
        } else {
          // Saison traverse la fin de l'année
          isInSeason = index >= harvestStartMounth || index <= harvestEndMounth;
        }

        if (index === harvestStartMounth || index === harvestEndMounth) {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "#AD59AD",
                width: 10,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: 2,
              }}
            >
              {harvestStartMounth !== 0 && harvestEndMounth !== 11 && (
                <Text
                  style={{
                    position: "absolute",
                    top: 50,
                    width: 30,
                    textAlign: "center",
                  }}
                >
                  {mounth}
                </Text>
              )}
            </View>
          );
        } else if (isInSeason) {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "#AD59AD",
                width: 10,
                height: 42,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            ></View>
          );
        } else {
          return (
            <View
              key={index}
              style={{
                backgroundColor: "#FFA58D",
                width: 10,
                height: 42,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 2,
              }}
            ></View>
          );
        }
      })}
      {harvestStartMounth === 0 && harvestEndMounth === 11 && (
        <Text
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            width: "100%",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Disponible tout au long de l'année
        </Text>
      )}
    </View>
  );
}
