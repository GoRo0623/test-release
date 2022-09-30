import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
//import { Icon } from "@rneui/themed";
import * as React from "react";
import { ColorSchemeName, View, Text } from "react-native";

import V001 from "../screens/V001";
import V003 from "../screens/V003";

import {
  createDrawerNavigator,
  DrawerHeaderProps,
} from "@react-navigation/drawer";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <DrawerPages />
    </NavigationContainer>
  );
}
/**
 *ドロワー設定
 */
const Drawer = createDrawerNavigator();
const DrawerPages = () => {
  return (
    <Drawer.Navigator
      initialRouteName="V001"
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerHideStatusBarOnOpen: true,
        //drawerIcon: { color: "red" },
        drawerType: "front",
        keyboardDismissMode: "on-drag",
      }}
      backBehavior="history"
    >
      {/* <Drawer.Screen
        name="V001"
        component={V001}
        options={{
          headerTitle: "一覧",
          drawerLabel: "一覧",
          drawerIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      /> */}

      <Drawer.Screen
        name="V001Tab"
        component={TabPages}
        initialParams={{ displayIndex: 0 }}
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
        component={TabPages}
        initialParams={{ displayIndex: 1 }}
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
/**
 *タブ設定
 */
import { Tab } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/AntDesign";
const TabPages: React.FC = (props: any) => {
  //props?.navigation?.openDrawer();
  console.log(props);
  const param: any = props?.route?.params || {
    displayIndex: 0,
  };
  const [index, setIndex] = React.useState<number>(param?.displayIndex || 0);
  const TabPage = createBottomTabNavigator();
  React.useEffect(() => {
    props?.navigation?.toggleDrawer();
  }, []);
  return (
    <>
      {/* 表示内容 */}
      {/* <View style={{ height: "100%" }}>
        {index == 0 && <V001 drawer={props} />}
        {index == 1 && <V003 drawer={props} />}
      </View> */}
      {/* タブ */}
      {/* <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="default"
      >
        <Tab.Item
          title="一覧"
          titleStyle={{ fontSize: 12 }}
          icon={<Icon name="appstore1" color="white" />}
        />
        <Tab.Item
          title="設定"
          titleStyle={{ fontSize: 12 }}
          icon={<Icon name="setting" color="white" />}
        />
      </Tab> */}
      <TabPage.Navigator
        initialRouteName={index == 0 ? "V001" : "V003"}
        screenOptions={{ headerShown: false }}
      >
        <TabPage.Screen
          name="V001"
          component={V001}
          options={{
            tabBarIcon: ({ size }) => (
              <Icon name="appstore1" color="white" size={size} />
            ),
            title: "一覧",
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "blue",
          }}
        />
        <TabPage.Screen
          name="V003"
          component={V003}
          options={{
            tabBarIcon: ({ size }) => (
              <Icon name="setting" color="white" size={size} />
            ),
            title: "一覧",
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "blue",
          }}
        />
      </TabPage.Navigator>
    </>
  );
};
