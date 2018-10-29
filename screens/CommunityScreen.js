import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Dimensions, List, ListItem } from 'react-native';
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

import { getUserEmail } from "../api/user.js";
import { getBuzzList } from "../api/buzz.js";


class CommunityScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  }

  constructor(props) {
    super(props);
    this.state = {
      userEmails: [],
      buzzListByCompanyId: {},
      isFetching: false,
    }
  }

  componentDidMount() {
    this._fetchAll();
  }

  _fetchAll() {
    this.setState({ isFetching: true });
    getUserEmail().then((response) => {
      this.setState({ userEmails: response.userEmails });
      const companyIds = response.userEmails.map((userEmail) => {
        return userEmail.company.id
      });
      getBuzzList(companyIds).then((response) => {
        var buzzListByCompanyId = _.keyBy(response, r => r.companyId);
        this.setState({ buzzListByCompanyId: buzzListByCompanyId });
        this.setState({ isFetching: false })
      });
    });
  }

  _getCommunities() {
    return this.state.userEmails.map(userEmail => {
      let buzzListAndCompanyId = this.state.buzzListByCompanyId[userEmail.company.id]
      let buzzList = _.get(buzzListAndCompanyId, 'buzzList');

      return (
        <FlatList
          tabLabel={userEmail.company.name}
          style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          onRefresh={() => this._fetchAll()}
          refreshing={this.state.isFetching}
          data={buzzList}
          renderItem={({item}) => (
            <Card data={item} navigation={this.props.navigation} />
          )}
        />
      );
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar
              activeTextColor={'white'}
              underlineStyle={styles.communityHeaderUnderline}
              style={styles.defaultTabBarContainer} />
            }
          style={styles.scrollableTabViewContainer}
          showsHorizontalScrollIndicator={false}
          tabBarInactiveTextColor={'white'}
        >
          {this._getCommunities()}
        </ScrollableTabView>
        <BuzzPlusButton navigation={this.props.navigation} />
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
