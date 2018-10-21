import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import ProfileHeader from '../components/ProfileHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <ProfileHeader navigation={navigation} />
  });
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="interactive" backgroundColor={colors.skyBlue}>
        <View style={styles.container}>
          <View style={styles.headerExtension} />

          // Profile Image
          <View style={styles.profileImageSection}>
            <View style={styles.profileImageContainer}>
              <Image source={require('../assets/images/anonymous.png')} style={styles.profileImage} />
            </View>
          </View>

          // Alias
          <View style={styles.aliasSection}>
            <View style={styles.aliasName}>
              <OpenSansText style={styles.aliasNameText}>mahun</OpenSansText>
            </View>
            <View style={styles.aliasLegend}>
              <OpenSansLightItalicText style={styles.aliasLegendText}>alias</OpenSansLightItalicText>
            </View>
          </View>

          // Community
          <View style={styles.communitySection}>
            <View style={styles.communityContainer}>
              <View style={styles.communityLegendContainer}>
                <View style={styles.communityImageContainer}>
                  <Image source={require('../assets/images/location.png')} style={styles.communityImage} />
                </View>
                <OpenSansBoldText style={styles.communityLegendText}>My Communities</OpenSansBoldText>
                <TouchableOpacity style={[styles.communityAddButton, baseStyles.button]} onPress={()=>{this.props.navigation.navigate('SignUpEmail')}}>
                  <Entypo name="plus" size={25} color='black' />
                </TouchableOpacity>
              </View>

              <View style={styles.communityGroupContainer}>
                <View style={styles.communityCardContainer}>
                  <View style={styles.communityCard}>
                    <OpenSansText style={styles.communityText}>Bank Mandiri</OpenSansText>
                  </View>
                </View>
                <View style={styles.communityCardContainer}>
                  <View style={styles.communityCard}>
                    <OpenSansText style={styles.communityText}>Universitas Indonesia</OpenSansText>
                  </View>
                </View>
              </View>

            </View>
          </View>

          // Cards
          <View style={styles.cardsSection}>
            <View style={styles.cardSection}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Favorite')}}>
                <View style={[{backgroundColor: colors.yellow}, styles.cardContainer]}>
                  <View style={styles.cardImageContainer}>
                    <Image source={require('../assets/images/favorite.png')} style={styles.cardImage} />
                  </View>
                  <OpenSansText style={styles.cardText}>Favorite Buzz</OpenSansText>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardSection}>
              <View style={[{backgroundColor: colors.pink}, styles.cardContainer]}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Posted')}}>
                  <View style={styles.cardImageContainer}>
                    <Image source={require('../assets/images/pencil.png')} style={styles.cardImage} />
                  </View>
                  <OpenSansText style={styles.cardText}>Posted Buzz</OpenSansText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.lightBlue,
    borderWidth: 0,
    backgroundColor: colors.lightBlue,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.5,
  },
  headerExtension: {
    backgroundColor: colors.skyBlue,
    height: 50,
    flexDirection: 'column',
  },
  profileImageSection: {
    alignItems: 'center',
    top: -42,
    height: 50,
  },
  profileImageContainer: {
    backgroundColor: 'white',
    height: 84,
    width: 84,
    borderRadius: 42,
    padding: 10,
    borderWidth: 5,
    borderColor: colors.lightBlue,
    alignItems: 'center',
  },
  profileImage: {
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  aliasSection: {
    flexDirection: 'column',
    top: -5,
  },
  aliasName: {
    alignItems: 'center',
  },
  aliasNameText: {
    fontSize: 20,
    textAlign: 'center',
  },
  aliasLegend: {
    alignItems: 'center',
  },
  aliasLegendText: {
    fontSize: 12,
    textAlign: 'center',
  },
  communitySection: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  communityContainer: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  communityLegendContainer: {
    flexDirection: 'row',
  },
  communityImageContainer: {
    flex: 1,
    padding: 10,
    paddingRight: 0,
    alignItems: 'center',
  },
  communityImage: {
    height: 25,
    width: 25,
  },
  communityLegendText: {
    flex: 10,
    padding: 10,
    fontSize: 16,
    alignItems: 'center',
  },
  communityAddButton: {
    flex: 1,
    padding: 5,
  },
  communityGroupContainer: {
    padding: 5,
  },
  communityCardContainer: {
    padding: 5,
  },
  communityCard: {
    flexDirection: 'row',
    borderRadius: 5,
    // backgroundColor: colors.lightBlue,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
  },
  communityText: {
  },
  cardsSection: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardSection: {
    flex: 2,
    paddingLeft: 15,
    paddingRight: 15,
  },
  cardContainer: {
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
  },
  cardImageContainer: {
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    height: 45,
    width: 45,
  },
  cardText: {
    textAlign: 'center',
  },
});

export default ProfileScreen;
