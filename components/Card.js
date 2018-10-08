import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTopSection from '../components/CardTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardBottomSection from '../components/CardBottomSection'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Card extends React.Component {
  render() {
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity style={baseStyles.Touchbutton} onPress={()=>{this.props.navigation.navigate('CardDetail')}}>
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
      // backgroundColor: colors.grapefruit50,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 5,
      borderStyle: "solid",
      borderWidth: 0,
      borderBottomWidth: 0.2,
      borderColor: "#979797",
      flexDirection: 'column',
    },
});


export default Card;
