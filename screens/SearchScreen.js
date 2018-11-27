import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import _ from 'lodash';

import { colors } from '../constants/Colors';
import baseStyles from '../constants/Styles';

import StatusBarHeader from '../components/StatusBarHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';
import EmptySearch from '../components/EmptySearch';

import { OpenSansBoldText } from '../components/StyledText'

import { getTrendingBuzz, getSearchedBuzz, likeBuzz, favoriteBuzz, submitPoll } from "../api/buzz.js";


class SearchScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  };

  constructor(props) {
    super(props);
    this.state = {
      trendingBuzzList: [],
      isFetching: false,
      searchMode: false,
      searchedBuzzList: [],
      searchedText: '',
      startPagination: 0,
    };
    this.timeout =  0;

    this._getTrendingBuzz = this._getTrendingBuzz.bind(this);
    this._getSearchedBuzz = this._getSearchedBuzz.bind(this);
    this._loadMoreSearchedBuzz = this._loadMoreSearchedBuzz.bind(this);
    this._likeBuzz = this._likeBuzz.bind(this);
    this._favoriteBuzz = this._favoriteBuzz.bind(this);
    this._pollBuzz = this._pollBuzz.bind(this);
    this._updateBuzz = this._updateBuzz.bind(this);
    this._getTrendingOrSearchedBuzz = this._getTrendingOrSearchedBuzz.bind(this);
  }

  componentDidMount() {
    this._getTrendingBuzz();
  }

  _getTrendingBuzz() {
    this.setState({ isFetching: true });
    getTrendingBuzz().then((response) => {
        this.setState({
          trendingBuzzList: response,
          isFetching: false,
          searchMode: false,
          searchedText: '',
        });
      });
  }

  _getSearchedBuzz(text) {
    if (text === '') {
      this.setState({
        searchMode: false,
      });
    } else {
      this.setState({
        searchMode: true,
      });
      if(this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
          getSearchedBuzz(text).then((response) => {
              this.setState({
                  searchedText: text,
                  searchedBuzzList: response,
                  startPagination: 10,
              });
          });
      }, 300);
    }
  }

  _loadMoreSearchedBuzz() {
    getSearchedBuzz(this.state.searchedText, this.state.startPagination).then((response) => {
      if (response.length > 0) {
        this.setState({
          searchedBuzzList: [...this.state.searchedBuzzList, ...response],
          startPagination: this.state.startPagination + 10,
        });
      }
    });
  }

  _likeBuzz(buzzId, liked) {
    likeBuzz(buzzId, !liked).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _favoriteBuzz(buzzId, favorited) {
    favoriteBuzz(buzzId, !favorited).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _pollBuzz(pollId) {
    submitPoll(pollId).then((response) => {
      this._updateBuzz(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _updateBuzz(updatedBuzz) {
    const trendingBuzzList = this.state.trendingBuzzList;
    const updatedTrendingBuzzList = _.map(trendingBuzzList, function(buzz, index) {
      return buzz.id === updatedBuzz.id ? updatedBuzz : buzz;
    });
    const searchedBuzzList = this.state.searchedBuzzList;
    const updatedSearchedBuzzList = _.map(searchedBuzzList, function(buzz, index) {
      return buzz.id === updatedBuzz.id ? updatedBuzz : buzz;
    });

    this.setState({
      trendingBuzzList: updatedTrendingBuzzList,
      searchedBuzzList: updatedSearchedBuzzList,
    });
  }

  _getTrendingOrSearchedBuzz() {
    if (this.state.searchMode) {
      if (this.state.searchedBuzzList.length > 0) {
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            data={this.state.searchedBuzzList}
            onEndReached={({ distanceFromEnd }) => {
              this._loadMoreSearchedBuzz();
            }}
            onEndReachedThreshold={1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => (
              <CardTrending
                data={item}
                navigation={this.props.navigation}
                style={baseStyles.bottomBorder}
                likeAction={this._likeBuzz}
                favoriteAction={this._favoriteBuzz}
                pollAction={this._pollBuzz}
              />
            )}
          />
        )
      } else {
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            data={[{key: 'emptyScreen'}]}
            renderItem={(item) => <EmptySearch />}
          />
        )
      }

    } else {
      return (
        <View>
          <View style={styles.trendingHeader}>
            <Image source={require('../assets/images/fire.png')} style={styles.trendingImage} />
            <OpenSansBoldText style={styles.trendingText}>Trending Buzz</OpenSansBoldText>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            onRefresh={() => this._getTrendingBuzz()}
            refreshing={this.state.isFetching}
            data={this.state.trendingBuzzList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => (
              <CardTrending
                data={item}
                navigation={this.props.navigation}
                style={baseStyles.bottomBorder}
                likeAction={this._likeBuzz}
                favoriteAction={this._favoriteBuzz}
                pollAction={this._pollBuzz}
              />
            )}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          // value={this.state.searchedText}
          containerStyle={styles.searchContainer}
          inputStyle={styles.inputSearchContainer}
          onChangeText={(text) => this._getSearchedBuzz(text)}
          placeholder='Search Buzz...' />
        {this._getTrendingOrSearchedBuzz()}

        <BuzzPlusButton navigation={this.props.navigation} />
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
