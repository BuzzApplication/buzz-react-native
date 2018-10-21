import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { OpenSansLightText, OpenSansText, OpenSansBoldText } from '../components/StyledText';


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    paddingLeft: 30,
    paddingRight: 30,
  },
  text: {
    fontFamily: 'open-sans-light',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingLeft: 30,
    paddingRight: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
  buzzImage: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '-50%',
    width: 231,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.paleTurquoise,
    flexDirection: 'row',
    zIndex: 1,
  },
  buzzText: {
    fontSize: 26,
  },
});

const slides = [
  {
    key: 'community',
    title: 'Community',
    text: 'Share your buzz only with people who work at your company or with everyone else from other companies',
    image: require('../assets/images/cityscape.png'),
    imageStyle: styles.image,
    colors: ['#a8e063', '#02aab0'],
  },
  {
    key: 'anonymous',
    title: 'Anonymous',
    text: 'Express yourself freely without having to worry about people knowing your identity',
    image: require('../assets/images/shield.png'),
    imageStyle: styles.image,
    colors: ['#004e92', '#243b55'],
  },
  {
    key: 'etiquette',
    title: 'Etiquette',
    text: 'Be respectful and mindful of others. Help maintain your community\'s health by reporting bad content',
    image: require('../assets/images/heart.png'),
    imageStyle: styles.image,
    colors: ['#cc2b5e', '#753a88'],
  },
  {
    key: 'done',
    title: 'start Buzz',
    image: require('../assets/images/rocket.png'),
    imageStyle: styles.buzzImage,
    colors: [colors.skyBlue, colors.turquoise],
  }
];

export class WelcomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
    {this._renderHelper(props)}
    </LinearGradient>
  );

  _renderHelper(props) {
    if (props.key === 'done') {
      return (
        <View style={{alignItems: 'center'}}>
          <Image source={props.image} style={props.imageStyle} />
          <TouchableOpacity activeOpacity={0.5} style={[baseStyles.buttonShadow, styles.buttonContainer]} onPress={()=>{this.props.navigation.navigate('Main')}} >
            <View style={{flexDirection: 'row'}}>
              <OpenSansText style={styles.buzzText}>start </OpenSansText>
              <OpenSansBoldText style={styles.buzzText}>Buzz</OpenSansBoldText>
            </View>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Image source={props.image} style={props.imageStyle} />
          <View style={{paddingTop: 20}}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.text}</Text>
          </View>
        </View>
      )
    }
  };

  render() {
    return (
      <AppIntroSlider
      slides={slides}
      renderItem={this._renderItem}
      hideDoneButton
      />
    );
  }

}

export default WelcomeScreen;
