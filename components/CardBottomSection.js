import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import { ShareButton, CommentButton, LikeButton } from '../components/EngagementButton';


class CardBottomSection extends React.Component {

  render() {
    const buzzId = this.props.buzzId;
    const alias = this.props.alias;
    const company = this.props.company;
    const liked = this.props.liked;
    const likeAction = this.props.likeAction;

    return (
      <View style={styles.cardBottomSectionContainer}>
        <UserContainerVerticalAligned alias={alias} company={company} />
        <View style={styles.engagementButtonsContainer}>
          <ShareButton />
          <CommentButton navigate={this.props.navigate} />
          <LikeButton liked={liked} id={buzzId} likeAction={likeAction} />
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
