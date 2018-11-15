import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { OpenSansLightText } from '../components/StyledText';
import CloseButton from '../components/CloseButton';
import BuzzButton from '../components/BuzzButton';
import Card from '../components/Card';
import BuzzHeader from '../components/BuzzHeader';

import { getUserEmail } from "../api/user.js";
import { postBuzz } from "../api/buzz.js";


export class BuzzScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <BuzzHeader navigation={navigation} refetch={navigation.state.params.refetch}/>
  });

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  };

  componentDidMount() {
    getUserEmail().then((response) => {
      this.props.navigation.setParams({
        userEmails: response.userEmails,
        text: '',
        anonymous: false,
      });
    });
  }

  _onChangeText(text) {
    this.props.navigation.setParams({
      text: text,
    });
  }

  _onChangeSwitch(postWithAlias) {
    this.props.navigation.setParams({
      anonymous: !postWithAlias,
    });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switchButton}
            onValueChange={(value) => this._onChangeSwitch(value)}
            value={ !this.props.navigation.getParam('anonymous') } />
          <OpenSansLightText style={styles.switchText}>Post with alias</OpenSansLightText>
        </View>
        <TextInput
          placeholder={'What\'s Buzzing?'}
          onChangeText={(text) => this._onChangeText(text)}
          value={this.props.navigation.getParam('text')}
          style={styles.textInput}
          autoCorrect={false}
          autoCapitalize='none'
          multiline={true}
          // only for android
          // numberOfLines={2}
          maxLength={150}
          enablesReturnKeyAutomatically={true}
        />
        <KeyboardSpacer topSpacing={-60} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  switchContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  switchButton: {
    // backgroundColor: 'yellow',
  },
  switchText: {
    // backgroundColor: 'blue',
    paddingLeft: 10,
    paddingRight: 10,
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
