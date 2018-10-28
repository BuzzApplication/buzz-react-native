import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { OpenSansLightText } from '../components/StyledText'

import { colors } from '../constants/Colors'


class Time extends React.Component {
  render() {
    const timePassed = this.props.timePassed;

    return (
      <View style={styles.timeContainer}>
        <View style={styles.timeImageContainer}>
          <Image source={require('../assets/images/time.png')} style={styles.timeImage} />
        </View>
        <View style={styles.timeTextContainer}>
          <OpenSansLightText style={styles.timeText}>{timePassed.duration} {timePassed.unit} ago</OpenSansLightText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeContainer: {
    // backgroundColor: colors.pale,
    flexDirection: 'row',
  },
  timeImageContainer: {
    // backgroundColor: colors.grapefruit50,
    padding: 2,
    justifyContent: "center",
  },
  timeImage: {
    // backgroundColor: colors.paleTurquoise,
    width: 10,
    height: 10,
  },
  timeTextContainer: {
    // backgroundColor: colors.brownGrey,
    padding: 2,
    justifyContent: "center",
  },
  timeText: {
    // backgroundColor: colors.lightPeriwinkle,
    fontSize: 8,
    fontWeight: "300",
    letterSpacing: 0,
    color: colors.dark
  },
});

export default Time;
