import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import Music from "./src/Music";
import Diabetes from "./src/components/Diabetes";
import Hypertension from "./src/components/Hypertension";
import Blood from "./src/components/Blood";
import Recommender from "./src/components/Recommender";

const Stack = createNativeStackNavigator();

// const AlertWindow = (message) => {
//   Alert.alert("We are sorry 😣. Issue in fetching data");
// };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Music" component={Music} />
        <Stack.Screen name="Diabetes" component={Diabetes} />
        <Stack.Screen name="Hypertension" component={Hypertension} />
        <Stack.Screen name="Blood" component={Blood} />
        <Stack.Screen name="Recommender" component={Recommender} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#081c15",
  },
});
