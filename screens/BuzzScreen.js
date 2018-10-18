import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { OpenSansLightText } from '../components/StyledText';
import CloseButton from '../components/CloseButton';
import BuzzButton from '../components/BuzzButton';
import Card from '../components/Card';
import BuzzHeader from '../components/BuzzHeader';


export class BuzzScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    header: <BuzzHeader navigation={navigation} />
  });

  constructor() {
   super();
   this.state = {
      toggled: true,
   }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switchButton}
            onValueChange={(value) => this.setState({ toggled: value })}
            value={ this.state.toggled } />
          <OpenSansLightText style={styles.switchText}>Post with alias</OpenSansLightText>
        </View>
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
