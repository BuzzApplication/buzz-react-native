import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import RegistrationNavigator from './RegistrationNavigator';
import MainTabNavigator from './MainTabNavigator';

import WelcomeScreen from '../screens/WelcomeScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Registration: RegistrationNavigator,
  Welcome: { screen: WelcomeScreen },
  Main: MainTabNavigator,
  },
  {
    initialRouteName: 'Main',
  },
  {
    navigationOptions: {
      header: null,
  },
});
