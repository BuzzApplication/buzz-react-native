import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, Text, Animated, Keyboard, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import { authenticate } from '../api/authentication';
import { storeToken } from '../api/tokenHelper';

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'

class SignInScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      email: 'tsjahja@buzz.com',
      password: '12345',
      newUserButtonDisabled: false,
    }

    this.keyboardHeight = new Animated.Value(0);
    this.signContainerHeight = new Animated.Value(-150);
    this.tagLineOpacity = new Animated.Value(1);
    this.newUserOpacity = new Animated.Value(1);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      }),
      Animated.timing(this.signContainerHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.tagLineOpacity, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.newUserOpacity, {
        duration: event.duration,
        toValue: 0,
      }),
    ]).start();
    this.setState({newUserButtonDisabled: true});
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.signContainerHeight, {
        duration: event.duration,
        toValue: -150,
      }),
      Animated.timing(this.tagLineOpacity, {
        duration: event.duration,
        toValue: 1,
      }),
      Animated.timing(this.newUserOpacity, {
        duration: event.duration,
        toValue: 1,
      }),
    ]).start();
    this.setState({newUserButtonDisabled: false});
  };

  _signIn() {
    authenticate(this.state.email, this.state.password)
      .then((responseJson) => {
        storeToken(responseJson.token);
        this.props.navigation.navigate('Main');
      })
  }

  render() {
    return (
      <Animated.View style={[styles.container, { paddingBottom: this.keyboardHeight }]}>
        <Image source={require('../assets/images/home.jpg')}
          style={styles.backgroundImage}
          resizeMode='cover'/>
        <Text style={styles.buzz}>Buzz</Text>
        <View style={styles.tagLine}>
          <Animated.View style={{opacity: this.tagLineOpacity}}>
            <OpenSansText style={styles.tagLineText}>express yourself</OpenSansText>
          </Animated.View>
          <Animated.View style={{opacity: this.tagLineOpacity}}>
            <OpenSansText style={styles.tagLineText}>anonymously</OpenSansText>
          </Animated.View>
          <Animated.View style={{opacity: this.tagLineOpacity}}>
            <OpenSansText style={styles.tagLineText}>in your community</OpenSansText>
          </Animated.View>
        </View>
          <Animated.View style={[styles.signInContainer, {bottom: this.signContainerHeight}]}>
            <View style={styles.textContainer}>
              <View style={styles.textBorderContainer}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name='mail' size={30} style={styles.icon}/>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder='email'
                  onChangeText={text => {
                    this.setState({email: text});
                  }}
                  value={this.state.email} />
              </View>
            </View>

            <View style={styles.textContainer}>
              <View style={styles.textBorderContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name='lock' size={30} style={styles.icon}/>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder='password'
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({password: text});
                  }}
                  value={this.state.password} />
              </View>
            </View>

            <View>
              <OpenSansLightText style={styles.forgotPasswordText}>Forgot password</OpenSansLightText>
            </View>

            <View style={styles.textContainer}>
              <TouchableOpacity
                style={styles.signInButtonContainer}
                activeOpacity={0.8}
                disabled={this.state.email == '' || this.state.password == ''}
                onPress={() => this._signIn()} >
                <OpenSansText style={{fontSize: 18, color: 'white'}}>Sign in</OpenSansText>
              </TouchableOpacity>
            </View>
            <Animated.View style={{opacity: this.newUserOpacity}}>

              <View style={styles.signUpContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={this.state.newUserButtonDisabled}
                  onPress={() => { this.props.navigation.navigate('SignUpDescription') }} >
                  <OpenSansLightText style={{fontSize: 16, color: 'white'}}>Sign up!</OpenSansLightText>
                </TouchableOpacity>
              </View>
            </Animated.View>
        </Animated.View>
      </Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.skyBlue,
  },
  backgroundImage: {
    position: 'absolute',
    opacity: 0.05,
    width: '100%',
    height: '100%',
  },
  buzz: {
    fontFamily: 'Bodoni 72',
    fontWeight: 'bold',
    color: 'white',
    top: '20%',
    left: '5%',
    fontSize: 80,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'right',
  },
  tagLine: {
    flexDirection: 'column',
    top: '20%',
    left: '5%',
  },
  tagLineText: {
    fontSize: 20,
    color: 'white',
  },
  signInContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  textContainer: {
    paddingTop: 15,
  },
  signUpContainer: {
    paddingTop: 15,
    alignItems: 'center',
  },
  textBorderContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0,
    opacity: 0.7,
    flexDirection: 'row',
  },
  signInButtonContainer: {
    padding: 10,
    backgroundColor: colors.darkBlue,
    opacity: 1,
    borderRadius: 10,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  textInput: {
    flex: 5,
    height: 30,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default SignInScreen;
