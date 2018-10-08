import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'

import { OpenSansText } from '../components/StyledText'


class CardTextField extends React.Component {
  render() {
    return (
      <View style={styles.cardTextFieldContainer}>
        <OpenSansText style={styles.cardTextFieldText}>
          {this.props.text}
        </OpenSansText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTextFieldContainer: {
    // backgroundColor: colors.paleTurquoise,
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardTextFieldText: {
    // backgroundColor: colors.lightPeriwinkle,
    fontSize: 14,
  },
});

export default CardTextField;
