import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import EngagementData from '../components/EngagementData';
import FavoriteButton from '../components/FavoriteButton';
import { ShareButton, CommentButton, LikeButton } from '../components/EngagementButton';


class CardTrendingBottomSection extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({...this.state});
    }
  }

  render() {
    const buzzId = this.props.buzzId;
    const likesCount = this.props.likesCount;
    const commentsCount = this.props.commentsCount;
    const liked = this.props.liked;
    const favorited = this.props.favorited;
    const likeAction = this.props.likeAction;
    const favoriteAction = this.props.favoriteAction;

    return (
      <View style={styles.cardTrendingBottomSectionContainer}>
        <View style={styles.engagementDataGroup}>
          <EngagementData type='likes' count={likesCount} styles={styles.engagementData}/>
          <EngagementData type='comments' count={commentsCount} styles={styles.engagementData}/>
        </View>
        <View style={styles.engagementButtonsContainer}>
          <FavoriteButton favorited={favorited} id={buzzId} imageStyle={styles.favoriteButtonImage} favoriteAction={favoriteAction}/>
          <ShareButton style={styles.button} />
          <CommentButton style={styles.button} navigate={this.props.navigate} clickable={this.props.clickable} />
          <LikeButton liked={liked} style={styles.button} id={buzzId} likeAction={likeAction} />
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
