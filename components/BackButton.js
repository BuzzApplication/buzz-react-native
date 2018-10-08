import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'


class BackButton extends React.Component {
  render() {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={() => {this.props.navigation.navigate('CommunityScreen')}}>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButtonContainer: {
    // backgroundColor: colors.lightPeriwinkle,
  },
  backButtonImage: {
    // backgroundColor: colors.paleTurquoise,
    // position: 'absolute',
    width: 25,
    height: 25,
  },
});

export default BackButton;
