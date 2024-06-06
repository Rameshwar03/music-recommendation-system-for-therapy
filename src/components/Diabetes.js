import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import YoutubeIframe from "react-native-youtube-iframe";

const dimensionForScreen = Dimensions.get("screen");

const Diabetes = ({ route, navigation }) => {
  const disease = route.params.Disease;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playIcon, setPlayIcon] = useState("play");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, tw`relative`]} onLayout={onLayoutRootView}>
      {/* Header */}
      <View
        style={[
          tw`flex flex-row px-4 py-4 pb-3 shadow-sm rounded-lg`,
          styles.headerbg,
        ]}
      >
        <View style={[tw`pr-4`]}>
          <TouchableOpacity onPress={() => navigation.navigate("Music")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={[tw`p-2 rounded-3xl`, styles.icon]}
            />
          </TouchableOpacity>
        </View>
        <View style={[tw`w-64 flex justify-center`]}>
          <Text
            style={[tw`text-xl py-2 font-semibold capitalize`, styles.text2]}
          >
            Diabetes
          </Text>
        </View>
      </View>

      {/* Video View */}
      <View style={[tw`items-center pt-16 `]}>
        <View style={[tw`items-center p-4 py-4`, styles.videoBg]}>
          <YoutubeIframe
            height={200}
            width={dimensionForScreen.width}
            play={playing}
            videoId={disease.diabetes[index].video}
            onChangeState={(event) => {
              if (event === "playing") {
                setPlayIcon("pausecircle");
              }
              if (event === "paused") {
                setPlayIcon("play");
              }
            }}
          />
        </View>
        <View style={[tw`pt-2`]}>
          <Text style={[tw`font-bold text-xl`]}>
            {disease.diabetes[index].raag}
          </Text>
        </View>

        {/* Reduction */}
        <ScrollView style={[tw`mt-6 py-2 px-6 h-48`]}>
          <Text
            style={[
              tw`font-semibold text-lg text-justify pb-6`,
              styles.fontFam,
            ]}
          >
            {disease.diabetes[index].reduction}
          </Text>
        </ScrollView>
      </View>

      {/* Buttons */}
      <View style={[tw`absolute w-full bottom-0`]}>
        <View
          style={[
            tw`flex flex-row p-3 px-12 justify-between items-center `,
            styles.videoBg,
          ]}
        >
          {index === 0 ? (
            <View style={[tw`w-8 h-8`]}></View>
          ) : (
            <TouchableOpacity
              style={[tw`w-8 h-8`]}
              onPress={() => setIndex(index - 1)}
            >
              <AntDesign name="stepbackward" size={30} color="#16291a" />
            </TouchableOpacity>
          )}
          {/* Playing button */}
          <TouchableOpacity
            style={[tw`w-12 h-12 `]}
            onPress={() =>
              playing
                ? setPlaying(false) & setPlayIcon("play")
                : setPlaying(true) & setPlayIcon("pausecircle")
            }
          >
            <AntDesign name={playIcon} size={44} color="#16291a" />
          </TouchableOpacity>

          {index === disease.diabetes.length - 1 ? (
            <View style={[tw`w-8 h-8`]}></View>
          ) : (
            <TouchableOpacity onPress={() => setIndex(index + 1)}>
              <AntDesign name="stepforward" size={30} color="#16291a" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ebf0ec",
  },
  headerbg: {
    backgroundColor: "#9cb3a0",
    paddingTop: StatusBar.currentHeight + 4,
  },
  fontFam: {
    fontFamily: "NunitoSans_400Regular",
    lineHeight: 20,
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  icon: {
    marginRight: 20,
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  videoBg: {
    backgroundColor: "#afc2b3",
  },
});

export default Diabetes;
