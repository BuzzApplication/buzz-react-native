import React from 'react';
import { StyleSheet, View, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import SignUpDescriptionHeader from '../components/SignUpDescriptionHeader';
import { OpenSansText, OpenSansLightText, OpenSansLightItalicText } from '../components/StyledText';

import { signUp } from '../api/authentication';

export class SignUpPasswordScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <SignUpDescriptionHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  componentDidMount() {
    this.setState({
      email: this.props.navigation.getParam('email')
    });
  }

  _submitPassword() {
    if (this.state.password !== '' && this.state.passwordConfirmation !== '' &&
      this.state.password === this.state.passwordConfirmation) {
        console.log("email: ", this.state.email)
        console.log("password: ", this.state.password)
        console.log("passwordConfirmation: ", this.state.passwordConfirmation)
        signUp(this.state.email, this.state.passwordConfirmation).then((response) => {
          this.props.navigation.navigate('SignUpEmailVerification',
            {'email': this.state.email,
             'password': this.state.password})
        })
      }
  }

  render() {
    return (
      <LinearGradient style={styles.container} colors={[colors.skyBlue, colors.turquoise]}>
        <View style={styles.title}>
          <OpenSansLightText style={styles.titleText}>Create a Password</OpenSansLightText>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textBorderContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name='lock' size={30} style={styles.icon}/>
            </View>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder='Create a password'
              enablesReturnKeyAutomatically={true}
              onChangeText={(password) => this.setState({'password': password})}
              value={this.props.navigation.getParam('password')}
              onSubmitEditing={() => this._submitPassword()}
              />
          </View>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textBorderContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name='lock' size={30} style={styles.icon}/>
            </View>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder='Re-enter password'
              enablesReturnKeyAutomatically={true}
              onChangeText={(password) => this.setState({'passwordConfirmation': password})}
              value={this.props.navigation.getParam('passwordConfirmation')}
              onSubmitEditing={() => this._submitPassword()}
              />
          </View>
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/key.png')} style={styles.image} />
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

export default SignUpPasswordScreen;
