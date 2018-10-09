import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';

import BuzzPlusButton from '../components/BuzzPlusButton';

export default class NotificationScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={{flex: 1}}>
        <ExpoConfigView />;
        <BuzzPlusButton navigation={this.props.navigation}/>
      </View>
    );
  }
}
