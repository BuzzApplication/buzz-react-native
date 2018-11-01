import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { OpenSansText, OpenSansLightText } from '../components/StyledText'


class EmptyFeed extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/victory.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <OpenSansLightText style={styles.text}>Be the first to buzz in your community!</OpenSansLightText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    top: '20%',
    bottom: '30%',
  },
  image: {
    height: 200,
    width: 200,
  },
  textContainer: {
    padding: 30,

  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default EmptyFeed;
