import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Time from '../components/Time';
import FavoriteButton from '../components/FavoriteButton';


class CardTopSection extends React.Component {
  render() {
    const buzzId = this.props.buzzId;
    const timePassed = this.props.timePassed;
    const favorited = this.props.favorited;

    return (
      <View style={[styles.topContainer, this.props.style]}>
        <Time timePassed={timePassed} />
        <FavoriteButton favorited={favorited} id={buzzId} />
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
