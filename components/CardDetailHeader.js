import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

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
            <MenuProvider style={styles.menuProviderContainer}>
              <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                <MenuTrigger>
                  <MaterialCommunityIcons name="dots-horizontal" size={25} color={colors.skyBlue} />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptionsContainer}>
                  <MenuOption style={styles.menuOption} value={'report'} text='Report this post' />
                </MenuOptions>
              </Menu>
            </MenuProvider>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    right: 10,
  },
  menuProviderContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  menuOptionsContainer: {
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  menuOption: {
    alignItems: 'center',
    right: 30,
  },
  buzzButtonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
  },
});

export default CardDetailHeader;
