import { NavigationContainer, useNavigation } from "@react-navigation/native";
//import { Icon } from "@rneui/themed";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";

import V001 from "../screens/V001";
import V003 from "../screens/V003";

import { createDrawerNavigator } from "@react-navigation/drawer";

export default function Navigation({
  colorScheme,
  browserUrl,
}: {
  colorScheme: ColorSchemeName;
  browserUrl: string[];
}) {
  return (
    <NavigationContainer
    //theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerPages {...browserUrl} />
    </NavigationContainer>
  );
}
/**
 *ドロワー設定
 */
const Drawer = createDrawerNavigator();
const DrawerPages = (props: any) => {
  return (
    <Drawer.Navigator
      initialRouteName={"V001Tab"}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerHideStatusBarOnOpen: true,
        drawerType: "front",
        keyboardDismissMode: "on-drag",
        drawerContentStyle: { backgroundColor: "#333333" },
        //drawerActiveTintColor: "#ff1463",
        drawerLabelStyle: { color: "white" },
        drawerActiveBackgroundColor: "#ff1463",
      }}
      backBehavior="none"
    >
      <Drawer.Screen
        name="V001Tab"
        component={(prop: any) => (
          <V001 {...prop} browserUrl={props?.browserUrl} />
        )}
        options={{
          headerTitle: "一覧",
          drawerLabel: "一覧",
          drawerIcon: ({ size }) => (
            <Icon name="appstore1" color="white" size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="V003Tab"
        component={V003}
        options={{
          headerTitle: "設定",
          drawerLabel: "設定",
          drawerIcon: ({ size }) => (
            <Icon name="setting" color="white" size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
//
import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

/**
 *タブ設定
 */
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
export const TabPages: React.FC<{ indexProp: number }> = (prop: {
  indexProp: number;
}) => {
  //画面遷移部品を取得
  const nav = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const index = prop.indexProp;
  return (
    <>
      <View
        style={{
          height: 60,
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "ff1463",
          display: "flex",
          flex: 1,
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: "white",
        }}
      >
        <Button
          title="一覧"
          onPress={() => {
            nav.navigate("V001Tab");
          }}
          containerStyle={{ width: "50%", borderRadius: 0 }}
          color={prop.indexProp == 0 ? "#ff1463" : "#333333"}
          titleStyle={{ fontSize: 12, color: "white" }}
          icon={<Icon name="appstore1" color="white" size={25} />}
          iconPosition="top"
        />
        <Button
          title="設定"
          onPress={() => {
            nav.navigate("V003Tab");
          }}
          containerStyle={{ width: "50%", borderRadius: 0 }}
          color={prop.indexProp == 1 ? "#ff1463" : "#333333"}
          titleStyle={{ fontSize: 12, color: "white" }}
          icon={<Icon name="setting" color="white" size={25} />}
          iconPosition="top"
        />
      </View>
    </>
  );
};
