import React from "react";
import { View, Text } from "react-native";
import Octicons from "react-native-vector-icons/Octicons";

const StatusIndicator = ({ isOpen }) => {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {isOpen ? (
        <View style={styles.pastilleOpen}>
          <Octicons
            name="verified"
            size={12}
            color="#492549"
            style={{
              marginTop: 1.5,
            }}
          />
          <Text
            style={{
              height: 20,
              margin: 0,
              color: "#492549",
            }}
          >
            ouvert
          </Text>
        </View>
      ) : (
        <View style={styles.pastilleClose}>
          <Octicons
            name="x-circle"
            size={12}
            color="#6B453B"
            style={{
              marginTop: 1.5,
            }}
          />
          <Text
            style={{
              height: 20,
              margin: 0,
              color: "#6B453B",
            }}
          >
            fermé
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  pastilleOpen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7EEF7",
    paddingVertical: 2,
    color: "#492549",
    paddingHorizontal: 8,
    borderRadius: 12,
    borderColor: "#E6CCE6",
    borderWidth: 0.7,
    gap: 4,
  },
  pastilleClose: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F4",
    color: "#6B453B",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderColor: "#FFE3DC",
    borderWidth: 0.7,
    gap: 4,
  },
};

export default StatusIndicator;
