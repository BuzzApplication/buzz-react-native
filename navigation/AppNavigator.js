import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import RegistrationNavigator from './RegistrationNavigator';
import MainTabNavigator from './MainTabNavigator';

import WelcomeScreen from '../screens/WelcomeScreen';

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Registration: RegistrationNavigator,
    Welcome: { screen: WelcomeScreen },
    Main: MainTabNavigator,
    },
    {
      initialRouteName: signedIn ? "Main" : "Registration",
    },
    {
      navigationOptions: {
        header: null,
    },
  });
};
