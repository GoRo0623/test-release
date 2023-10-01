import * as LinkingExpo from "expo-linking";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

export const getUrldata = () => {
  const [browserUrl, setBrowserUrl] = useState<string[]>([]);
  useEffect(() => {
    const handleDeepLink = async () => {
      //const url = await Linking.getInitialURL();
      const url = await LinkingExpo.getInitialURL();
      if (url) {
        // データの処理
        console.log("LinkingExpo.getInitialURL()");
        console.log(url);
        const searchParams = new URL(url).searchParams;
        //パラメータが存在する場合、新規作成画面に設定した状態で起動する。
        if (searchParams.size > 0) {
          setBrowserUrl(searchParams.getAll("data"));
        }
      }
    };

    if (Platform.OS === "android") {
      handleDeepLink();
    }
  }, []);
  return browserUrl;
};
