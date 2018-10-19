import React from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

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
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 20
    };
    return (
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
        <View style={styles.container}>
          <View style={styles.title}>
            <OpenSansText style={styles.titleText}>Hey there!</OpenSansText>
          </View>
          <View style={styles.subtitle}>
            <OpenSansLightText style={styles.substitleText}>Everything you say in</OpenSansLightText>
            <View style={{flexDirection: 'row'}}>
              <OpenSansBoldText style={styles.substitleText}>Buzz</OpenSansBoldText>
              <OpenSansLightText style={styles.substitleText}> will be</OpenSansLightText>
            </View>
            <OpenSansLightText style={styles.substitleText}>anonymous</OpenSansLightText>
            <View style={{flexDirection: 'row', paddingTop: 30,}}>
              <OpenSansLightText style={styles.substitleText}>We promise!!</OpenSansLightText>
              <Image source={require('../assets/images/promise.png')} style={styles.substitleImage} />
            </View>
          </View>
          <View style={styles.getStartedContainer}>
            <OpenSansText style={styles.getStartedText}>Swipe right to get started</OpenSansText>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/anonymous.png')} style={styles.image} />
          </View>
        </View>
      </GestureRecognizer>
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
    fontSize: 35,
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
  getStartedContainer: {
  },
  getStartedText: {
    fontSize: 16,
    color: 'white',
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
