import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Time from '../components/Time';
import FavoriteButton from '../components/FavoriteButton';


class CardTopSection extends React.Component {
  render() {
    const timePassed = this.props.timePassed;

    return (
      <View style={[styles.topContainer, this.props.style]}>
        <Time timePassed={timePassed} />
        <FavoriteButton />
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

export default CardTopSection;
