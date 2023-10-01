import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

//import useColorScheme from "./hooks/useColorScheme";
import { Appearance } from "react-native";
import "react-native-gesture-handler";
import Navigation from "./navigation";
// Intent
import { getUrldata } from "./components/getUrldata";

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  //起動元URLの取得処理
  const browserUrl = getUrldata();

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} browserUrl={browserUrl} />
      <StatusBar />
    </SafeAreaProvider>
  );
}
