import React from 'react';
import { StyleSheet, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import SignUpDescriptionHeader from '../components/SignUpDescriptionHeader';
import { OpenSansText, OpenSansLightText, OpenSansLightItalicText } from '../components/StyledText';


export class SignUpEmailVerificationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <SignUpDescriptionHeader navigation={navigation} />
    // tabBarVisible: false,
  })
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <OpenSansText style={styles.titleText}>Verification email sent!</OpenSansText>
          <OpenSansLightText style={styles.subtitleText}>Please enter the verification code or click on the link sent to your email</OpenSansLightText>
        </View>
        <View style={styles.textContainer}>
          <CodeInput
            ref="codeInputRef2"
            secureTextEntry
            keyboardType="numeric"
            compareWithCode='1234'
            codeLength={4}
            activeColor='white'
            inactiveColor='white'
            autoFocus={false}
            ignoreCase={true}
            inputPosition='center'
            size={55}
            onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
            containerStyle={{ marginTop: 30 }}
            codeInputStyle={{ borderWidth: 1.5, fontSize: 20 }}
            />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/sent.png')} style={styles.image} />
        </View>
      </View>
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
    paddingTop: 10,
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: -20,
  },
  image: {
    height: 400,
    width: 400,
  },
});

export default SignUpEmailVerificationScreen;
