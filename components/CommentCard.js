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
      <View style={styles.commentCardContainer}>
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

export default CommentCard;
