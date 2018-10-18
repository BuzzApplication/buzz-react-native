import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { colors } from '../constants/Colors'

import SignInScreen from '../screens/SignInScreen';


const RegistrationNavigator = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },

  },
  {
    initialRouteName: 'SignIn',
  }
);

export default RegistrationNavigator;
