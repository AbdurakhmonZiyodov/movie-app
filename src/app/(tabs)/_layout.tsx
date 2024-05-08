import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { BOTTOM_BAR_STACK } from "./routes";
import HomeIcon from "@/shared/assets/icons/HomeIcon";
import SearchIcon from "@/shared/assets/icons/SearchIcon";
import GirdsIcon from "@/shared/assets/icons/GirdsIcon";
import UserIcon from "@/shared/assets/icons/UserIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={BOTTOM_BAR_STACK.HOME}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={BOTTOM_BAR_STACK.SEARCH}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={BOTTOM_BAR_STACK.CATEGORY}
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => <GirdsIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name={BOTTOM_BAR_STACK.PROFILE}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
