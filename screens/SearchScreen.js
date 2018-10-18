import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import { colors } from '../constants/Colors';

import StatusBarHeader from '../components/StatusBarHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';

import { OpenSansBoldText } from '../components/StyledText'

class SearchScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          containerStyle={styles.searchContainer}
          inputStyle={styles.inputSearchContainer}
          placeholder='Search Buzz...' />
        <View style={styles.trendingHeader}>
          <Image source={require('../assets/images/fire.png')} style={styles.trendingImage} />
          <OpenSansBoldText style={styles.trendingText}>Trending Buzz</OpenSansBoldText>
        </View>
        <FlatList
          style={{backgroundColor:colors.lightBlue}}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          data={[
            {key: 'haloo smua. love you mahuni mahuni mahuni. mahuni paling bau tapi.'},
            {key: 'Brp sih gaji di Gojek?'},
            {key: 'Ini app apa ya?'},
            {key: 'Keren jg nih... haloo smua'},
          ]}
          renderItem={({ item, index }) => (
            <View style={styles.cardCompactContainer}>
              <View style={styles.cardCompactRoundedContainer}>
                <CardTrending text={item.key} navigation={this.props.navigation}/>
              </View>
            </View>
          )}
        />
        <BuzzPlusButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.skyBlue,
    borderWidth: 0,
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: colors.skyBlue,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputSearchContainer: {
    backgroundColor: 'white',
    fontSize: 14,
  },
  trendingHeader: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.lightBlue,
  },
  trendingImage: {
    width: 22,
    height: 22,
  },
  trendingText: {
    paddingLeft: 5,
  },
  cardCompactContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  cardCompactRoundedContainer: {
    borderRadius: 15,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowColor: colors.grey,
    shadowOpacity: 0.5,
  },
});

export default SearchScreen;
