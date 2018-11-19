import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch, TouchableOpacity, Image } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { OpenSansBoldText } from '../components/StyledText';
import CloseButton from '../components/CloseButton';
import BuzzButton from '../components/BuzzButton';
import Card from '../components/Card';
import BuzzHeader from '../components/BuzzHeader';

import { getUserEmail } from "../api/user.js";
import { postBuzz } from "../api/buzz.js";


export class BuzzScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <BuzzHeader navigation={navigation}/>
  });

  constructor(props) {
    super(props);
    this.state = {

    };
  };

  componentDidMount() {
    getUserEmail().then((response) => {
      this.props.navigation.setParams({
        userEmails: response.userEmails,
        text: '',
        anonymous: false,
        polls: [],
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

  _addPoll() {
    this.props.navigation.setParams({
      polls: ['', ''],
    });
  }

  _addMorePoll() {
    this.props.navigation.setParams({
      polls: [...this.props.navigation.getParam('polls'), ''],
    });
  }

  _removePollByIndex(index) {
    const newPolls = this.props.navigation.getParam('polls').filter((_, i) => i !== index);
    this.props.navigation.setParams({
      polls: newPolls,
    });
  }

  _removeAllPoll() {
    this.props.navigation.setParams({
      polls: [],
    });
  }

  _onChangePollText(text, index) {
    let newPolls = this.props.navigation.getParam('polls').map((pollText, pollIndex) => {
      return pollIndex === index ? text : pollText
    })
    this.props.navigation.setParams({
      polls: newPolls,
    });
  }

  _getPollPlaceholder(index) {
    const printIndex = index + 1;
    return index > 1 ? 'Choice ' + printIndex + ' (Optional)': 'Choice ' + printIndex;
  }

  _getPollAction(index, length) {
    if (index === 0 && length === 2) {
      return (
        <View style={styles.removePoll}>
          <MaterialCommunityIcons
            name="window-close"
            size={18}
            color='black'
            onPress={() => this._removeAllPoll()} />
        </View>
      )
    } else if (index === length - 1 && length < 4) {
      return (
        <View style={styles.removePoll}>
          <Feather
            name="plus"
            size={18}
            color='black'
            onPress={() => this._addMorePoll()} />
        </View>
      )
    } else {
      return (
        <View style={styles.removePoll}>
          <MaterialCommunityIcons
            name="window-close"
            size={18}
            color='black'
            onPress={() => this._removePollByIndex(index)} />
        </View>
      )
    }
  }

  _getPolls() {
    const polls = this.props.navigation.getParam('polls');
    if (!polls || polls.length === 0) return null;

    return polls.map((text, index) => (
      <View style={styles.pollContainer}>
        <TextInput
          placeholder={this._getPollPlaceholder(index)}
          onChangeText={(text) => this._onChangePollText(text, index)}
          value={text}
          style={styles.pollText}
          autoCorrect={false}
          autoCapitalize='none'
          multiline={true}
          // only for android
          // numberOfLines={2}
          maxLength={25}
          enablesReturnKeyAutomatically={true}
        />
        {this._getPollAction(index, polls.length)}
      </View>
    )
  )}

  render() {
    const inputAccessoryViewID = "inputAccessoryViewID";

    return (
      <View style={styles.screenContainer}>
        <View style={styles.topContainer}>
          <View style={styles.anonymousContainer}>
            <Switch
              style={styles.switchButton}
              onValueChange={(value) => this._onChangeSwitch(value)}
              value={ !this.props.navigation.getParam('anonymous') } />
            <OpenSansBoldText style={styles.switchText}>Post With Alias</OpenSansBoldText>
          </View>
          <TouchableOpacity style={[styles.pollButton, baseStyles.button]} onPress={() => this._addPoll()} >
            <Image source={require('../assets/images/poll.png')} style={styles.pollButtonImage} />
          </TouchableOpacity>
        </View>
        {this._getPolls()}
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
  topContainer: {
    padding: 10,
    flexDirection: 'row',
  },
  anonymousContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButton: {
  },
  switchText: {
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.skyBlue,
  },
  pollButton: {
  },
  pollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pollText: {
    fontSize: 16,
  },
  removePoll: {
    justifyContent: 'flex-end',
    opacity: 0.2,
  },
  pollButtonImage: {
    width: 18,
    height: 18,
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
