import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import FavoriteHeader from '../components/FavoriteHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';

import { OpenSansBoldText } from '../components/StyledText'

import { getFavoriteBuzz } from "../api/buzz.js";


class FavoriteScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <FavoriteHeader navigation={navigation} />,
  });

  constructor(props) {
    super(props);
    this.state = {
      buzzList: [],
      isFetching: false,
      startPagination: 0,
    }

    this._getFavoriteBuzz = this._getFavoriteBuzz.bind(this);
  }

  componentDidMount() {
    this._getFavoriteBuzz();
  }

  _getFavoriteBuzz() {
    this.setState({ isFetching: true });
    getFavoriteBuzz().then((response) => {
        this.setState({
          buzzList: response,
          isFetching: false,
          startPagination: 10,
        });
      });
  }

  _loadMoreBuzz() {
    getFavoriteBuzz(this.state.startPagination).then((response) => {
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
          onRefresh={() => this._getFavoriteBuzz()}
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

export default FavoriteScreen;
