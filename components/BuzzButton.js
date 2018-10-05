import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import styles from '../constants/Styles';

export class BuzzButton extends React.Component {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} >
          <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} style={styles.FloatingButtonStyle} />
          <View style={styles.FloatingButtonStyle} />
      </TouchableOpacity>
    );
  }
}
