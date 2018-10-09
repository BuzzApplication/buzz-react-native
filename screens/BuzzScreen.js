import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , TextInput } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import TextBarInput from '../components/TextBarInput';
import CloseButton from '../components/CloseButton';
import BuzzButton from '../components/BuzzButton';
import Card from '../components/Card';
import CardDetail from '../components/CardDetail';


export class BuzzScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    headerLeft: <MaterialCommunityIcons name="window-close" size={30} color={colors.appleBlue} style={styles.headerLeft} onPress={() => navigation.goBack()} />,
    headerRight: (
      <Button title="Buzz" color={colors.appleBlue} style={styles.headerRight} onPress={() => navigation.goBack()} />
    ),
    tabBarVisible: false,
  });
  state = {text: ''};
  render() {
    return (
      <View style={styles.screenContainer}>
        <TextInput
          placeholder={'What\'s Buzzing?'}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          style={styles.textInput}
          multiline={true}
          numberOfLines={2}
          maxLength={50}
          enablesReturnKeyAutomatically={true}
        />
        <TextBarInput />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    left: 5,
    alignItems: 'center',
  },
  headerRight: {
    right: 55,
    alignItems: 'center',
  },
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    padding: 20,
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default BuzzScreen;
