import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Dimensions, List, ListItem, Image } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import { Constants } from 'expo';
import _ from 'lodash';

import CardNavigator from '../navigation/CardNavigator';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors'

import { OpenSansText } from '../components/StyledText'
import StatusBarHeader from '../components/StatusBarHeader';
import Card from '../components/Card';
import BuzzPlusButton from '../components/BuzzPlusButton';
import EmptyFeed from '../components/EmptyFeed';

import { getUserEmail } from "../api/user.js";
import { getBuzzList, likeBuzz, favoriteBuzz, submitPoll } from "../api/buzz.js";


class CommunityScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  }

  constructor(props) {
    super(props);
    this.state = {
      userEmails: [],
      buzzListByCompanyId: [],
      isFetching: false,
      startPagination: 0,
    }

    this._getAllBuzz = this._getAllBuzz.bind(this);
    this._likeBuzz = this._likeBuzz.bind(this);
    this._favoriteBuzz = this._favoriteBuzz.bind(this);
    this._pollBuzz = this._pollBuzz.bind(this);
    this._updateBuzz = this._updateBuzz.bind(this);
  }

  componentDidMount() {
    this._getAllBuzz();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this._getAllBuzz();
    }
  }

  _updateBuzz(updatedBuzz) {
    const buzzList = this.state.buzzListByCompanyId[updatedBuzz.companyId].buzzList;
    const updatedBuzzList = _.map(buzzList, function(buzz, index) {
      return buzz.id === updatedBuzz.id ? updatedBuzz : buzz;
    });

    this.state.buzzListByCompanyId[updatedBuzz.companyId].buzzList = updatedBuzzList;
    this.forceUpdate();
  }

  _likeBuzz(buzzId, liked) {
    likeBuzz(buzzId, !liked).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _favoriteBuzz(buzzId, favorited) {
    favoriteBuzz(buzzId, !favorited).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _pollBuzz(pollId) {
    submitPoll(pollId).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _getAllBuzz() {
    this.setState({ isFetching: true });
    getUserEmail().then((response) => {
      const companyIds = response.userEmails.map((userEmail) => {
        return userEmail.company.id
      });
      getBuzzList(companyIds).then((responseBuzzList) => {
        const buzzListByCompanyId = _.keyBy(responseBuzzList, r => r.companyId);

        this.setState({
          buzzListByCompanyId: buzzListByCompanyId,
          isFetching: false,
          userEmails: response.userEmails,
          startPagination: 10,
        });
      });
    });
  }

  _loadMoreBuzz(companyId) {
    getBuzzList([companyId], this.state.startPagination).then((responseBuzzList) => {
      if (responseBuzzList.length > 0) {
        const buzzListByCompanyId = _.keyBy(responseBuzzList, r => r.companyId);
        let buzzList = _.get(buzzListByCompanyId[companyId], 'buzzList');
        this.state.buzzListByCompanyId[companyId].buzzList = [...this.state.buzzListByCompanyId[companyId].buzzList, ...buzzList];
        this.setState({
          isFetching: false,
          startPagination: this.state.startPagination + 10,
        });
      }
    });
  }

  _getCommunities() {
    return this.state.userEmails.map((userEmail) => {
      let buzzListAndCompanyId = this.state.buzzListByCompanyId[userEmail.company.id]
      let buzzList = _.get(buzzListAndCompanyId, 'buzzList');
      let companyId = _.get(buzzListAndCompanyId, 'companyId');

      if (buzzList) {
        return (
          <FlatList
            key={userEmail.id}
            tabLabel={userEmail.company.name}
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            onRefresh={() => this._getAllBuzz()}
            refreshing={this.state.isFetching}
            // scroll to top only after posted a comment
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => {
              if (this.props.navigation.getParam('posted')) this.flatList.scrollToIndex({ animated: true, index: 0 });
            }}
            onLayout={() => {
              if (this.props.navigation.getParam('posted')) this.flatList.scrollToIndex({ animated: true, index: 0 });
            }}
            onEndReached={({ distanceFromEnd }) => {
              this._loadMoreBuzz(companyId);
            }}
            onEndReachedThreshold={1}
            data={buzzList}
            keyExtractor={(item) => {item.id}}
            renderItem={(item) => {
              return <Card
                data={item}
                clickable={true}
                userEmails={this.state.userEmails}
                navigation={this.props.navigation}
                likeAction={this._likeBuzz}
                favoriteAction={this._favoriteBuzz}
                pollAction={this._pollBuzz}
              />
            }}
          />
        );
      } else {
        return (
          <FlatList
            key={userEmail.id+"EMPTY"}
            tabLabel={userEmail.company.name}
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            onRefresh={() => this._getAllBuzz()}
            refreshing={this.state.isFetching}
            data={[{key: 'emptyScreen'}]}
            renderItem={(item) => {
              return (<EmptyFeed/ >)
            }}
          />
        );
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          renderTabBar={(index) =>
            <DefaultTabBar
              key={index}
              activeTextColor={'white'}
              textStyle={{fontSize: 16}}
              underlineStyle={styles.communityHeaderUnderline}
              style={styles.defaultTabBarContainer}
              />
            }
          style={styles.scrollableTabViewContainer}
          showsHorizontalScrollIndicator={false}
          tabBarInactiveTextColor={'white'}
        >
          {this._getCommunities()}
        </ScrollableTabView>
        <BuzzPlusButton navigation={this.props.navigation} refetch={this._getAllBuzz}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableTabViewContainer: {
    borderWidth: 0,
    backgroundColor: colors.skyBlue,
  },
  defaultTabBarContainer: {
    borderWidth: 0,
  },
  communityHeaderUnderline: {
    height: 3,
    backgroundColor: colors.darkBlue,
  },
});


export default CommunityScreen;
