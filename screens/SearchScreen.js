import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import { colors } from '../constants/Colors';

import StatusBarHeader from '../components/StatusBarHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import Card from '../components/Card';

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
          <BuzzPlusButton />
        <View style={styles.trendingHeader}>
          <Image source={require('../assets/images/fire.png')} style={styles.trendingImage} />
          <OpenSansBoldText style={styles.trendingText}>Trending Buzz</OpenSansBoldText>
        </View>
        <FlatList
          style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          data={[
            {key: 'CARD DETAIL \n haloo smua. love you mahuni mahuni mahuni. mahuni paling bau tapi.', type: 'MAIN'},
            {key: 'Brp sih gaji di Gojek?', type: 'COMMENT'},
            {key: 'Ini app apa ya?', type: 'COMMENT'},
            {key: 'Keren jg nih... \n haloo smua', type: 'COMMENT'},
          ]}
          renderItem={({ item, index }) => (
            <Card text={item.key} />
          )}
        />
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
});

export default SearchScreen;
