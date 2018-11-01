import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'

import { favoriteBuzz } from "../api/buzz.js";


class FavoriteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorited: '',
    }
  }

  componentDidMount() {
    this.setState({
      favorited: this.props.favorited,
    });
  }

  _favoriteBuzz(buzzId, favorited) {
    favoriteBuzz(buzzId, !favorited).then((response) => {
      this.setState(prevState => ({
        favorited: !prevState.favorited
      }));
      console.log('Failed to favorite buzzId=',buzzId)
    });
  }

  render() {
    const id = this.props.id;
    const imageUrl = this.state.favorited ? require('../assets/images/starred.png') : require('../assets/images/star.png');

    return (
      <View style={styles.favoriteButtonContainer} >
        <TouchableOpacity
          style={baseStyles.button}
          onPress={() => this._favoriteBuzz(id, this.state.favorited)} >
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
