import React from 'react';
import { View, Text, Button, ScrollView, TouchableHighlight} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'

import styles from '../constants/Styles';
import { colors } from '../constants/Colors'

import { OpenSansText } from '../components/StyledText'

import Card from '../components/Card';

export default class CommunityScreen extends React.Component {


  render() {
    return (
      <ScrollableTabView
        renderTabBar={() => <ScrollableTabBar />}
        style={styles.communityHeaderStyle}
        tabBarTextStyle={styles.communityHeaderTextStyle}
        tabBarUnderlineStyle={styles.communityHeaderTextUnderlineStyle} >

        <ScrollView tabLabel="one" style={{backgroundColor:'white'}}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>
        <ScrollView tabLabel="two" style={{backgroundColor:'white'}}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ScrollView>

      </ScrollableTabView>
    );
  }
}
