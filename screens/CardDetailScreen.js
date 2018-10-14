import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , Share, FlatList} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';


import Card from '../components/Card';
import CommentCard from '../components/CommentCard';
import Keyboard from '../components/Keyboard';

export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    title: 'Buzz',
    headerTintColor: colors.skyBlue,
    headerLeft: <HeaderBackButton tintColor={colors.skyBlue} onPress={() => navigation.goBack()} />,
    headerRight: (
      <MenuProvider style={styles.menuProviderContainer}>
        <Menu onSelect={value => alert(`Selected number: ${value}`)}>
          <MenuTrigger>
            <MaterialCommunityIcons name="dots-horizontal" size={25} color={colors.skyBlue} />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptionsContainer}>
            <MenuOption style={styles.menuOption} value={'report'} text='Report this post' />
          </MenuOptions>
        </Menu>
      </MenuProvider>
    )
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
            item.type == 'MAIN' ? <Card text={item.key} /> : <CommentCard text={item.key} />
          )}
        />
        <Keyboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuProviderContainer: {
    justifyContent: 'center',
    paddingLeft: 100,
    right: 10,
  },
  menuOptionsContainer: {
    backgroundColor: 'white',
  },
  menuOption: {
    padding: 10,
  },
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
