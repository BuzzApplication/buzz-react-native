import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { OpenSansText, OpenSansLightText } from '../components/StyledText'


class EngagementData extends React.Component {
  render() {
    return (
      <View style={[styles.engagementDataContainer, this.props.styles]}>
        <View style={styles.engagementDataTextContainer}>
          <OpenSansText style={styles.engagementDataText}>210</OpenSansText>
        </View>
        <View style={styles.engagementDataTextContainer}>
          <OpenSansLightText style={styles.engagementDataText}>{this.props.type}</OpenSansLightText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  engagementDataContainer: {
    // backgroundColor: colors.paleTurquoise,
    paddingTop: 8,
    paddingRight: 5,
    flexDirection: 'row',
  },
  engagementDataTextContainer: {
    // backgroundColor: colors.brownGrey,
    paddingRight: 2,
  },
  engagementDataText: {
    // backgroundColor: colors.cloudyBlue,
    fontSize: 10,
  },
});

export default EngagementData;
