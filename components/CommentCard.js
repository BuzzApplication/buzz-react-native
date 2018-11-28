import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'

import CommentCardTopSection from '../components/CommentCardTopSection'
import CardTextField from '../components/CardTextField'
import CommentCardBottomSection from '../components/CommentCardBottomSection'


class CommentCard extends React.Component {
  render() {
    const data = this.props.data.item;
    const navigation = this.props.navigation;

    return (
      <View style={[styles.commentCardContainer, baseStyles.bottomBorder]}>
        <TouchableOpacity style={baseStyles.button} activeOpacity={1}>
          <CommentCardTopSection timePassed={data.timePassed} alias={data.alias} company={data.userCompany.name} />
          <CardTextField text={data.text} />
          <CommentCardBottomSection liked={data.liked} likesCount={data.likesCount} commentId={data.id} likeAction={this.props.likeAction} navigation={navigation}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    commentCardContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 0,
      flexDirection: 'column',
    },
});

export default CommentCard;
