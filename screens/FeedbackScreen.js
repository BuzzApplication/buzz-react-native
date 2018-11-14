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
import FeedbackHeader from '../components/FeedbackHeader';

import { getUserEmail } from "../api/user.js";
import { postBuzz } from "../api/buzz.js";


export class FeedbackScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <FeedbackHeader navigation={navigation} />
  });

  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.navigation.setParams({
      text: '',
    });
  }

  _onChangeText(text) {
    this.props.navigation.setParams({
      text: text,
    });
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <TextInput
          placeholder={'Briefly explain what you love or what could be improved'}
          onChangeText={(text) => this._onChangeText(text)}
          value={this.props.navigation.getParam('text')}
          style={styles.textInput}
          autoCorrect={false}
          autoCapitalize={false}
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

export default FeedbackScreen;
