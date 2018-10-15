import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants/Colors'

import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PushNotificationSettingsScreen from '../screens/PushNotificationSettingsScreen';


const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsScreen },
    PushNotificationSettings: { screen: PushNotificationSettingsScreen },
  },
  {
    initialRouteName: 'Profile',
  }
);

export default ProfileNavigator;
