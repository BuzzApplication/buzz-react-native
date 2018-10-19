import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { colors } from '../constants/Colors'

import SignInScreen from '../screens/SignInScreen';
import SignUpDescriptionScreen from '../screens/SignUpDescriptionScreen';
import SignUpEmailScreen from '../screens/SignUpEmailScreen';
import SignUpEmailVerificationScreen from '../screens/SignUpEmailVerificationScreen';


const RegistrationNavigator = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },
    SignUpDescription: { screen: SignUpDescriptionScreen },
    SignUpEmail: { screen: SignUpEmailScreen },
    SignUpEmailVerification: { screen: SignUpEmailVerificationScreen },
  },
  {
    initialRouteName: 'SignIn',
  }
);

export default RegistrationNavigator;
