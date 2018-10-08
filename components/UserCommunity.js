import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OpenSansLightText } from '../components/StyledText'


class UserCommunity extends React.Component {
  render() {
    return (
      <View style={styles.userCommunityContainer}>
        <OpenSansLightText style={styles.userCommunityText}>Yahoo!</OpenSansLightText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userCommunityContainer: {
    // backgroundColor: colors.lightPeriwinkle,
    padding: 0,
  },
  userCommunityText: {
    // backgroundColor: colors.cloudyBlue,
    fontSize: 12,
    fontWeight: "300",
  },
});

export default UserCommunity;
