import { StyleSheet } from "react-native";
import CommonStyleDark from "./CommonStyleDark";
import CommonStyleLight from "./CommonStyleLight";
import useColorScheme from "../hooks/useColorScheme";

const commonStyle =
  useColorScheme() == "light" ? CommonStyleLight : CommonStyleDark;

export default commonStyle;
