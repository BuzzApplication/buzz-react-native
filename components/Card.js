import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTopSection from '../components/CardTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardBottomSection from '../components/CardBottomSection'

import { likeBuzz } from "../api/buzz.js";

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Card extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <View style={[styles.cardContainer, baseStyles.bottomBorder, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={() => {this.props.navigation.navigate('CardDetail', {
              buzzId: data.id,
            })
          }}>
          <CardTopSection timePassed={data.timePassed} />
          <CardTextField text={data.text} />
          <EngagementDataGroup likesCount={data.likesCount} commentsCount={data.commentsCount} />
          <CardBottomSection alias={data.alias} company={data.userCompany.name} liked={data.liked} buzzId={data.id}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    cardContainer: {
      paddingLeft: 15,
      paddingRight: 5,
      paddingBottom: 5,
      flexDirection: 'column',
    },
});

export default Card;
