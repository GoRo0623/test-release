import { StyleSheet } from "react-native";

const CommonStyleDark = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  smallModal: {
    backgroundColor: "#333333",
    margin: 30,
    padding: 20,
    borderColor: "#ff1463",
    borderStyle: "solid",
    borderWidth: 2,
  },
  samallModalButton: {
    paddingTop: 20,
    paddingLeft: "70%",
    width: "30%",
  },
  smallModalInput: {
    backgroundColor: "#ff99ad",
    borderColor: "#ff1463",
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
  },
  smallModalText: { color: "white" },
  backgroundModal: {
    flex: 1,
    backgroundColor: "black 0.5",
    justifyContent: "center",
  },
  listStyle: {
    backgroundColor: "#333333",
    borderBottomColor: "#ff1463",
    borderWidth: 1,
    borderStyle: "solid",
  },
  listFont: {
    color: "white",
  },
  listTitleStyle: {
    maxWidth: "50%",
  },
});

export default CommonStyleDark;
