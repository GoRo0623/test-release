import { StyleSheet } from "react-native";

const CommonStyleLight = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  smallModal: {
    backgroundColor: "#333333",
    margin: 30,
    padding: 20,
    borderColor: "#ff0033",
    borderStyle: "solid",
    borderWidth: 2,
    //textAlign:"center",
  },
  samallModalButton: {
    paddingTop: 20,
    paddingLeft: "70%",
    width: "30%",
  },
  smallModalInput: {
    backgroundColor: "#ff99ad",
    borderColor: "#ff0033",
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
});

export default CommonStyleLight;
