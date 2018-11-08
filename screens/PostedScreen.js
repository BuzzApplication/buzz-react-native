import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import PostedHeader from '../components/PostedHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';

import { OpenSansBoldText } from '../components/StyledText'

import { getPostedBuzz } from "../api/buzz.js";


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
    }
    this._getPostedBuzz = this._getPostedBuzz.bind(this);
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

  render() {
    return (
      <View style={styles.container}>
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
    borderWidth: 0,
    backgroundColor: 'white',
  },
});

export default PostedScreen;
