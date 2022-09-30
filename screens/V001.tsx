/**
 * 一覧画面
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
} from "react-native";

import { DrawerHeaderProps } from "@react-navigation/drawer";
import { FAB, Header, Image, SearchBar } from "@rneui/themed";
import { getStorageData, saveStorageData } from "../components/saveStorage";
import {
  initialLinkData,
  initialSettingData,
} from "../constants/CommonInitialData";
import { LinkDataType } from "../constants/CommonType";
import V002 from "./V002";

//ユーザーID入力部品
type RegisterUserIdProps = {
  callback: () => void;
};
export const UserIdInput: React.FC<RegisterUserIdProps> = (props: any) => {
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
    <View style={{ flex: 1 }}>
      <Header
        leftComponent={{
          icon: "menu",
          color: "#fff",
          onPress: () => {
            props.drawer?.navigation?.toggleDrawer();
          },
        }}
        centerComponent={
          <Image
            source={require("../assets/logo-white.png")}
            resizeMode="center"
            style={{ height: "30px", width: "30px" }}
          />
        }
        rightComponent={{}}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchWord}
            onChangeText={(val) => setSearchWord(val)}
          />

          <FlatList
            style={{ flexGrow: 1 }}
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
      <FAB
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="blue"
        onPress={() => openRegisterScreen()}
        placement="right"
      />
    </View>
  );
};

export default V001;
