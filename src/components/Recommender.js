import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import tw from "tailwind-react-native-classnames";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import obj from "./../../Data/Prediction";
import YoutubeIframe from "react-native-youtube-iframe";
const dimensionForScreen = Dimensions.get("screen");

function RaagAutoComplete(id, title) {
  this.id = id;
  this.title = title;
}

const Recommender = ({ route, navigation }) => {
  const [ragasName, ragas] = [
    route.params.Ragas.ragasName,
    route.params.Ragas.ragas,
  ];

  const [len, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playIcon, setPlayIcon] = useState("play");
  const [selectedItemVal, setSelectedItem] = useState(obj[10].value);
  const [clicked, setClicked] = useState(false);
  const [icons, setIcons] = useState("down");
  const [ids, setIds] = useState(obj[10].id);
  const [selectRagaName, setSelectRagaName] = useState("Select Raga");
  const [currentObj, setCurrentObj] = useState(ragas.ragas[8]);

  function findRagas(key) {
    for (let i = 0; i < ragas.ragas.length; i++) {
      if (ragas.ragas[i].id === key) {
        setCurrentObj(ragas.ragas[i]);
      }
    }
  }

  function findItemVal(id) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].id === id) {
        setSelectedItem(obj[i].value);
        findRagas(obj[i].value[0][0]);
      }
    }
  }

  const Alert = (msg) => {
    alert(`No more Song in the queue ${msg}`);
  };

  const ragasN = new Array();
  let leng = ragasName.length;
  for (let i = 0; i < leng; i++) {
    ragasN.push(new RaagAutoComplete(ragasName[i][0] * 1, ragasName[i][1]));
  }

  const [data, setData] = useState(ragasN);
  const onSearch = (txt) => {
    if (txt !== "") {
      let tempData = ragasN.filter((item) => {
        return item.title.toLowerCase().indexOf(txt.toLowerCase()) > -1;
      });
      setData(tempData);
    } else {
      setData(ragasN);
    }
  };

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      {/* Header */}
      <View
        style={[tw`flex flex-row px-4 py-4 pb-3 shadow-sm`, styles.headerbg]}
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
            Recommendation
          </Text>
        </View>
      </View>

      {/* Input */}

      <View style={[tw`px-4 pt-16 relative`]}>
        {/* Input Container */}
        <TouchableOpacity
          onPress={() =>
            clicked
              ? setClicked(false) & setIcons("down")
              : setClicked(true) & setIcons("up")
          }
          style={[
            tw` relative items-center justify-center`,
            styles.InputContainer,
          ]}
        >
          <Text style={[styles.text3, tw`text-lg`]}>{selectRagaName}</Text>
          <View
            style={[
              tw`w-12 h-12 absolute items-center right-0 pt-1 justify-center rounded-lg`,
              styles.iconsButton,
            ]}
          >
            <AntDesign name={icons} size={24} color="#f8f8f8" />
          </View>
        </TouchableOpacity>

        {/* Suggestion Container */}

        <View
          style={[
            tw`flex rounded-lg absolute top-28 ${!clicked ? "hidden" : "flex"}`,
            styles.suggestionContainer,
          ]}
        >
          <TextInput
            onChangeText={(txt) => onSearch(txt)}
            placeholder="Search"
            style={[tw`text-center rounded-lg`, styles.searchInput]}
          />
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    setClicked(false) &
                    setIcons("down") &
                    setIds(item.id) &
                    findItemVal(item.id) &
                    setSelectRagaName(item.title) &
                    onSearch("") &
                    (len !== 0)
                      ? setIndex(len)
                      : setIndex(0)
                  }
                  style={styles.RagaItem}
                  key={item.id}
                >
                  <Text>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>

      {/* Recommended Videos */}

      <View style={[tw`items-center pt-4`, { height: 530 }]}>
        <View style={[tw`items-center p-4`, styles.videoBg]}>
          <YoutubeIframe
            height={200}
            width={dimensionForScreen.width}
            play={playing}
            videoId={currentObj?.video}
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
        <Text style={[tw`font-bold text-xl pt-2`]}>{currentObj.raga_name}</Text>

        {/* Reduction */}

        <ScrollView style={[tw`mt-2 py-2 px-6 h-44`]}>
          <Text
            style={[
              tw`font-semibold text-lg text-justify pb-20`,
              styles.fontFam,
            ]}
          >
            {currentObj.reduction}
          </Text>
        </ScrollView>
      </View>

      {/* Buttons */}

      <View style={[tw`absolute w-full bottom-0`, styles.buttonPlayPause]}>
        <View
          style={[
            tw`flex flex-row p-3 px-12 justify-between items-center `,
            styles.videoBg,
          ]}
        >
          {len === 0 ? (
            <View style={[tw`w-8 h-8`]}></View>
          ) : (
            <TouchableOpacity
              onPress={() =>
                len === 0
                  ? Alert()
                  : setIndex(len - 1) & findRagas(selectedItemVal[len - 1][0])
              }
              style={[tw`w-8 h-8`]}
            >
              <AntDesign name="stepbackward" size={30} color="#16291a" />
            </TouchableOpacity>
          )}

          {/* Playing Button */}
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

          {/* Right move button */}
          {len === selectedItemVal.length - 1 ? (
            <View style={[tw`w-8 h-8`]}></View>
          ) : (
            <TouchableOpacity
              style={[tw`w-8 h-8`]}
              onPress={() =>
                len === selectedItemVal.length - 1
                  ? Alert()
                  : setIndex(len + 1) & findRagas(selectedItemVal[len + 1][0])
              }
              //011627
            >
              <AntDesign name="stepforward" size={30} color="#16291a" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Recommender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    //marginTop: StatusBar.currentHeight,
    backgroundColor: "#ebf0ec",
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  headerbg: {
    backgroundColor: "#9cb3a0",
    paddingTop: StatusBar.currentHeight + 4,
  },

  icon: {
    marginRight: 20,
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  autocompleteContainer: {
    borderWidth: 0,
    padding: 20,
  },
  descriptionContainer: {
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
  InputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#d7e0d9",
    borderRadius: 10,
    zIndex: 30,
    borderWidth: 0.8,
    borderColor: "#111f13",
    alignSelf: "center",
  },
  text3: {
    fontFamily: "NunitoSans_600SemiBold",
    color: "#282828",
  },
  videos: {
    backgroundColor: "#ccf0f7",
  },
  suggestionContainer: {
    width: "100%",
    height: 268,
    elevation: 5,
    zIndex: 20,
    backgroundColor: "#d7e0d9",
    borderRadius: 10,
    borderWidth: 0.4,
    marginTop: 10,
    alignSelf: "center",
  },
  suggestedButton: {
    overflow: "visible",
    borderRadius: 0.2,
    borderWidth: 0.1,
    marginVertical: 0.2,
  },
  iconsButton: {
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  videoBg: {
    backgroundColor: "#9cb3a0",
  },
  searchInput: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#111f13",
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  RagaItem: {
    width: "80%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#111f13",
    alignSelf: "center",
    justifyContent: "center",
  },
  fontFam: {
    fontFamily: "NunitoSans_400Regular",
    lineHeight: 20,
  },
});
