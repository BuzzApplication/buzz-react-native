import React from 'react';
import { StyleSheet, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import SignUpDescriptionHeader from '../components/SignUpDescriptionHeader';
import { OpenSansText, OpenSansLightText, OpenSansLightItalicText } from '../components/StyledText';


export class SignUpEmailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <SignUpDescriptionHeader navigation={navigation} />
    // tabBarVisible: false,
  })
  render() {
    return (
      <LinearGradient style={styles.container} colors={[colors.skyBlue, colors.turquoise]}>
        <View style={styles.title}>
          <OpenSansLightText style={styles.titleText}>Don't worry,</OpenSansLightText>
          <OpenSansLightText style={styles.titleText}>this is only for verification purposes.</OpenSansLightText>
        </View>
        <View style={styles.subtitle}>
          <OpenSansLightText>No one can trace what you post back to you</OpenSansLightText>
          <OpenSansLightItalicText>Including your company</OpenSansLightItalicText>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textBorderContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcons name='mail' size={30} style={styles.icon}/>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder='enter work email'
              onSubmitEditing={() => this.props.navigation.navigate('SignUpEmailVerification')}
              />
          </View>

        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/email.png')} style={styles.image} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: colors.skyBlue,
    paddingLeft: 25,
    paddingRight: 25,
  },
  title: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 24,
    color: 'white',
  },
  subtitle: {
    flexDirection: 'column',
    paddingTop: 10,
  },
  textContainer: {
    paddingTop: 30,
  },
  textBorderContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0,
    opacity: 0.7,
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    opacity: 0.7,
  },
  textInput: {
    flex: 5,
    height: 30,
  },
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: -20,
  },
  image: {
    height: 250,
    width: 250,
  },
});

export default SignUpEmailScreen;
