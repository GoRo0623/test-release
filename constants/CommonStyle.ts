import { StyleSheet, Appearance } from "react-native";
import CommonStyleDark from "./CommonStyleDark";
import CommonStyleLight from "./CommonStyleLight";

/**
 * 共通デザイン
 */
const CommonStyle = StyleSheet.create({
  //共通
  header: {
    backgroundColor: "#ff1463 !important",
  },
  searchBar: {
    backgroundColor: "#333333",
    //borderStyle: "none",
    borderColor: "transparent",
    borderWidth: 0,
  },
  searchBarInput: {
    backgroundColor: "#ff6699",
    color: "black",
  },
  searchBarIcon: {
    color: "black",
  },
  gridPage: {
    flex: 1,
    backgroundColor: "#333333",
  },
  fab: {
    backgroundColor: "#ff6699",
  },
  disableStyle: {
    opacity: 0.5,
  },
});
/**
 * ライトモード、ダークモード判定
 */
const UseStyle =
  Appearance.getColorScheme() == "light" ? CommonStyleLight : CommonStyleDark;
/**
 * 全デザイン
 */
const AllStyles = StyleSheet.create({ ...UseStyle, ...CommonStyle });
export default AllStyles;
