import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'


export class ShareButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked share")}}>
          <Image source={require('../assets/images/share.png')} style={[styles.engagementButtonImage, this.props.styles]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export class CommentButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked comment")}}>
          <Image source={require('../assets/images/comment.png')} style={[styles.engagementButtonImage, this.props.styles]} />
        </TouchableOpacity>
      </View>
    );
  }
}

export class LikeButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked like")}}>
          <Image source={require('../assets/images/like.png')} style={[styles.engagementButtonImage, this.props.styles]} />
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
    width: 25,
    height: 25,
  },
});
