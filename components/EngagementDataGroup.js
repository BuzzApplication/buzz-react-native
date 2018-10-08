import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansText, OpenSansLightText } from '../components/StyledText'
import EngagementData from '../components/EngagementData'


class EngagementDataGroup extends React.Component {
  render() {
    return (
      <View style={styles.engagementDataGroupContainer}>
        <EngagementData type='likes'/>
        <EngagementData type='comments'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  engagementDataGroupContainer: {
    flexDirection: 'row',
  },
});

export default EngagementDataGroup;
