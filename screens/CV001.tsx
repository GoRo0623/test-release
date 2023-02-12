/**
 * ユーザー名登録画面
 */
import * as React from "react";
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet

} from "react-native";

import { DrawerHeaderProps } from "@react-navigation/drawer";
import { FAB, Header, Image, SearchBar } from "@rneui/themed";
import { getStorageData, saveStorageData } from "../components/saveStorage";
import {
  initialLinkData,
  initialSettingData,
} from "../constants/CommonInitialData";
import { LinkDataType } from "../constants/CommonType";
import AllStyles from "../constants/CommonStyle";

//ユーザーID入力部品
type RegisterUserIdProps = {
    callback: () => void;
  };

const CV001: React.FC<RegisterUserIdProps> = (props: any) => {
    const [userId, setUserId] = React.useState<string>("");
    const registerData = async () => {
      saveStorageData("SETTINGDATA", { ...initialSettingData, userId: userId });
      return props.callback();
    };
    return (
        <View style={styles.backgroundModal}>
          <div style={styles.smallModal}>
          <Text style={{color: "white"}}>{"ユーザーIDを登録してください。"}</Text>
          <TextInput value={userId} onChangeText={(val) => setUserId(val)} style={{backgroundColor: "#ff99ad", borderColor:"#ff0033", borderStyle:"solid", borderWidth:2, width: "100%"}}/>
          <div style={styles.samallModalButton}>
          <Button title="登録" onPress={() => registerData()} color={"#ff0033"}/>
          </div>
          </div>
        </View>
    );
  };
  const styles = StyleSheet.create({
    smallModal: {
      backgroundColor: "#333333",
      margin: 30,
      padding: 20,
      borderColor:"#ff0033", borderStyle:"solid", borderWidth:2
      //textAlign:"center",
    },
    samallModalButton: {
      paddingTop:20,
      paddingLeft:"70%",
      width: "30%",
    },
    backgroundModal: {
      flex:1,
      backgroundColor: "black 0.5",
      justifyContent: "center"
      //opacity: 0.5,
    }
  });
  export default CV001;