import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import baseStyles from '../constants/Styles'
import { colors } from '../constants/Colors'


class CloseButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity style={baseStyles.button} >
          <Ionicons name="ios-close" size={70} color={colors.paleSalmon} />
        </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default CloseButton;
