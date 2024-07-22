import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IconMap from "./iconNaivation/IconMap";
import IconsBottomBar from "./iconNaivation/IconsBottomBar";

function TabNavigation({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ maxWidth: 44, alignItems: "center" }}
          >
            {label === "MapTab" ? (
              <View
                style={{
                  width: 44,
                  height: 44,
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <IconMap isFocused={isFocused} />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: 88,
                    height: 88,
                    alignItems: "center",
                    zIndex: 1,
                    borderRadius: 44,
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.13,
                    shadowRadius: 10,
                  }}
                ></View>
              </View>
            ) : (
              <IconsBottomBar labelName={label} isFocused={isFocused} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});

export default TabNavigation;
