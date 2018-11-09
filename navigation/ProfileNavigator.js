import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants/Colors'

import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PostedScreen from '../screens/PostedScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PushNotificationSettingsScreen from '../screens/PushNotificationSettingsScreen';


const ProfileNavigator = createStackNavigator(
  {
    Profile: { screen: ProfileScreen },
    Favorite: { screen: FavoriteScreen },
    Posted: { screen: PostedScreen },
    CardDetail: { screen: CardDetailScreen },
    Settings: { screen: SettingsScreen },
    PushNotificationSettings: { screen: PushNotificationSettingsScreen },
  },
  {
    initialRouteName: 'Profile',
  }
);

export default ProfileNavigator;
