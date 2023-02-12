import { StyleSheet } from "react-native";
import CommonStyleDark from "./CommonStyleDark";
import CommonStyleLight from "./CommonStyleLight";
import useColorScheme from "../hooks/useColorScheme";

/**
 * 共通デザイン
 */
const CommonStyle = StyleSheet.create({
  //共通
  smallModal: {
    height: 100,
    paddingLeft: 20,
    paddingRight: 20
  }
});
/**
 * 全デザイン
 */
const AllStyles = StyleSheet.create(
  {...(useColorScheme() == "light" ? CommonStyleLight : CommonStyleDark), ...CommonStyle});

export default AllStyles;
