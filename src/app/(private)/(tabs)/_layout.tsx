import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { ReactNode } from 'react';
import { TAB_BAR_STACK } from './routes';

import RN from '@/components/RN';
import GirdsIcon from '@/shared/assets/icons/GirdsIcon';
import { COLORS } from '@/shared/constants/colors';
import { map } from 'lodash';

export const iconOptions = {
  size: 25,
  style: {
    height: 25,
  },
};

const tabs: Record<
  TAB_BAR_STACK,
  {
    icon: (props: { color: string }) => ReactNode;
  }
> = {
  [TAB_BAR_STACK.HOME]: {
    icon: ({ color }) => (
      <FontAwesomeIcon name={'home'} color={color} {...iconOptions} />
    ),
  },
  [TAB_BAR_STACK.SEARCH]: {
    icon: ({ color }) => (
      <FontAwesomeIcon name={'search'} color={color} {...iconOptions} />
    ),
  },
  [TAB_BAR_STACK.CATEGORY]: {
    icon: ({ color }) => <GirdsIcon color={color} {...iconOptions} />,
  },
  [TAB_BAR_STACK.PROFILE]: {
    icon: ({ color }) => (
      <FontAwesomeIcon name={'user'} color={color} {...iconOptions} />
    ),
  },
};

const TabLayout = () => (
  <Tabs
    sceneContainerStyle={{
      backgroundColor: COLORS.black,
    }}
    screenOptions={{
      tabBarActiveTintColor: COLORS.orange,
      headerShown: false,
      ...tabsStyles,
    }}
  >
    {map(tabs, (tab, tabName) => (
      <Tabs.Screen
        key={`${tab} - ${tabName}`}
        name={tabName}
        options={{
          tabBarIcon: tab.icon,
        }}
      />
    ))}
  </Tabs>
);

const tabsStyles = RN.StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 13,
    paddingTop: 10,
  },
  tabBarStyle: {
    backgroundColor: COLORS.black,
    paddingVertical: 20,
    minHeight: 60,
    // borderTopWidth: 0,
  },
});

export default TabLayout;