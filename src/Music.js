import React, {
  useLayoutEffect,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import tw from "tailwind-react-native-classnames";
import { HomeImg } from "../assets";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from "@expo-google-fonts/nunito-sans";
import axios from "axios";
import { AUTHORIZATION } from "@env";
import AppLoader from "./AppLoader";

SplashScreen.preventAutoHideAsync();

const AlertWindow = (message) => {
  Alert.alert(message);
};

const Music = ({ navigation }) => {
  const [ragas, setRagas] = useState([]);
  const [disease, setDisease] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    async function getRagas() {
      try {
        const ragas = await axios.get(
         URL_RAGAS,
          {
            headers: {
              Authorization: AUTHORIZATION,
            },
          }
        );
        setRagas(ragas.data);

        try {
          const disease = await axios.get(
            URL_DISEASE,
            {
              headers: {
                Authorization: AUTHORIZATION,
              },
            }
          );
          setDisease(disease.data);

          setLoadingState(true);
        } catch (err) {
          AlertWindow("Something went wrong!");
        }
      } catch (err) {
        AlertWindow("We are sorry 😣. Issue in fetching data");
      }
    }

    getRagas();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  let diabetes = new Array();
  let blood = new Array();
  let hypertension = new Array();
  let ragasName = new Array();
  if (!loadingState) {
    SplashScreen.hideAsync();
  }

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

  if (loadingState) {
    let leng = disease.ragas.length * 1;
    for (let i = 0; i < leng; i++) {
      if (disease.ragas[i].id === 1) {
        diabetes.push(disease.ragas[i]);
      } else if (disease.ragas[i].id === 2) {
        blood.push(disease.ragas[i]);
      } else if (disease.ragas[i].id === 3) {
        hypertension.push(disease.ragas[i]);
      }
    }

    let leng2 = ragas.ragas.length;
    for (let i = 0; i < leng2; i++) {
      ragasName.push([ragas.ragas[i].id, ragas.ragas[i].raga_name]);
    }

    return (
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* Header */}
        <View
          style={[tw`flex flex-row px-4 py-4 pb-3 shadow-sm`, styles.headerbg]}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={[tw`p-2 rounded-3xl`, styles.icon]}
            />
          </TouchableOpacity>
          <Text
            style={[tw`text-xl py-2 font-semibold capitalize`, styles.text2]}
          >
            Music Recommendation
          </Text>
        </View>
        {/* Image */}
        <View style={[tw`flex justify-center items-center py-1`]}>
          <Image
            source={HomeImg}
            style={[
              tw`w-80 h-80 rounded-lg  brightness-110 contrast-125`,
              styles.image,
            ]}
          />
        </View>

        {/* Box */}
        <View style={[tw`px-4 py-4`]}>
          {/* Diabetes */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Diabetes", { Disease: { diabetes } })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent `,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Diabetes
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Hypertension */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Hypertension", {
                Disease: { hypertension },
              })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent my-2`,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Hypertension
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Blood Pressure */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Blood", {
                Disease: { blood },
              })
            }
            style={[
              tw`flex flex-row justify-between items-center px-6 rounded-2xl bg-indigo-400 border-solid border-transparent`,
              styles.flatlist,
            ]}
          >
            <Text style={[tw`text-lg font-semibold capitalize`, styles.text]}>
              Blood Pressure
            </Text>
            <View>
              <AntDesign
                name="arrowright"
                size={24}
                color="black"
                style={[tw`p-1 rounded-xl`, styles.rightarrow]}
              />
            </View>
          </TouchableOpacity>

          {/* Recommendation Button */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Recommender", {
                Ragas: { ragasName, ragas },
              })
            }
            style={[
              tw`items-center px-6 rounded-2xl mt-10 border-solid border-transparent `,
              styles.flatlist,
              styles.button,
            ]}
          >
            <Animatable.View
              animation="pulse"
              easing="ease-in"
              iterationCount="infinite"
            >
              <Text
                style={[tw`text-lg font-semibold capitalize`, styles.text3]}
              >
                Explore Recommender
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <AppLoader />;
  }
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

  icon: {
    marginRight: 36,
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  image: {
    backgroundColor: "#afc2b3",
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  rightarrow: {
    backgroundColor: "#2d5234",
    color: "#f8f8f8",
  },
  flatlist: {
    borderWidth: 1,
    backgroundColor: "#afc2b3",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#2d5234",
  },
  text: {
    fontFamily: "NunitoSans_400Regular",
  },
  text2: {
    fontFamily: "NunitoSans_700Bold",
  },
  text3: {
    fontFamily: "NunitoSans_600SemiBold",
    color: "#f8f8f8",
  },
});

export default Music;
