import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants/Colors'

import CommunityScreen from '../screens/CommunityScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import BuzzScreen from '../screens/BuzzScreen';


const CardNavigator = createStackNavigator(
  {
    Community: { screen: CommunityScreen },
    CardDetail: { screen: CardDetailScreen },
    Buzz: { screen: BuzzScreen },
  },
  {
    initialRouteName: 'Community',
  }
);

export default CardNavigator;
