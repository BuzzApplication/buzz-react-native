import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import EngagementData from '../components/EngagementData';
import FavoriteButton from '../components/FavoriteButton';
import { ShareButton, CommentButton, LikeButton } from '../components/EngagementButton';


class CardTrendingBottomSection extends React.Component {
  render() {
    return (
      <View style={styles.cardTrendingBottomSectionContainer}>
        <View style={styles.engagementDataGroup}>
          <EngagementData type='likes' styles={styles.engagementData}/>
          <EngagementData type='comments' styles={styles.engagementData}/>
        </View>
        <View style={styles.engagementButtonsContainer}>
          <FavoriteButton imageStyle={styles.favoriteButtonImage} />
          <ShareButton style={styles.button} />
          <CommentButton style={styles.button} />
          <LikeButton style={styles.button} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTrendingBottomSectionContainer: {
    // backgroundColor: colors.brownGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  engagementDataGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementData: {
    paddingTop: 0,
  },
  favoriteButtonImage: {
    height: 15,
    width: 15,
  },
  button: {
    height: 15,
    width: 15,
  }
});

export default CardTrendingBottomSection;
