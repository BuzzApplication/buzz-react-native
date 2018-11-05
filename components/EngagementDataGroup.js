import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansText, OpenSansLightText } from '../components/StyledText'
import EngagementData from '../components/EngagementData'


class EngagementDataGroup extends React.Component {
  render() {
    const likesCount = this.props.likesCount;
    const commentsCount = this.props.commentsCount;

    console.log('likesCount inside EngagementDataGroup: ', likesCount);

    return (
      <View style={styles.engagementDataGroupContainer}>
        <EngagementData count={likesCount} type='likes'/>
        <EngagementData count={commentsCount} type='comments'/>
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
