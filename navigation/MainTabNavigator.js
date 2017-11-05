import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import SearchScreen from '../screens/SearchScreen';
import SavedScreen from '../screens/SavedScreen';

export default TabNavigator(
  {
    Search: {
      screen: SearchScreen,
    },
    Saved: {
      screen: SavedScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Search':
            iconName = Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search';
            break;
          case 'Saved':
            iconName = Platform.OS === 'ios' ? `ios-heart${focused ? '' : '-outline'}` : 'md-heart';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
