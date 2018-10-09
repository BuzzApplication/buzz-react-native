import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Alert, Button } from 'react-native';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors'

class BuzzButton extends React.Component {
  render() {
    return (
      <Button onPress={Alert('POSTED')} title="Buzz" color={colors.appleBlue} />
    );
  }
}

const styles = StyleSheet.create({

});

export default BuzzButton;
