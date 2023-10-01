/**
 * 編集画面
 */
import { Button, Header, Image } from "@rneui/themed";
import * as Linking from "expo-linking";
import * as React from "react";
import {
  //Button,
  Alert,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";
import {
  getDisplayDateTime,
  getNumberDate,
} from "../components/getDateFormated";
import { getStorageData, saveStorageData } from "../components/saveStorage";
import { initialSettingData } from "../constants/CommonInitialData";
import { LinkDataType, SettingDataType } from "../constants/CommonType";

type V002Props = {
  linkData: LinkDataType;
  callback: () => void;
};

const V002: React.FC<V002Props> = (props) => {
  //初期値編集
  const initScreenData = (linkData: LinkDataType) => {
    let tempData = linkData;
    return tempData;
  };
  //画面表示データ
  const [linkData, setLinkData] = React.useState<LinkDataType>(
    initScreenData(props.linkData)
  );
  React.useEffect(() => {
    //URLに入力欄をあらかじめ追加しておく
    addUrlInputArea();
  }, []);

  //新規追加・更新処理
  const registerLinkData = async () => {
    let tempData = { ...linkData };
    let getSettingData: SettingDataType =
      (await getStorageData("SETTINGDATA")) || initialSettingData;
    let createFlag = false;
    //内部管理用ID設定
    if (!tempData.dataId) {
      tempData.dataId =
        getSettingData.userId +
        getNumberDate(new Date()) +
        (getSettingData.maxDataCount + 1);
      createFlag = true;
      //内部ストレージの設定情報maxDataCountを更新する
      await saveStorageData("SETTINGDATA", {
        ...getSettingData,
        maxDataCount: getSettingData.maxDataCount + 1,
      });
    }
    //更新日時
    tempData.updateDate = getDisplayDateTime(new Date());
    //更新者
    tempData.updateName = getSettingData.userId;
    //登録日時
    if (!tempData.registerDate) {
      tempData.registerDate = getDisplayDateTime(new Date());
    }
    //登録者
    if (!tempData.registerName) {
      tempData.registerName = getSettingData.userId;
    }
    //URL編集
    //空のURL入力欄を全て削除する
    tempData.url = tempData.url.filter((item) => item != "");
    //内部ストレージから登録済みデータを取得する
    const allData: LinkDataType[] = (await getStorageData("LINKDATA")) || [];
    if (createFlag) {
      //新規登録の場合
      allData.push(tempData);
    } else if (allData.length > 0) {
      //更新の場合
      allData.forEach((item, index) => {
        if (item.dataId == tempData.dataId) {
          allData.splice(index, 1, tempData);
        }
      });
    }
    //内部ストレージを更新する
    await saveStorageData("LINKDATA", [...allData]);
    //画面に保持しているデータを更新する
    setLinkData(tempData);
    await toast("更新しました。");
  };

  //削除
  const deleteLinkData = async () => {
    //登録されていない場合or削除済みデータの場合、アラートを出す(ボタンは非活性済)
    if (!linkData.dataId || linkData.delFlag == 1) {
      Alert.alert(
        "エラー",
        "このデータは削除できません",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    //削除処理
    let tempData = { ...linkData };
    let getSettingData: SettingDataType =
      (await getStorageData("SETTINGDATA")) || initialSettingData;
    //削除フラグ
    tempData.delFlag = 1;
    //更新日時
    tempData.updateDate = getDisplayDateTime(new Date());
    //更新者
    tempData.updateName = getSettingData.userId;
    //データが登録済みの場合のみ削除フラグを立てる
    //登録されていない場合は、削除フラグを立てた状態で登録処理を行う
    const allData: LinkDataType[] = (await getStorageData("LINKDATA")) || [];
    if (allData.length > 0) {
      allData.forEach((item, index) => {
        if (item.dataId == tempData.dataId) {
          allData.splice(index, 1, tempData);
        }
      });
      await saveStorageData("LINKDATA", [...allData]);
      await toast("削除しました");
    } else {
      await toast("削除に失敗しました");
    }
    return props.callback();
  };

  //閉じる
  const closeEditScreen = () => {
    return props.callback();
  };

  //外部リンク
  const openURL = async (url: string) => {
    if (!url) {
      //URLが入力されていない場合、アラートを出す(ボタンは非活性済)
      Alert.alert(
        "エラー",
        "URLが入力されていません",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "エラー",
        "このページを開ませんでした",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  //URL入力欄編集処理
  const addUrlInputArea = () => {
    let tempData = { ...linkData };
    //空のURL入力欄を全て削除する
    tempData.url = tempData.url.filter((item) => item != "");
    //最後に空のURL入力欄を1つだけ追加する
    tempData.url.push("");
    setLinkData({ ...tempData });
  };
  //URL入力値設定
  const setUrlString = (val: string, index: number) => {
    let tempData = linkData;
    tempData.url[index] = val;
    setLinkData({ ...tempData });
  };

  //トースト
  const toast = async (message: string) => {
    return await Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <RootSiblingParent>
      {/* <ScrollView> */}
      <Header
        leftComponent={{
          icon: "chevron-left",
          color: "#fff",
          onPress: () => {
            closeEditScreen();
          },
        }}
        centerComponent={
          <Image
            source={require("../assets/logo-white.png")}
            resizeMode="center"
            //style={{ height: "30px", width: "30px" }}
          />
        }
        rightComponent={{}}
        backgroundColor={"#ff1463"}
        style={{ borderWidth: 0 }}
      />
      <View style={{ flex: 1, backgroundColor: "#333333" }}>
        {/* <Button title="戻る" onPress={() => closeEditScreen()} /> */}
        {/* <Button title="更新" onPress={() => registerLinkData()} /> */}
        {/* <Button
            title="削除"
            onPress={() => deleteLinkData()}
            disabled={!linkData.dataId || linkData.delFlag == 1}
          /> */}
        {/* タイトル */}
        <Text
          style={{
            backgroundColor: "#ff146",
            width: "100%",
            color: "white",
            margin: "10px",
          }}
        >
          {"Title"}
        </Text>
        <TextInput
          value={linkData.title}
          onChangeText={(val) => setLinkData({ ...linkData, title: val })}
          style={{
            backgroundColor: "#ff99ad",
            borderColor: "#ff0033",
            borderStyle: "solid",
            borderWidth: 2,
            width: "100%",
          }}
        />
        {/* 作成者が設定できる任意のID */}
        <Text
          style={{
            backgroundColor: "#ff146",
            width: "100%",
            color: "white",
            margin: "10px",
          }}
        >
          {"ID"}
        </Text>
        <TextInput
          value={linkData.outerDataId}
          onChangeText={(val) => setLinkData({ ...linkData, outerDataId: val })}
          style={{
            backgroundColor: "#ff99ad",
            borderColor: "#ff0033",
            borderStyle: "solid",
            borderWidth: 2,
            width: "100%",
          }}
        />
        {/* URL（複数） */}
        <Text
          style={{
            backgroundColor: "#ff146",
            width: "100%",
            color: "white",
            margin: "10px",
          }}
        >
          {"URL"}
        </Text>
        <FlatList
          data={linkData.url}
          keyExtractor={(item, index) => String(index)}
          numColumns={1}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  margin: 1,
                  backgroundColor: "white",
                }}
              >
                <TextInput
                  value={item}
                  onChangeText={(val) => setUrlString(val, index)}
                  onBlur={() => addUrlInputArea()}
                  style={{
                    backgroundColor: "#ff99ad",
                    borderColor: "#ff0033",
                    borderStyle: "solid",
                    borderWidth: 2,
                    width: "100%",
                  }}
                />
                <Button
                  title={"開く"}
                  onPress={() => openURL(item)}
                  disabled={!item}
                  color={"#ff1463"}
                />
              </View>
            );
          }}
        ></FlatList>
      </View>
      <View
        style={{
          height: 42,
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "red",
          display: "flex",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <Button
          title="削除"
          onPress={() => deleteLinkData()}
          disabled={!linkData.dataId || linkData.delFlag == 1}
          containerStyle={{ width: "50%" }}
          color={"#ff1463"}
        />
        <Button
          title="更新"
          onPress={() => registerLinkData()}
          containerStyle={{ width: "50%" }}
          color={"#ff1463"}
        />
      </View>
      {/* </ScrollView> */}
    </RootSiblingParent>
  );
};

export default V002;
