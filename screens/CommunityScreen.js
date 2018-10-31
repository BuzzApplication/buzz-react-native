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

    this._getAllBuzz = this._getAllBuzz.bind(this);
  }

  componentDidMount() {
    this._getAllBuzz();
  }

  _getAllBuzz() {
    this.setState({ isFetching: true });
    getUserEmail().then((response) => {
      const companyIds = response.userEmails.map((userEmail) => {
        return userEmail.company.id
      });
      console.log('companyIds', companyIds);
      getBuzzList(companyIds).then((responseBuzzList) => {
        const buzzListByCompanyId = _.keyBy(responseBuzzList, r => r.companyId);
        this.setState({
          buzzListByCompanyId: buzzListByCompanyId,
          isFetching: false,
          userEmails: response.userEmails,
        });
      });
    });
  }

  _getCommunities() {
    return this.state.userEmails.map(userEmail => {
      let buzzListAndCompanyId = this.state.buzzListByCompanyId[userEmail.company.id]
      let buzzList = _.get(buzzListAndCompanyId, 'buzzList');
      let companyId = _.get(buzzListAndCompanyId, 'companyId');

      return (
        <FlatList
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
          data={buzzList}
          keyExtractor={(item, index) => companyId + '#' + item.id.toString()}
          key={(item) => companyId.toString() + '##' + item.id.toString()}
          renderItem={(item) => {
            return <Card data={item} userEmails={this.state.userEmails} navigation={this.props.navigation} />
          }}
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
