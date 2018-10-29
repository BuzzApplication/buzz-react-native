import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import _ from 'lodash';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTopSection from '../components/CardTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardBottomSection from '../components/CardBottomSection'

import { likeBuzz } from "../api/buzz.js";

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  // pick the next userEmail if name is `Everyone`
  // assuming everyone has other company than `Everyone`
  _getUserEmailId(userEmails, companyId) {
    const userEmailCandidate = _.keyBy(userEmails, userEmail => userEmail.company.id)[companyId];

    if (_.get(userEmailCandidate, 'company.name') == 'Everyone') {
      _.forEach(userEmails, (userEmail) => {
        if(_.get(userEmail, 'company.name') !== 'Everyone')
          return _.get(userEmail, 'id');
      })
    }

    return _.get(userEmailCandidate, 'id');
  }

  render() {
    const data = this.props.data.item;
    const userEmails = this.props.userEmails;

    return (
      <View style={[styles.cardContainer, baseStyles.bottomBorder, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={() => {this.props.navigation.navigate('CardDetail', {
              buzzId: data.id,
              userEmailId: this._getUserEmailId(userEmails, data.companyId),
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
