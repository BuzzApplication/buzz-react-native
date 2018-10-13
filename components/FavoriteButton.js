import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'


class FavoriteButton extends React.Component {
  render() {
    return (
      <View style={styles.favoriteButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked me")}}>
          <Image source={require('../assets/images/star.png')} style={styles.favoriteButtonImage} />
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
