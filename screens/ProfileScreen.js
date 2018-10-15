import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import ProfileHeader from '../components/ProfileHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <ProfileHeader navigation={navigation} />
  });
  state = {username: ''};
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.profileContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={username => {
              this.setState({username});
            }}
            value={this.state.username}
            numberOfLines = {1}
            enablesReturnKeyAutomatically = {true}
          />
        </View>

        <View style={[styles.settings, baseStyles.bottomBorder]}>
          <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('Profile')}}>
            <OpenSansText>
              Favorite Buzz  <Image source={require('../assets/images/starred.png')} style={styles.favoriteImage} />
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
          <TouchableOpacity style={baseStyles.button} onPress={()=>{this.props.navigation.navigate('Profile')}}>
            <OpenSansText>
              Send Feedback
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

export default ProfileScreen;
