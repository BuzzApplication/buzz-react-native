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
    this.state = {
      userEmailId: '',
      buzz: {},
    }
    this._navigateToCardDetail = this._navigateToCardDetail.bind(this);
  }

  componentDidMount() {
    this._getUserEmailId(this.props.userEmails, this.props.data);
  }

  // pick the next userEmail if name is `Everyone`
  // assuming everyone has other company than `Everyone`
  _getUserEmailId(userEmails, data) {
    const companyId = data.item.companyId;
    const buzz = data.item;
    const userEmailCandidate = _.keyBy(userEmails, userEmail => userEmail.company.id)[companyId];

    if (_.isEqual(_.get(userEmailCandidate, 'company.name'), 'Everyone')) {
      _.forEach(userEmails, (userEmail) => {
        if(!_.isEqual(_.get(userEmail, 'company.name'), 'Everyone')) {
          this.setState({
            userEmailId: _.get(userEmail, 'id'),
            buzz: buzz,
          });
        }
      })
    } else {
      this.setState({
        userEmailId: _.get(userEmailCandidate, 'id'),
        buzz: buzz,
      });
    }
  }

  _navigateToCardDetail() {
    this.props.navigation.navigate('CardDetail', {
          buzzId: this.state.buzz.id,
          userEmailId: this.state.userEmailId,
          likeAction: this.props.likeAction,
          favoriteAction: this.props.favoriteAction,
        });
  }

  render() {
    const data = this.props.data.item;
    const userEmails = this.props.userEmails;

    return (
      <View style={[styles.cardContainer, baseStyles.bottomBorder, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={() => this._navigateToCardDetail()} >
          <CardTopSection timePassed={data.timePassed} favorited={data.favorited} buzzId={data.id} favoriteAction={this.props.favoriteAction} />
          <CardTextField text={data.text} />
          <EngagementDataGroup likesCount={data.likesCount} commentsCount={data.commentsCount} />
          <CardBottomSection
            likeAction={this.props.likeAction}
            alias={data.alias}
            company={data.userCompany.name}
            liked={data.liked}
            buzzId={data.id}
            navigate={this._navigateToCardDetail} />
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
