import { useEffect } from "react";
import { Linking, Platform } from "react-native";
import * as LinkingExpo from "expo-linking";

export const getUrldata = () => {
  useEffect(() => {
    const handleDeepLink = async () => {
      //const url = await Linking.getInitialURL();
      const url = await LinkingExpo.getInitialURL();
      if (url) {
        // データの処理
      }
    };

    if (Platform.OS === "android") {
      handleDeepLink();
    }
  }, []);
};
