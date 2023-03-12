/**
 * 設定画面
 */
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { Header, Image, ListItem } from "@rneui/themed";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { getStorageData } from "../components/saveStorage";
import { initialSettingData } from "../constants/CommonInitialData";
import { SettingDataType } from "../constants/CommonType";

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

  return (
    <RootSiblingParent>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            props?.navigation?.openDrawer();
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
      />
      <ScrollView>
        <View>
          <ListItem>
            {/* ユーザーID */}
            <ListItem.Content>
              <ListItem.Title>{"ユーザーID"}</ListItem.Title>
              <ListItem.Input
                value={settingData.userId}
                disabled={true}
              ></ListItem.Input>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            {/* 初回起動日時 */}
            <ListItem.Content>
              <ListItem.Title>{"初回起動日時"}</ListItem.Title>
              <ListItem.Input
                value={settingData.firstStartDate}
                disabled={true}
              ></ListItem.Input>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            {/* タグ情報 */}
            <ListItem.Content>
              <ListItem.Title>{"タグ情報"}</ListItem.Title>
              <ListItem.Chevron></ListItem.Chevron>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            {/* 言語設定 */}
            <ListItem.Content>
              <ListItem.Title>{"言語設定"}</ListItem.Title>
              <ListItem.Chevron>{"日本語"}</ListItem.Chevron>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            {/* 起動回数 */}
            <ListItem.Content>
              <ListItem.Title>{"起動回数"}</ListItem.Title>
              <ListItem.Input
                value={String(settingData.startCount)}
                disabled={true}
              ></ListItem.Input>
            </ListItem.Content>
          </ListItem>
          <ListItem>
            {/* 最終起動日 */}
            <ListItem.Content>
              <ListItem.Title>{"最終起動日"}</ListItem.Title>
              <ListItem.Input
                value={settingData.lastStartDate}
                disabled={true}
              ></ListItem.Input>
            </ListItem.Content>
          </ListItem>
        </View>
      </ScrollView>
    </RootSiblingParent>
  );
};

export default V003;
