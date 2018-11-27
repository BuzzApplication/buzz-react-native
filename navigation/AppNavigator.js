import { createSwitchNavigator } from 'react-navigation';

import RegistrationNavigator from './RegistrationNavigator';
import MainTabNavigator from './MainTabNavigator';

import WelcomeScreen from '../screens/WelcomeScreen';

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator({
    Registration: RegistrationNavigator,
    Welcome: { screen: WelcomeScreen },
    Main: MainTabNavigator
  },
  {
    initialRouteName: signedIn ? 'Main' : 'Registration'
  },
  {
    navigationOptions: {
      header: null
    }
  })
};
