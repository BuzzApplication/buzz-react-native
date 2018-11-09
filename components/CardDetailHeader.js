import React from 'react';
import { StyleSheet, View, Button, Dimensions, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Feather } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'


class CardDetailHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <HeaderBackButton tintColor={colors.skyBlue} onPress={() => {
              this.props.navigation.goBack();
            }} />,
          </View>
          <OpenSansBoldText style={styles.headerText}>Buzz</OpenSansBoldText>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[baseStyles.button]}
              onPress={() => {
                this.props.navigation.navigate('Report', {
                  type: 'BUZZ',
                  itemId: this.props.navigation.getParam('buzzId'),
                })}} >
              <Feather name="flag" size={18} color={colors.skyBlue} />
            </TouchableOpacity>
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
  },
  statusHeader: {
    backgroundColor: 'white',
    height: getStatusBarHeight(),
    borderColor: colors.skyBlue,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    right: 10,
  },
  buzzButtonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
  },
});

export default CardDetailHeader;
