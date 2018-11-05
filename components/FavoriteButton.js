import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'

import { favoriteBuzz } from "../api/buzz.js";


class FavoriteButton extends React.Component {
  render() {
    const id = this.props.id;
    const favoriteAction = this.props.favoriteAction;
    const imageUrl = this.props.favorited ? require('../assets/images/starred.png') : require('../assets/images/star.png');

    return (
      <View style={styles.favoriteButtonContainer} >
        <TouchableOpacity
          style={baseStyles.button}
          onPress={() => favoriteAction(id, this.props.favorited)} >
          <Image source={imageUrl} style={[styles.favoriteButtonImage, this.props.imageStyle]} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoriteButtonContainer: {

    // backgroundColor: colors.lightPeriwinkle,
  },
  favoriteButtonImage: {
    // backgroundColor: colors.paleTurquoise,
    // position: 'absolute',
    width: 20,
    height: 20,
  },
});

export default FavoriteButton;
