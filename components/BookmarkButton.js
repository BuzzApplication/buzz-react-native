import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'


class BookmarkButton extends React.Component {
  render() {
    return (
      <View style={styles.bookmarkButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked me")}}>
          <Image source={require('../assets/images/bookmark.png')} style={styles.bookmarkButtonImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bookmarkButtonContainer: {
    // backgroundColor: colors.lightPeriwinkle,
  },
  bookmarkButtonImage: {
    // backgroundColor: colors.paleTurquoise,
    // position: 'absolute',
    width: 25,
    height: 25,
  },
});

export default BookmarkButton;
