import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import StatusBarHeader from '../components/StatusBarHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';

import { OpenSansBoldText } from '../components/StyledText'

import { getTrendingBuzz } from "../api/buzz.js";


class SearchScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  };

  constructor(props) {
    super(props);
    this.state = {
      buzzList: [],
      isFetching: false,
    }

    this._getTrendingBuzz = this._getTrendingBuzz.bind(this);
  }

  componentDidMount() {
    this._getTrendingBuzz();
  }

  _getTrendingBuzz() {
    this.setState({ isFetching: true });
    getTrendingBuzz().then((response) => {
        this.setState({
          buzzList: response,
          isFetching: false,
        });
      });
  }

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
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          onRefresh={() => this._getTrendingBuzz()}
          refreshing={this.state.isFetching}
          data={this.state.buzzList}
          keyExtractor={(item) => {item.id}}
          renderItem={(item) => (
              <CardTrending data={item} navigation={this.props.navigation} style={baseStyles.bottomBorder}/>
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
