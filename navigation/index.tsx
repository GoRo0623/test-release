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
      <Drawer.Screen
        name="V001"
        component={V001}
        options={{
          headerTitle: "一覧",
          drawerLabel: "一覧",
          drawerIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />

      <Drawer.Screen
        name="V001Tab"
        component={TabPages}
        initialParams={{ displayIndex: 0 }}
        options={{
          headerTitle: "一覧",
          drawerLabel: "一覧",
          drawerIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
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
          drawerIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
/**
 *タブ設定
 */
import { Tab, TabView, TabItemProps, TabViewProps } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
const TabPages: React.FC<DrawerHeaderProps> = (props: DrawerHeaderProps) => {
  //props?.navigation?.openDrawer();
  console.log(props);
  const param: any = props?.route?.params || {
    displayIndex: 0,
  };
  const [index, setIndex] = React.useState<number>(param?.displayIndex || 0);
  return (
    <View>
      {/* 表示内容 */}
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
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
      </Tab>
      {/* 表示内容 */}
      <TabView value={index} onChange={setIndex}>
        <TabView.Item
          style={{ backgroundColor: "red", width: "100%", height: "100%" }}
        >
          <V001 drawer={props} />
          <Text>{"◆"}</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <V003 drawer={props} />
        </TabView.Item>
      </TabView>
    </View>
  );
};
