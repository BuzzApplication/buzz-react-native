import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import RegistrationNavigator from './RegistrationNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Registration: RegistrationNavigator,
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
