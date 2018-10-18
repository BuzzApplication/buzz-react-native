import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import EngagementData from '../components/EngagementData';
import { ShareButton, LikeButton } from '../components/EngagementButton';


class CommentCardBottomSection extends React.Component {
  render() {
    return (
      <View style={styles.commentCardBottomSectionContainer}>
        <EngagementData type='likes' styles={styles.engagementData}/>
        <View style={styles.engagementButtonsContainer}>
          <ShareButton style={styles.button}/>
          <LikeButton style={styles.button}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentCardBottomSectionContainer: {
    // backgroundColor: colors.brownGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagementButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementData: {
    paddingTop: 0,
  },
  button: {
    height: 15,
    width: 15,
  }
});

export default CommentCardBottomSection;
