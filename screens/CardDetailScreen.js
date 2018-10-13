import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , Share} from 'react-native';
import { HeaderBackButton } from 'react-navigation';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';


import Card from '../components/Card';
import CardDetail from '../components/CardDetail';
import Keyboard from '../components/Keyboard';

export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    title: 'Buzz',
    headerLeft: <HeaderBackButton onPress={() => navigation.goBack()} />,
    // tabBarVisible: false,
  })
  render() {
    return (
      <View style={styles.screenContainer}>
        <ScrollView tabLabel="Everyone" style={{backgroundColor:'white'}} showsVerticalScrollIndicator={false} keyboardDismissMode="interactive">
          <Card text='CARD DETAIL \n haloo smua'/>
          <View style={styles.lines} />
          <CardDetail text='CARD DETAIL \n haloo smua. love you mahuni mahuni mahuni. mahuni paling bau tapi.'/>
          <CardDetail text='CARD DETAIL \n haloo smua'/>
        </ScrollView>
        <Keyboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  lines: {
    height: 5,
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 0.2,
    borderColor: "#979797",
  },
});

export default CardDetailScreen;
