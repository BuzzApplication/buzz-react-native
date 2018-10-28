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
    }
  }

  componentDidMount() {
    const buzzId = this.props.navigation.getParam('buzzId');
    getCommentList(buzzId).then((response) => {
      this.setState({
        buzz: response.buzz,
        commentList: response.commentList,
      });
    });
  }

  _getCards() {
    return (
      <FlatList
        style={{backgroundColor:'white'}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        data={this.state.commentList}
        renderItem={(item, index) => (
          item.index == '0' ?
            <View>
              <Card data={this.state.buzz} />
              <View style={[styles.lines, baseStyles.bottomBorder]} />
              <CommentCard data={item} />
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
        <Keyboard />
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
