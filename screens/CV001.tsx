/**
 * ユーザー名登録画面
 */
import * as React from "react";
import {
  Button,
  Text,
  TextInput,
  View,
} from "react-native";
import {saveStorageData } from "../components/saveStorage";
import {
  initialSettingData,
} from "../constants/CommonInitialData";
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
        <View style={AllStyles.backgroundModal}>
          <div style={AllStyles.smallModal}>
          <Text style={{color: "white"}}>{"ユーザーIDを登録してください。"}</Text>
          <TextInput value={userId} onChangeText={(val) => setUserId(val)} style={AllStyles.smallModalInput}/>
          <div style={AllStyles.samallModalButton}>
          <Button title="登録" onPress={() => registerData()} color={"#ff1463"}/>
          </div>
          </div>
        </View>
    );
  };

  export default CV001;