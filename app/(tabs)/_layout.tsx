import { Tabs } from "expo-router";
import { View } from "react-native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#0ea5e9",
        tabBarInactiveTintColor: "#57534e",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "semibold",
        },
        headerTintColor: "#57534e",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Emission Test",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="eco"
              size={24}
              color={focused ? "#0ea5e9" : "#57534e"}
            />
          ),
          headerRight:()=>(
            <View style={{marginRight:225}}>
              <MaterialIcons name="eco" size={24} color={'#57534e'}/>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="allLicenses"
        options={{
          title: "Licenses",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="drivers-license"
              size={20}
              color={focused ? "#0ea5e9" : "#57534e"}
            />
          ),
          headerRight:()=>(
            <View style={{marginRight:260}}>
              <FontAwesome name="drivers-license" size={24} color={'#57534e'}/>
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="allInsuarances"
        options={{
          title: "Insurances",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="shield-alt"
              size={20}
              color={focused ? "#0ea5e9" : "#57534e"}
            />
          ),
          headerRight:()=>(
            <View style={{marginRight:245}}>
              <FontAwesome5 name="shield-alt" size={24} color={'#57534e'}/>
            </View>
          )
        }}
      />
    </Tabs>
  );
}
