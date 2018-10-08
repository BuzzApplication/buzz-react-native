import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'
import CardDetailTopSection from '../components/CardDetailTopSection'
import CardTextField from '../components/CardTextField'
import EngagementData from '../components/EngagementData'
import CardDetailBottomSection from '../components/CardDetailBottomSection'


class CardDetail extends React.Component {
  render() {
    return (
      <View style={styles.cardDetailContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("change!")}}>
          <CardDetailTopSection />
          <CardTextField text={this.props.text} />
          <CardDetailBottomSection />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cardDetailContainer: {
      // backgroundColor: colors.grapefruit50,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 0,
      borderStyle: "solid",
      borderWidth: 0,
      borderBottomWidth: 0.2,
      borderColor: "#979797",
      flexDirection: 'column',
    },
});

export default CardDetail;
