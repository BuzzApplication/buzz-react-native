import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { OpenSansLightItalicText } from '../components/StyledText'
import UserCommunity from '../components/UserCommunity'
import UserName from '../components/UserName'


class UserContainerRowAligned extends React.Component {
  render() {
    const alias = this.props.alias;
    const company = this.props.company;
    return (
      <View style={styles.userContainer}>
        <UserCommunity company={company} />
        <OpenSansLightItalicText> · </OpenSansLightItalicText>
        <UserName alias={alias} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserContainerRowAligned;
