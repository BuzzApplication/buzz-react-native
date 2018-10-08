import React from 'react';
import { ExpoConfigView } from '@expo/samples';

import baseStyles from '../constants/Styles';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
    headerStyle: baseStyles.header,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}
