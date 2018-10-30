import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Share } from 'react-native';

import baseStyles from '../constants/Styles'

import { likeBuzz } from "../api/buzz.js";
import { likeComment } from "../api/comment.js";


export class ShareButton extends React.Component {
  _shareMessage=()=> {
    Share.share(
    {
      message: 'Love mahun!'
    }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={ this._shareMessage }>
          <Image source={require('../assets/images/share.png')} style={[styles.engagementButtonImage, this.props.style]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export class CommentButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={() =>  this.props.navigate()} >
          <Image source={require('../assets/images/comment.png')} style={[styles.engagementButtonImage, this.props.style]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.liked,
    }
  }

  _likeBuzz(buzzId, liked) {
    likeBuzz(buzzId, !liked).then((response) => {
      this.setState(prevState => ({
        liked: !prevState.liked
      }));
    });
  }

  _likeComment(commentId, liked) {
    likeComment(commentId, !liked).then((response) => {
      this.setState(prevState => ({
        liked: !prevState.liked
      }));
    });
  }

  render() {
    const id = this.props.id;
    const imageUrl = this.state.liked ? require('../assets/images/liked.png') : require('../assets/images/like.png');

    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity
          style={baseStyles.button}
          onPress={() => this.props.type === 'BUZZ' ? this._likeBuzz(id, this.state.liked) : this._likeComment(id, this.state.liked)} >
          <Image source={imageUrl} style={[styles.engagementButtonImage, this.props.style]} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  engagementButtonContainer: {
    // backgroundColor: colors.paleTurquoise,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  engagementButtonImage: {
    width: 22,
    height: 22,
  },
});
