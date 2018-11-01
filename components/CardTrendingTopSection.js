import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Time from '../components/Time';
import UserContainerRowAligned from '../components/UserContainerRowAligned';


class CardTrendingTopSection extends React.Component {
  render() {
    const timePassed = this.props.timePassed;
    const alias = this.props.alias;
    const company = this.props.company;
    return (
      <View style={styles.topContainer}>
        <UserContainerRowAligned alias={alias} company={company} />
        <Time timePassed={timePassed} />
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
    paddingRight: 5,
  },
});

export default CardTrendingTopSection;
