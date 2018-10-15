import React from 'react';
import { StyleSheet, View, TouchableOpacity, Button } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { HeaderBackButton } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'


class PushNotificationSettingsHeader extends React.Component {
  render() {
    return (
      <View style={[styles.container, baseStyles.header]}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <HeaderBackButton tintColor='white' style={{backgroundColor: 'purple'}} onPress={() => this.props.navigation.goBack()} />
          </View>
          <OpenSansBoldText style={styles.headerText}>Push Notifications</OpenSansBoldText>
          <View style={styles.headerRight}>
            <Button title="Done" color='white' onPress={() => this.props.navigation.goBack()} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: baseStyles.grey,
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
    padding: 5,
    right: 10,
  },
  buzzButtonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
  },
});

export default PushNotificationSettingsHeader;
