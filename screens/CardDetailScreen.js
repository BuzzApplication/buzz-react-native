import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , Share, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import CardDetailHeader from '../components/CardDetailHeader';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';
import Keyboard from '../components/Keyboard';

export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    header: <CardDetailHeader navigation={navigation} />
    // tabBarVisible: false,
  })
  render() {
    return (
      <View style={styles.screenContainer}>
        <FlatList
          style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          data={[
            {key: 'CARD DETAIL \n haloo smua. love you mahuni mahuni mahuni. mahuni paling bau tapi.', type: 'MAIN'},
            {key: 'Brp sih gaji di Gojek?', type: 'COMMENT'},
            {key: 'Ini app apa ya?', type: 'COMMENT'},
            {key: 'Keren jg nih... \n haloo smua', type: 'COMMENT'},
          ]}
          renderItem={({ item, index }) => (
            item.type == 'MAIN' ? (
              <View>
                <Card text={item.key} />
                <View style={[styles.lines, baseStyles.bottomBorder]} />
              </View>
            ) : <CommentCard text={item.key} />
          )}
        />
        <Keyboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: baseStyles.grey,
  },
  lines: {
    height:0.5,
    top:-0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

export default CardDetailScreen;
