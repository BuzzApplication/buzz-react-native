import React from 'react';
import { StyleSheet, View } from 'react-native';

import UserContainerVerticalAligned from '../components/UserContainerVerticalAligned';
import { ShareButton, CommentButton, LikeButton } from '../components/EngagementButton';


class CardBottomSection extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({...this.state})
    }
  }

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
          <CommentButton navigate={this.props.navigate} clickable={this.props.clickable}/>
          <LikeButton liked={liked} id={buzzId} likeAction={likeAction} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardBottomSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: -10,
  },
  engagementButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardBottomSection;
