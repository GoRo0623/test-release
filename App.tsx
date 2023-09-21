import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

//import useColorScheme from "./hooks/useColorScheme";
import { Appearance } from "react-native";
import Navigation from "./navigation";
import "react-native-gesture-handler";
// Intent
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import * as IntentLauncher from 'expo-intent-launcher';
import { getUrldata } from "./components/getUrldata";

// Open location settings
//startActivityAsync(ActivityAction.WEBVIEW_SETTINGS);

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  //起動元URLの取得処理
  getUrldata();

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}
