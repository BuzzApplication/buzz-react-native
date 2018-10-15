import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'
import CommentCardTopSection from '../components/CommentCardTopSection'
import CardTextField from '../components/CardTextField'
import EngagementData from '../components/EngagementData'
import CommentCardBottomSection from '../components/CommentCardBottomSection'


class CommentCard extends React.Component {
  render() {
    return (
      <View style={[styles.commentCardContainer, baseStyles.bottomBorder]}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("change!")}}>
          <CommentCardTopSection />
          <CardTextField text={this.props.text} />
          <CommentCardBottomSection />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    commentCardContainer: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 0,
      flexDirection: 'column',
    },
});

export default CommentCard;
