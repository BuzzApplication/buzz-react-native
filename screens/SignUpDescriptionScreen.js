import React from 'react';
import { StyleSheet, View, Button, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';


import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import SignUpDescriptionHeader from '../components/SignUpDescriptionHeader';
import { OpenSansText, OpenSansLightText, OpenSansBoldText } from '../components/StyledText';


export class SignUpDescriptionScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <SignUpDescriptionHeader navigation={navigation} />
    // tabBarVisible: false,
  })

  constructor(props) {
      super(props);
    }

    onSwipeLeft(gestureState) {
      this.props.navigation.navigate('SignUpEmail')
    }

  render() {
    return (
      <LinearGradient style={styles.container} colors={[colors.skyBlue, colors.turquoise]}>
        <View style={styles.title}>
          <OpenSansLightText style={styles.titleText}>Hey there!</OpenSansLightText>
        </View>
        <View style={styles.subtitle}>
          <OpenSansLightText style={styles.substitleText}>Everything you say in</OpenSansLightText>
          <View style={{flexDirection: 'row'}}>
            <OpenSansBoldText style={styles.substitleText}>Buzz</OpenSansBoldText>
            <OpenSansLightText style={styles.substitleText}> will be</OpenSansLightText>
          </View>
          <OpenSansLightText style={styles.substitleText}>anonymous</OpenSansLightText>
          <View style={{flexDirection: 'row', paddingTop: 15,}}>
            <OpenSansLightText style={styles.substitleText}>We promise!!</OpenSansLightText>
            <Image source={require('../assets/images/promise.png')} style={styles.substitleImage} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity activeOpacity={0.8} style={[baseStyles.buttonShadow, styles.button]} onPress={()=>{this.props.navigation.navigate('SignUpEmail')}} >
            <OpenSansText style={styles.buttonText}>Get Started</OpenSansText>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/padlock.png')} style={styles.image} />
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
    height: '15%',
  },
  titleText: {
    fontSize: 28,
    color: 'white',
  },
  subtitle: {
    flexDirection: 'column',
  },
  substitleText: {
    fontSize: 24,
    color: 'white',
  },
  substitleImage: {
    height: 30,
    width: 30,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: 30,
    alignItems: 'flex-start',
    zIndex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 170,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.paleTurquoise,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 24,
  },
  imageContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    bottom: 0,
    right: 0,
  },
  image: {
    height: 220,
    width: 220,
  },
});

export default SignUpDescriptionScreen;
