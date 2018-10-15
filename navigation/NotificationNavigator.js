import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants/Colors'

import NotificationScreen from '../screens/NotificationScreen';
import CardDetailScreen from '../screens/CardDetailScreen';


const NotificationNavigator = createStackNavigator(
  {
    Notification: { screen: NotificationScreen },
    CardNotificationDetail: { screen: CardDetailScreen },
  },
  {
    initialRouteName: 'Notification',
  }
);

export default NotificationNavigator;
