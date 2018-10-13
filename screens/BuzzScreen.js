import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import CloseButton from '../components/CloseButton';
import BuzzButton from '../components/BuzzButton';
import Card from '../components/Card';
import CardDetail from '../components/CardDetail';


export class BuzzScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    headerLeft: (
      <View style={styles.headerLeft} >
        <MaterialCommunityIcons name="window-close" size={25} color={colors.paleSalmon} onPress={() => navigation.goBack()} />
      </View>
    ),
    headerRight: (
      <View style={styles.headerRight}>
        <Button title="Buzz" color='white' onPress={() => navigation.goBack()} />
      </View>
    ),
    // tabBarVisible: false,
  });
  state = {text: '', destination: 'everyone'};
  render() {
    return (
      <View style={styles.screenContainer}>
        <ModalDropdown
          style={styles.modal}
          textStyle={styles.modalText}
          dropdownStyle={styles.dropdownModal}
          dropdownTextStyle={styles.dropdownModalText}
          showsVerticalScrollIndicator={false}
          options={['Everyone', 'Bank Mandiri', '']}/>
        <TextInput
          placeholder={'What\'s Buzzing?'}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          style={styles.textInput}
          multiline={true}
          // only for android
          // numberOfLines={2}
          maxLength={150}
          enablesReturnKeyAutomatically={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeft: {
    left: 10,
    alignItems: 'center',
  },
  headerRight: {
    right: 10,
    alignItems: 'center',
    backgroundColor: colors.paleSalmon,
    borderRadius: 20,
    paddingRight: 7,
    paddingLeft: 7,
  },
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    padding: 20,
    borderBottomWidth: 0.5
  },
  dropdownModal: {
    padding: 10,
  },
  dropdownModalText: {
    fontSize: 14,
    fontFamily: 'open-sans-light-italic'
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'open-sans-light-italic'
  },
  textInput: {
    fontFamily: 'open-sans',
    flexDirection: 'column',
    flex: 1,
    fontSize: 18,
    padding: 20,
  },
});

export default BuzzScreen;
