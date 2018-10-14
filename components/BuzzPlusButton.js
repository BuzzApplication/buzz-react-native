import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors'

class BuzzPlusButton extends React.Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.5} style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('Buzz')}} >
          <Ionicons name="ios-add" size={90} color='white' style={styles.plusToMakeItNotTransparent} />
          <Ionicons name="ios-add-circle" size={70} color={colors.skyBlue} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  plusToMakeItNotTransparent: {
    position: 'absolute',
    right: 16,
  }
});

export default BuzzPlusButton;
