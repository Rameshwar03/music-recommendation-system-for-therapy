import { StyleSheet, View, StatusBar } from "react-native";
import React from "react";
import Lottie from "lottie-react-native";

const AppLoader = () => {
  return (
    <View style={styles.container}>
      <Lottie source={require("../assets/Apploading.json")} autoPlay loop />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
  },
});
