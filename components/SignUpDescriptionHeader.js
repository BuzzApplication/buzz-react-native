import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'


class SignUpDescriptionHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <HeaderBackButton tintColor='white' onPress={() => this.props.navigation.goBack()} />,
          </View>
          <View style={styles.headerRight} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skyBlue,
  },
  statusHeader: {
    backgroundColor: colors.skyBlue,
    height: getStatusBarHeight(),
    borderColor: colors.skyBlue,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.skyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 2,
  },
  headerText: {
    color: colors.skyBlue,
    flex: 2,
    textAlign: 'center',
    fontSize: 18,
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    right: 10,
  },
});

export default SignUpDescriptionHeader;
