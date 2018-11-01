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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      buzzId: this.props.data.item.id,
      userEmailId: this.props.data.item.userEmailId,
    });
  }

  _navigateToCardDetail() {
    this.props.navigation.navigate('CardDetailScreen', {
      buzzId: this.state.buzzId,
      userEmailId: this.state.userEmailId,
    });
  }

  render() {
    const data = this.props.data.item;
    return (
      <View style={[styles.cardContainer, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} onPress={()=> this._navigateToCardDetail()}>
          <CardTrendingTopSection timePassed={data.timePassed} alias={data.alias} company={data.userCompany.name} />
          <CardTextField text={data.text} />
          <CardTrendingBottomSection
            liked={data.liked}
            favorited={data.favorited}
            buzzId={data.id}
            likesCount={data.likesCount}
            commentsCount={data.commentsCount} />
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
