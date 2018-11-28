import React from 'react';
import { StyleSheet, View, FlatList, AppState } from 'react-native';

import NotificationHeader from '../components/NotificationHeader';
import Notification from '../components/Notification';
import BuzzPlusButton from '../components/BuzzPlusButton';

import { getNotification } from "../api/notification.js";
import _ from "lodash";
import {getUserEmail} from "../api/user";
import EmptyNotification from '../components/EmptyNotification'


class NotificationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <NotificationHeader navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    this._getNotification();
    this._setUserEmailId();
    this.timer = setInterval(() => this._getNotification(), 30000);
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this._getNotification();
      this.timer = setInterval(() => this._getNotification(), 30000);
    } else if (this.state.appState === 'active' && nextAppState.match(/inactive|background/)) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.setState({appState: nextAppState});
  };

  _getNotification() {
    getNotification().then((response) => {
      this.setState({
        notification: response,
      })
    })
  }

  _setUserEmailId() {
    getUserEmail().then((response) => {
      const userEmailId = this._getUserEmailId(response.userEmails);
      this.props.navigation.setParams({userEmailId: userEmailId});
    });
  }

  _getUserEmailId(userEmails) {
    const userEmailsFiltered = _.filter(userEmails, function(userEmail) { return userEmail.company.id !== 1; });
    return userEmailsFiltered[0].id;
  }

  render() {
    if (this.state.notification.length > 0) {
      return (
        <View style={styles.container}>
          <FlatList
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            data={this.state.notification}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Notification item={item} navigation={this.props.navigation} />
            )}
          />
          <BuzzPlusButton navigation={this.props.navigation} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            data={[{key: 'emptyScreen'}]}
            renderItem={(item) => {
              return (<EmptyNotification />)
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
  },
});

export default NotificationScreen;
