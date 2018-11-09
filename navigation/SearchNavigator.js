import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { colors } from '../constants/Colors'

import SearchScreen from '../screens/SearchScreen';
import CardDetailScreen from '../screens/CardDetailScreen';


const SearchNavigator = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    CardDetail: { screen: CardDetailScreen },
  },
  {
    initialRouteName: 'Search',
  }
);

export default SearchNavigator;
