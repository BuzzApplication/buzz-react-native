import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansLightItalicText } from '../components/StyledText'


class UserName extends React.Component {
  render() {
    return (
      <View style={styles.userNameContainer}>
        <OpenSansLightItalicText style={styles.userNameText}>{this.props.alias}</OpenSansLightItalicText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userNameContainer: {
    padding: 1,
  },
  userNameText: {
    // backgroundColor: colors.cloudyBlue,
    fontSize: 12,
    fontWeight: "300",
  },
});

export default UserName;
