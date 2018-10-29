import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , Share, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from 'lodash';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import CardDetailHeader from '../components/CardDetailHeader';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';
import Keyboard from '../components/Keyboard';

import { getCommentList } from "../api/comment.js";


export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <CardDetailHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);
    this.state = {
      buzz: {},
      commentList: [],
      userEmailId: {},
      isFetching: false,
    }
  }

  componentDidMount() {
    this.setState(
      {userEmailId: this.props.navigation.getParam('userEmailId')}
    );
    const buzzId = this.props.navigation.getParam('buzzId');

    this._getCommentList(buzzId);
  }

  _getCommentList(buzzId) {
    getCommentList(buzzId).then((response) => {
      const commentList = [];
      commentList.push(response.buzz);
      this.setState({
        buzz: response.buzz,
        commentList: commentList.concat(response.commentList),
        isFetching: false,
      });
    });
  }

  _getCards() {
    const buzzId = this.props.navigation.getParam('buzzId');

    return (
      <FlatList
        style={{backgroundColor:'white'}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        data={this.state.commentList}
        onRefresh={() => this._getCommentList(buzzId)}
        refreshing={this.state.isFetching}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => (
          item.index == '0' ?
            <View >
              <Card data={item} />
              <View style={[styles.lines, baseStyles.bottomBorder]} />
            </View>
          : <CommentCard data={item} />
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        {this._getCards()}
        <Keyboard buzzId={_.get(this.state.buzz, 'id')} userEmailId={this.state.userEmailId} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: baseStyles.grey,
  },
  lines: {
    height:0.5,
    top:-0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

export default CardDetailScreen;
