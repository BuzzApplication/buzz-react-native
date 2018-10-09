import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

import BuzzPlusButton from '../components/BuzzPlusButton';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={styles.container}>
          {/* Go ahead and delete ExpoLinksView and replace it with your
             * content, we just wanted to provide you with some helpful links */}
          <ExpoLinksView />
        </ScrollView>
        <BuzzPlusButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
