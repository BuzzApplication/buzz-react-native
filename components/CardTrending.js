import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import CardTrendingTopSection from '../components/CardTrendingTopSection'
import CardTextField from '../components/CardTextField'
import EngagementDataGroup from '../components/EngagementDataGroup'
import CardTrendingBottomSection from '../components/CardTrendingBottomSection'
import Poll from '../components/Poll'

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
    this._navigateToCardDetail = this._navigateToCardDetail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({...this.state});
    }
  }

  _navigateToCardDetail(clickable) {
    if (!clickable) {
      return;
    }
    this.props.navigation.navigate('CardDetail', {
      buzzId: this.state.buzzId,
      userEmailId: this.state.userEmailId,
      likeAction: this.props.likeAction,
      favoriteAction: this.props.favoriteAction,
      pollAction: this.props.pollAction,
    });
  }

  render() {
    const data = this.props.data.item;
    const likeAction = this.props.likeAction;
    const favoriteAction = this.props.favoriteAction;
    const pollAction = this.props.pollAction;
    const clickable = this.props.clickable == undefined ? true : this.props.clickable;

    return (
      <View style={[styles.cardContainer, this.props.style]}>
        <TouchableOpacity style={baseStyles.button} activeOpacity={1} onPress={()=> this._navigateToCardDetail(clickable)}>
          <CardTrendingTopSection timePassed={data.timePassed} alias={data.alias} company={data.userCompany.name} />
          <CardTextField text={data.text} />
          <Poll data={data.polls} polled={data.polled} pollAction={pollAction} />
          <CardTrendingBottomSection
            likeAction={likeAction}
            favoriteAction={favoriteAction}
            liked={data.liked}
            favorited={data.favorited}
            buzzId={data.id}
            likesCount={data.likesCount}
            commentsCount={data.commentsCount}
            clickable={clickable}
            navigate={this._navigateToCardDetail}/>
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
