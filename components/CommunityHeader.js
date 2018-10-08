import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class CommunityHeader extends React.Component {
  render() {
    return (
      <View style={styles.communityHeader} />
    );
  }
}

const styles = StyleSheet.create({
  communityHeader: {
    backgroundColor: colors.paleSalmon,
    height: 20,
    borderColor: colors.paleSalmon,
  }
});

export default CommunityHeader;
