import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HeaderBackButton } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansBoldText } from '../components/StyledText'


class ProfileHeader extends React.Component {
  render() {
    return (
      <View style={[styles.container, baseStyles.header]}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} />
          <OpenSansBoldText style={styles.headerText}></OpenSansBoldText>
          <View style={styles.headerRight}>
            <TouchableOpacity style={baseStyles.button} onPress={() => this.props.navigation.navigate('Settings', {
              userId: this.props.navigation.getParam('userId'),
            })} >
              <Ionicons name="ios-settings" size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // borderStyle: "solid",
    // borderBottomWidth: 0.2,
    // borderColor: baseStyles.grey,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 2,
  },
  headerText: {
    color: 'white',
    flex: 5,
    textAlign: 'center',
    fontSize: 16,
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 0,
    right: 10,
  },
});

export default ProfileHeader;
