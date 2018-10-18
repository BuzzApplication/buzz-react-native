import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTrendingTopSection from '../components/CardTrendingTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardTrendingBottomSection from '../components/CardTrendingBottomSection'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class CardTrending extends React.Component {
  render() {
    return (
      <View style={[styles.cardContainer, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('CardTrendingDetail')}}>
          <CardTrendingTopSection />
          <CardTextField text={this.props.text} />
          <CardTrendingBottomSection />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cardContainer: {
      paddingLeft: 5,
      paddingBottom: 0,
      paddingTop: 0,
      flexDirection: 'column',
    },
});

export default CardTrending;
