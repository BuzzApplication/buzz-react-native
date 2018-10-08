import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import { ShareButton, CommentButton, LikeButton } from '../components/EngagementButton';


class CardBottomSection extends React.Component {
  render() {
    return (
      <View style={styles.cardBottomSectionContainer}>
        <UserContainerVerticalAligned />
        <View style={styles.engagementButtonsContainer}>
          <ShareButton />
          <CommentButton />
          <LikeButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardBottomSectionContainer: {
    // backgroundColor: colors.brownGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardBottomSection;
