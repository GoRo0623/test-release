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
import CV001 from "./CV001";
import AllStyles from "../constants/CommonStyle";

const V001: React.FC = (props:any) => {
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
    <View style={AllStyles.gridPage}>
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
            source={require("../assets/logo-white.png")}
            resizeMode="center"
          //style={{ height: "30px", width: "30px" }}
          />
        }
        rightComponent={{}}
        backgroundColor={"#ff1463"}
        style={{borderWidth: 0}}
      />
        <View style={{ flex: 1 }}>
          <SearchBar
            value={searchWord}
            onChangeText={(val) => setSearchWord(val)}
            containerStyle={AllStyles.searchBar}
            style={{borderColor: "red"}}
            inputContainerStyle={AllStyles.searchBarInput}
            inputStyle={AllStyles.searchBarInput}
            searchIcon={AllStyles.searchBarIcon}
            cancelIcon={AllStyles.searchBarIcon}
            clearIcon={AllStyles.searchBarIcon}
          />

          <FlatList
            style={{ flexGrow: 1, paddingTop: 10 }}
            data={searchData(linkList)}
            keyExtractor={(item) => item.dataId}
            numColumns={5}
          renderItem={({ item }) => {
            if (item.delFlag == 1) {
              return (<></>);
              }
              return (
                <Pressable onPress={() => openEditScreen(item)}>
                  <View
                    style={{
                      backgroundColor: "#ff1463",
                      width: "18vmin",
                      height: "18vmin",
                      borderRadius: 50,
                      margin: 2,
                      alignItems: "center",
                      paddingTop: "25%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        textAlignVertical: "center",
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
        <Modal visible={openRegisterUserId}
          animationType="slide"
          transparent={true}>
          <CV001 callback={() => callBackRegisterUserId()} />
        </Modal>
      <FAB
        visible={true}
        icon={{ name: "add", color: "white" }}
        color={"#ff1463"}
        onPress={() => openRegisterScreen()}
        placement="right"
      />
    </View>
  );
};

export default V001;
