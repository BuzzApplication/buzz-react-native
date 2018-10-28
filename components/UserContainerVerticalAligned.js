import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansLightItalicText } from '../components/StyledText'
import UserCommunity from '../components/UserCommunity'
import UserName from '../components/UserName'


class UserContainerVerticalAligned extends React.Component {
  render() {
    const alias = this.props.alias;
    const company = this.props.company;

    return (
      <View style={styles.userContainer}>
        <UserCommunity company={company} />
        <UserName alias={alias} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'column',
    justifyContent: "center",
  },
});

export default UserContainerVerticalAligned;
