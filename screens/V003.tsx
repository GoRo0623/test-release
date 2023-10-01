/**
 * 設定画面
 */
import { Header, Image, ListItem } from "@rneui/themed";
import * as LinkingExpo from "expo-linking";
import * as React from "react";
import { Alert, Platform, ScrollView, ToastAndroid, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { importData } from "../components/imprtData";
import { getStorageData } from "../components/saveStorage";
import { initialSettingData } from "../constants/CommonInitialData";
import AllStyles from "../constants/CommonStyle";
import { SettingDataType } from "../constants/CommonType";
import { TabPages } from "../navigation";

const V003: React.FC = (props: any) => {
  //画面表示データ
  const [settingData, setSettingData] =
    React.useState<SettingDataType>(initialSettingData);
  React.useEffect(() => {
    (async () => {
      //設定情報を設定する
      let getSettingData: SettingDataType =
        (await getStorageData("SETTINGDATA")) || initialSettingData;
      setSettingData(getSettingData);
    })();
  }, []);
  //未実装機能メッセージ
  const showToastForUnimplemented = () => {
    try {
      console.log("showToastForUnimplemented");
      ToastAndroid.show(
        "この機能はまだ実装されていません。",
        ToastAndroid.LONG
      );
    } catch (e) {
      console.log(e);
    }
  };
  //データアップロード処理
  //Android_Intent_textの送信
  //任意の保存場所を自分で選ぶ
  const uploadJSONData = async () => {
    try {
      //内部ストレージのリンク情報を取得し、stringに変換する
      let getData = await getStorageData("LINKDATA");
      //データがない場合はアップロードを行わない
      if (getData == null || getData == undefined) {
        Alert.alert(
          "Error",
          "登録済みデータが存在しないため、アップロードできません",
          [{ text: "OK", onPress: () => {} }]
        );
        return;
      }
      const stringData = JSON.stringify(getData);
      //取得したリンク情報を送信する
      if ((Platform.OS = "android")) {
        LinkingExpo.sendIntent("ACTION_SEND", [
          { key: "EXTRA_TEXT", value: stringData },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  //データインポート処理
  const importJSONData = async () => {
    //インポート処理を呼び出し、成功失敗に応じてメッセージを表示する
    const [success, error, merge, total] = await importData();
    try {
      let message = "";
      if (success) {
        //すべてのインポートに成功した場合
        message =
          "データのインポートが完了しました。（マージ：{0}件/総計：{1}件）";
        message.replace("{0}", merge.toString());
        message.replace("{1}", total.toString());
      } else {
        //1つ以上のインポートに失敗した場合
        message =
          "データのインポートに失敗しました。（失敗：{0}件/マージ：{1}件/総計：{2}件）";
        message.replace("{0}", error.toString());
        message.replace("{1}", merge.toString());
        message.replace("{2}", total.toString());
      }
      ToastAndroid.show(message, ToastAndroid.LONG);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <RootSiblingParent>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            props?.navigation?.toggleDrawer();
          },
        }}
        centerComponent={
          <Image
            source={require("../assets/ChouChouRoot_main_icon.svg")}
            resizeMode="center"
            style={{ height: 25, width: 25 }}
          />
        }
        rightComponent={{
          icon: "save",
          color: "#fff",
          style: { ...AllStyles.disableStyle },
          onPress: () => {
            showToastForUnimplemented();
          },
        }}
        backgroundColor={"#ff1463"}
      />
      <ScrollView style={{ backgroundColor: "#595959" }}>
        <View style={AllStyles.gridPage && { paddingBottom: 100 }}>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              showToastForUnimplemented();
            }}
          >
            {/* ユーザーID */}
            <ListItem.Content style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"ユーザーID"}
              </ListItem.Title>
              <ListItem.Input
                value={settingData.userId}
                style={AllStyles.listFont}
                disabled={true}
              ></ListItem.Input>
            </ListItem.Content>
          </ListItem>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              showToastForUnimplemented();
            }}
          >
            {/* スタイルカラー */}
            <ListItem.Content
              style={AllStyles.listTitleStyle && AllStyles.disableStyle}
            >
              <ListItem.Title style={AllStyles.listFont}>
                {"スタイルカラー"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {" "}
                {"ダークモード（マゼンタ）"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
          </ListItem>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              showToastForUnimplemented();
            }}
          >
            {/* タグ情報 */}
            <ListItem.Content style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"タグ情報"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
          </ListItem>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              showToastForUnimplemented();
            }}
          >
            {/* 言語設定 */}
            <ListItem.Content
              style={AllStyles.listTitleStyle && AllStyles.disableStyle}
            >
              <ListItem.Title style={AllStyles.listFont}>
                {"言語設定"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} style={AllStyles.disableStyle}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {"日本語"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
          </ListItem>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              uploadJSONData();
            }}
          >
            {/* データアップロード */}
            <ListItem.Content style={AllStyles.listTitleStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"データアップロード"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {/* {"前回日時："} */}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
          </ListItem>
          <ListItem
            containerStyle={AllStyles.listStyle}
            onPress={() => {
              importJSONData();
            }}
          >
            {/* データインポート */}
            <ListItem.Content style={AllStyles.listTitleStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"データインポート"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {/* {"前回ファイル名："} */}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron></ListItem.Chevron>
          </ListItem>
          <ListItem containerStyle={AllStyles.listStyle}>
            {/* 起動回数 */}
            <ListItem.Content style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"起動回数"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} style={AllStyles.disableStyle}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {String(settingData.startCount)}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={AllStyles.listStyle}>
            {/* 初回起動日時 */}
            <ListItem.Content style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"初回起動日時"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} style={AllStyles.disableStyle}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {" "}
                {settingData.firstStartDate ?? "yyyy/MM/dd hh:mm:ss"}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem containerStyle={AllStyles.listStyle}>
            {/* 最終起動日 */}
            <ListItem.Content style={AllStyles.disableStyle}>
              <ListItem.Title style={AllStyles.listFont}>
                {"最終起動日"}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Content right={true} style={AllStyles.disableStyle}>
              <ListItem.Title right={true} style={AllStyles.listFont}>
                {settingData.lastStartDate ?? "yyyy/MM/dd hh:mm:ss"}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
      <TabPages indexProp={1} />
    </RootSiblingParent>
  );
};

export default V003;
