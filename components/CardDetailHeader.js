import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'
import BackButton from '../components/BackButton';


class CardDetailHeader extends React.Component {
  render() {
    return (
      <View style={styles.CardDetailHeader}>
        // <BackButton  navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CardDetailHeader: {
    backgroundColor: colors.paleSalmon,
    height: 100,
    borderColor: colors.paleSalmon,
  }
});

export default CardDetailHeader;
