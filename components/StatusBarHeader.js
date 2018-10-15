import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class StatusBarHeader extends React.Component {
  render() {
    return (
      <View style={styles.statusBarHeader} />
    );
  }
}

const styles = StyleSheet.create({
  statusBarHeader: {
    backgroundColor: colors.skyBlue,
    height: getStatusBarHeight(),
    borderColor: colors.skyBlue,
    borderWidth: 0,
  }
});

export default StatusBarHeader;
