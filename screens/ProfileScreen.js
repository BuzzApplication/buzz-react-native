import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Entypo, EvilIcons, MaterialIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import ProfileHeader from '../components/ProfileHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';

import profileImageHelper from '../screens/profileImageHelper';

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'

import { getUserEmail, getUser, updateAlias } from '../api/user';
import { errorExist, getErrorDescription } from '../api/errorParser';

class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <ProfileHeader navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      companyNames: [],
      editAliasOverlay: false,
      alias: '',
      aliasExistError: '',
    }
  }

  componentDidMount() {
    this._getUserEmail();
    this._getUser();
  }

  _getUser() {
    getUser().then((response) => {
      this.setState({
        user: response,
        alias: response.alias,
        aliasExistError: '',
      });
      this.props.navigation.setParams({userId: response.id});
    })
  }

  _getUserEmail() {
    getUserEmail().then((response) => {
      const companyNames = response.userEmails.map((userEmail) => userEmail.company.name);
      this.setState({companyNames: companyNames});
    });
  };

  _getCommunities() {
    return this.state.companyNames.map((companyName, index) => {
      return (
        <View style={styles.communityCardContainer} key={index}>
          <View style={styles.communityCard}>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.props.navigation.navigate('Community')}}>
              <OpenSansText style={styles.communityText}>{companyName}</OpenSansText>
            </TouchableOpacity>
          </View>
        </View>
        // <View style={styles.communityCardContainer} key={index}>
        //   <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.props.navigation.navigate('Favorite')}}>
        //     <View style={styles.communityCard}>
        //       <OpenSansText style={styles.communityText}>{companyName}</OpenSansText>
        //     </View>
        //
        //   </TouchableOpacity>
        // </View>
      )
    });
  }

  _onChangeText(alias) {
    this.setState({
      alias: alias
    });
  }

  _updateAlias() {
    updateAlias(this.state.alias).then((response) => {
      if (!errorExist(response)) {
        this.setState({
          editAliasOverlay: false,
          alias: response.alias,
          user: response,
          aliasExistError: '',
        });
      } else {
        this.setState({
          aliasExistError: getErrorDescription(response),
        })
      }
    })
  }

  _getError() {
    if (this.state.aliasExistError !== '') {
      return (
        <View style={{alignItems: 'center'}}>
          <OpenSansText style={{color: 'red'}}>{this.state.aliasExistError}</OpenSansText>
        </View>
      )
    }
  }

  render() {
    let profileImage = '';
    if (this.state.user === undefined) {
      profileImage = require('../assets/images/profile/egg.png');
    } else {
      profileImage = profileImageHelper[this.state.user.id % 50];
    }

    return (
      <View>
        {this.state.editAliasOverlay &&
          (<View style={styles.editAliasOverlay}>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <TouchableOpacity style={baseStyles.button} onPress={()=>{this.setState({editAliasOverlay: false})}}>
                <EvilIcons name="close" size={25} color='black' />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.editAliasDescription}>
                <OpenSansText style={styles.editAliasDescriptionText}> Changing your alias will not change the alias displayed on previously posted Buzz and comments.
                However, you can still view them on your profile page.</OpenSansText>
                <OpenSansLightText style={styles.editAliasDescriptionText}>Please refrain from using profanity.</OpenSansLightText>
              </View>
              {this._getError()}
              <View style={styles.editAliasTextInputContainer}>
                <TextInput
                  onChangeText={(alias) => this._onChangeText(alias)}
                  value={this.state.alias}
                  enablesReturnKeyAutomatically={true}
                  style={styles.editAliasTextInput}
                  onSubmitEditing={(alias) => this._updateAlias()}
                />
              </View>
            </View>
          </View>)
        }

        <ScrollView showsVerticalScrollIndicator={false} keyboardDismissMode="interactive" backgroundColor={colors.skyBlue}>
          <View style={styles.container}>
            <View style={styles.headerExtension} />

            // Profile Image
            <View style={styles.profileImageSection}>
              <View style={styles.profileImageContainer}>
                <Image source={profileImage} style={styles.profileImage} />
              </View>
            </View>

            // Alias
            <View style={styles.aliasSection}>
              <View style={styles.aliasName}>
                <OpenSansText style={styles.aliasNameText}>{this.state.user.alias}</OpenSansText>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={baseStyles.button}
                  onPress={() => this.setState({editAliasOverlay: true})} >
                  <MaterialIcons color={colors.skyBlue} name="edit" size={14} />
                </TouchableOpacity>
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
                </View>

                <View style={styles.communityGroupContainer}>
                  {this._getCommunities()}
                </View>

              </View>
            </View>

            // Cards
            <View style={styles.cardsSection}>
              <View style={styles.cardSection}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.props.navigation.navigate('Favorite')}}>
                  <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                      <Image source={require('../assets/images/favorite.png')} style={styles.cardImage} />
                    </View>
                    <OpenSansText style={styles.cardText}>Favorite Buzz</OpenSansText>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.cardSection}>
                <View style={styles.cardContainer}>
                  <TouchableOpacity activeOpacity={0.7} onPress={()=>{this.props.navigation.navigate('Posted')}}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 0,
    backgroundColor: 'white',
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
  editAliasOverlay: {
    position: "absolute",
    backgroundColor: 'white',
    left: '10%',
    right: '10%',
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    flexDirection: 'column',
  },
  editAliasDescription: {
    padding: 10,
    paddingTop: 0,
  },
  editAliasDescriptionText: {
    fontSize: 16,
    color: 'black',
    paddingTop: 20,
    textAlign: 'center',
  },
  editAliasTextInputContainer: {
    padding: 20,
  },
  editAliasTextInput: {
    fontSize: 20,
    alignItems: 'center',
    paddingLeft: '15%',
    paddingRight: '15%',
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    borderWidth: 0,
    padding: 5,
    textAlign: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
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
    // padding: 10,
    borderWidth: 5,
    borderColor: 'white',
    alignItems: 'center',
  },
  profileImage: {
    height: 74,
    width: 74,
    // borderRadius: 32,
  },
  aliasSection: {
    flexDirection: 'column',
    top: -5,
  },
  aliasName: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 16,
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
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  communityContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
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
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
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
