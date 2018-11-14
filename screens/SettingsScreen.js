import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, Linking } from 'react-native';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import SettingsHeader from '../components/SettingsHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'

import { removeToken } from '../api/tokenHelper';


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: '',
    }
  }

  static navigationOptions = ({navigation}) => ({
    header: <SettingsHeader navigation={navigation} />
  });

  componentDidMount() {

  }

  _signOut() {
    removeToken().then(() => {
      this.props.navigation.navigate('Registration');
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={[styles.settings, baseStyles.bottomBorder]}>
          <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('Profile')}}>
            <OpenSansText>
              Push Notifications
            </OpenSansText>
          </TouchableOpacity>
        </View>

        <View style={[styles.settings, baseStyles.bottomBorder]}>
          <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('Profile')}}>
            <OpenSansText>
              FAQ
            </OpenSansText>
          </TouchableOpacity>
        </View>

        <View style={[styles.settings, baseStyles.bottomBorder]}>
          <TouchableOpacity style={baseStyles.button} onPress={() => this.props.navigation.navigate('Feedback')} >
            <OpenSansText>
              Send Feedback
            </OpenSansText>
          </TouchableOpacity>
        </View>

        <View style={[styles.settings, baseStyles.bottomBorder]}>
          <TouchableOpacity style={baseStyles.button} onPress={() => this._signOut()}>
            <OpenSansText>
              Sign Out
            </OpenSansText>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.skyBlue,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    padding: 10,
    width: '100%',
    // backgroundColor: "blue",

  },
  settings: {

  },
  favoriteImage: {
    height: 13,
    width: 13,
  },
});

export default SettingsScreen;
