/**
 * 一覧画面
 */
import * as React from "react";
import style from "../constants/CommonStyle";
import {
  ScrollView,
  View,
  FlatList,
  Text,
  Pressable,
  TextInput,
  Button,
  Modal,
} from "react-native";

import { SearchBar, FAB, Tab } from "@rneui/themed";
import { LinkDataType, dummyLinkData } from "../constants/CommonType";
import { getStorageData, saveStorageData } from "../components/saveStorage";
import {
  initialSettingData,
  initialLinkData,
} from "../constants/CommonInitialData";
import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from "@react-navigation/drawer";
import V002 from "./V002";

//ユーザーID入力部品
type RegisterUserIdProps = {
  callback: () => void;
};
export const UserIdInput: React.FC<RegisterUserIdProps> = (props) => {
  const [userId, setUserId] = React.useState<string>("");
  const registerData = async () => {
    saveStorageData("SETTINGDATA", { ...initialSettingData, userId: userId });
    return props.callback();
  };
  return (
    <ScrollView>
      <View>
        <Text>{"ユーザーIDを登録してください。"}</Text>
        <TextInput value={userId} onChangeText={(val) => setUserId(val)} />
        <Button title="登録" onPress={() => registerData()} />
      </View>
    </ScrollView>
  );
};

type V001Props = {
  drawer?: DrawerHeaderProps;
};

const V001: React.FC<V001Props> = (props) => {
  //初期表示
  const [linkList, setLinkList] = React.useState<LinkDataType[]>([]);
  //編集画面表示非表示
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);
  //引数：リンクデータ
  const [linkDataV001, setLinkDataV001] = React.useState<LinkDataType>();

  //初期表示処理
  React.useEffect(() => {
    checkRegisteredUserId();
    setLinkDataList();
  }, []);
  //ユーザーID登録済確認
  const [openRegisterUserId, setOpenRegisterUserId] =
    React.useState<boolean>(false);
  const checkRegisteredUserId = async () => {
    let getData = await getStorageData("SETTINGDATA");
    if (!getData?.userId) {
      setOpenRegisterUserId(true);
    }
  };
  const callBackRegisterUserId = () => {
    setOpenRegisterUserId(false);
  };

  //新規追加ボタン
  const openRegisterScreen = () => {
    setLinkDataV001(initialLinkData);
    setOpenEdit(true);
  };

  //編集ボタン
  const openEditScreen = (data: LinkDataType) => {
    setLinkDataV001(data);
    setOpenEdit(true);
  };

  //引数：コールバック
  const callBackEditScreen = () => {
    setLinkDataList();
    setOpenEdit(false);
  };

  //データ取得処理
  const setLinkDataList = async () => {
    let getData = await getStorageData("LINKDATA");
    setLinkList(getData || [initialLinkData]);
  };

  //検索処理
  const [searchWord, setSearchWord] = React.useState<string>("");
  const searchData = (linkList: LinkDataType[]) => {
    if (!searchWord) {
      return linkList;
    }
    let tempList = [...linkList];

    return tempList.filter(
      (item) =>
        item.delFlag == 0 &&
        item.outerDataId.search(searchWord) +
          item.title.search(searchWord) +
          item.registerName.search(searchWord) +
          item.updateName.search(searchWord) >
          0
    );
  };

  return (
    <ScrollView>
      <View>
        <SearchBar
          value={searchWord}
          onChangeText={(val) => setSearchWord(val)}
        />
        <FlatList
          data={searchData(linkList)}
          keyExtractor={(item) => item.dataId}
          numColumns={5}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => openEditScreen(item)}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    margin: 1,
                    backgroundColor: "blue",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {item.title.slice(0, 1)}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        ></FlatList>
        <Button title="新規作成" onPress={() => openRegisterScreen()} />
      </View>
      <Modal visible={openEdit}>
        <V002
          linkData={linkDataV001 || initialLinkData}
          callback={() => callBackEditScreen()}
        />
      </Modal>
      <Modal visible={openRegisterUserId}>
        <UserIdInput callback={() => callBackRegisterUserId()} />
      </Modal>
    </ScrollView>
  );
};

export default V001;
