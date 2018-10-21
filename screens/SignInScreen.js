import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, Text, KeyboardAvoidingView, Animated, Keyboard, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';


import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'

class SignInScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
    this.signContainerHeight = new Animated.Value(-200);
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
  };

  keyboardWillHide = (event) => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      }),
      Animated.timing(this.signContainerHeight, {
        duration: event.duration,
        toValue: -200,
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
  };

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
                <TextInput style={styles.textInput} placeholder='email'/>
              </View>

            </View>
            <View style={styles.textContainer}>
              <View style={styles.textBorderContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name='lock' size={30} style={styles.icon}/>
                </View>
                <TextInput style={styles.textInput} placeholder='password'/>
              </View>
            </View>

            <View>
              <OpenSansLightText style={styles.forgotPasswordText}>Forgot password</OpenSansLightText>
            </View>
            <Animated.View style={{opacity: this.newUserOpacity}}>
              <Button title="I'm new!" color='white' onPress={() => this.props.navigation.navigate('SignUpDescription')}/>
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
  newUserText: {
    fontSize: 20,
    paddingTop: 10,
    color: 'white',
    textAlign: 'center',
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
