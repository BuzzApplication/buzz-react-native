import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import _ from 'lodash';

import baseStyles from '../constants/Styles';

import PostedHeader from '../components/PostedHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';
import EmptyPosted from '../components/EmptyPosted';


import { getPostedBuzz, likeBuzz, favoriteBuzz, submitPoll } from "../api/buzz.js";


class PostedScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <PostedHeader navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      buzzList: [],
      isFetching: false,
      startPagination: 0,
    };

    this._getPostedBuzz = this._getPostedBuzz.bind(this);
    this._loadMoreBuzz = this._loadMoreBuzz.bind(this);
    this._likeBuzz = this._likeBuzz.bind(this);
    this._favoriteBuzz = this._favoriteBuzz.bind(this);
    this._pollBuzz = this._pollBuzz.bind(this);
    this._updateBuzz = this._updateBuzz.bind(this);
  }

  componentDidMount() {
    this._getPostedBuzz();
  }

  _getPostedBuzz() {
    this.setState({ isFetching: true });
    getPostedBuzz().then((response) => {
        this.setState({
          buzzList: response,
          isFetching: false,
          startPagination: 10,
        });
      });
  }

  _loadMoreBuzz() {
    getPostedBuzz(this.state.startPagination).then((response) => {
        this.setState({
          buzzList: [...this.state.buzzList, ...response],
          startPagination: this.state.startPagination + 10,
        });
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
    const buzzList = this.state.buzzList;
    const updatedBuzzList = _.map(buzzList, function(buzz, index) {
      return buzz.id === updatedBuzz.id ? updatedBuzz : buzz;
    });

    this.setState({
      buzzList: updatedBuzzList,
    });
  }

  _renderPostedBuzz() {
    if (this.state.buzzList.length > 0) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          onRefresh={() => this._getPostedBuzz()}
          refreshing={this.state.isFetching}
          data={this.state.buzzList}
          onEndReached={({ distanceFromEnd }) => {
            this._loadMoreBuzz();
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
      );
    } else {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          onRefresh={() => this._getPostedBuzz()}
          refreshing={this.state.isFetching}
          data={[{key: 'emptyScreen'}]}
          renderItem={(item) => <EmptyPosted />}
        />
      );
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {this._renderPostedBuzz()}
        <BuzzPlusButton navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'white',
  },
});

export default PostedScreen;
