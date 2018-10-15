import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTopSection from '../components/CardTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardBottomSection from '../components/CardBottomSection'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class CardTrending extends React.Component {
  render() {
    return (
      <View style={[styles.cardContainer, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('CardTrendingDetail')}}>
          <CardTopSection />
          <CardTextField text={this.props.text} />
          <EngagementDataGroup />
          <CardBottomSection />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cardContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5,
      flexDirection: 'column',
    },
});

export default CardTrending;
