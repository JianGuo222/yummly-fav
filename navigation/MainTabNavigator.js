import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import IconBadge from 'react-native-icon-badge';

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
    navigationOptions: ({ navigation, screenProps }) => ({
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
        // console.log(screenProps.results);
        return (
          routeName === 'Search' ?
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          /> :
          <IconBadge
            MainElement={<Ionicons
              name={iconName}
              size={28}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
              />}
            BadgeElement={<Text style={{ color: 'white' }}>{screenProps.results.savedItems.length}</Text>}
            Hidden={screenProps.results.savedItems.length === 0}
            IconBadgeStyle={{left: 15, top: -3}}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  },
);
