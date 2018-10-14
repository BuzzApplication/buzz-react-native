import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import CardNavigator from '../navigation/CardNavigator'

import { colors } from '../constants/Colors'

import TabBarIcon from '../components/TabBarIcon';

import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CommunityScreen from '../screens/CommunityScreen';
import CardDetailScreen from '../screens/CardDetailScreen';


const HomeStack = createStackNavigator({
  Home: CardNavigator,
},
{
  headerMode: 'none',
});

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notification: NotificationScreen,
});

NotificationStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications$'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person$'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  NotificationStack,
  ProfileStack
},
{
  tabBarOptions: {
    showLabel: false,
    style: {
      backgroundColor: colors.lightBlue,
    }
  },
  headerMode: 'none',
});
