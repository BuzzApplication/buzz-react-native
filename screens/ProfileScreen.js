import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';

import baseStyles from '../constants/Styles';

import BuzzPlusButton from '../components/BuzzPlusButton';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
    headerStyle: baseStyles.header,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex: 1}}>
        <ExpoConfigView />;
        <BuzzPlusButton />
      </View>
    );
  }
}
