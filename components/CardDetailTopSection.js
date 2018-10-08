import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Time from '../components/Time';
import UserContainerRowAligned from '../components/UserContainerRowAligned';



class CardDetailTopSection extends React.Component {
  render() {
    return (
      <View style={styles.topContainer}>
        <UserContainerRowAligned />
        <Time />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    // backgroundColor: colors.lightPink,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardDetailTopSection;
