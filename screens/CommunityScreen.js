import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView, FlatList, TouchableOpacity, TouchableHighlight, Dimensions, List, ListItem } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview';
import { Constants } from 'expo';

import CardNavigator from '../navigation/CardNavigator';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors'

import { OpenSansText } from '../components/StyledText'
import StatusBarHeader from '../components/StatusBarHeader';
import Card from '../components/Card';
import BuzzPlusButton from '../components/BuzzPlusButton';

class CommunityScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar
              activeTextColor={'white'}
              underlineStyle={styles.communityHeaderUnderline}
              // tabsContainerStyle={styles.communityHeaderTabsContainer}
              style={styles.defaultTabBarContainer} />
            }
          style={styles.scrollableTabViewContainer}
          showsHorizontalScrollIndicator={false}
          tabBarInactiveTextColor={'white'}
        >
          <FlatList
            tabLabel="Everyone"
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            data={[
              {key: 'Bagaimana cara menabung yg benar?'},
              {key: 'Brp sih gaji di Gojek?'},
              {key: 'Ini app apa ya?'},
              {key: 'Keren jg nih... \n haloo smua'},
            ]}
            renderItem={({ item }) => (
              <Card text={item.key} navigation={this.props.navigation} />
            )}
          />
          <FlatList
            tabLabel="Bank Mandiri"
            style={{backgroundColor:'white'}}
            showsVerticalScrollIndicator={false}
            data={[
              {key: 'Bagaimana cara menabung yg benar?'},
              {key: 'Brp sih gaji di Gojek?'},
              {key: 'Ini app apa ya?'},
              {key: 'Keren jg nih... \n haloo smua'},
            ]}
            renderItem={({ item }) => (
              <Card text={item.key} navigation={this.props.navigation}/>
            )}
          />
        </ScrollableTabView>
        <BuzzPlusButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableTabViewContainer: {
    borderWidth: 0,
    backgroundColor: colors.skyBlue
  },
  defaultTabBarContainer: {
    borderWidth: 0,
  },
  // communityHeaderTextStyle: {
  //   fontFamily: 'open-sans',
  //   fontSize: 14,
  //   fontWeight: "bold",
  //   fontStyle: "normal",
  //   letterSpacing: 0,
  //   textAlign: "center",
  //   color: colors.dark,
  // },
  communityHeaderUnderline: {
    height: 3,
    backgroundColor: colors.darkBlue,
  },
  // communityHeaderTabsContainer: {
  //   backgroundColor: colors.skyBlue,
  //   // backgroundColor: 'red',
  // },
});


export default CommunityScreen;
