import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansLightItalicText } from '../components/StyledText'


class UserName extends React.Component {
  render() {
    return (
      <View style={styles.userNameContainer}>
        <OpenSansLightItalicText style={styles.userNameText}>Toshiki</OpenSansLightItalicText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userNameContainer: {
    // backgroundColor: colors.lightPink,
    padding: 0,
  },
  userNameText: {
    // backgroundColor: colors.cloudyBlue,
    fontSize: 12,
    fontWeight: "300",
  },
});

export default UserName;
