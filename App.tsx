import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

//import useColorScheme from "./hooks/useColorScheme";
import { Appearance } from "react-native";
import Navigation from "./navigation";
import "react-native-gesture-handler";

export default function App() {
  const colorScheme = Appearance.getColorScheme();

  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </SafeAreaProvider>
  );
}
