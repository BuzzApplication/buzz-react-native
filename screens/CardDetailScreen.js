import React from 'react';
import { StyleSheet, View, Text, Button, ScrollView , Share, FlatList, TextInput, Keyboard} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import _ from 'lodash';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import CardDetailHeader from '../components/CardDetailHeader';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';
// import Keyboard from '../components/Keyboard';

import { getCommentList, postComment } from "../api/comment.js";


export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <CardDetailHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      buzz: {},
      commentList: [],
      userEmailId: {},
      isFetching: false,
      posted: false,
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

  _postComment() {
    const buzzId = _.get(this.state.buzz, 'id');
    postComment(this.state.text,
                buzzId,
                this.state.userEmailId)
      .then((response) => {
        this.setState({
          text: '',
          posted: true,
        });
        this._getCommentList(buzzId);
        Keyboard.dismiss();
      })
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
        // scroll to end only after posted a comment
        ref={ref => this.flatList = ref}
        onContentSizeChange={() => {
          if (this.state.posted) this.flatList.scrollToEnd({animated: true})
        }}
        onLayout={() => {
          if (this.state.posted) this.flatList.scrollToEnd({animated: true})
        }}
        // ---
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
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => {
              this.setState({text});
            }}
            value={this.state.text}
            placeholder={'Type a message...'}
            enablesReturnKeyAutomatically = {true}
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.buttonContainer}>
            <Button title="Buzz"
              style={styles.button}
              color='white'
              disabled={this.state.text == ''}
              onPress={() => this._postComment()} />
          </View>
        </View>
        <KeyboardSpacer topSpacing={-50} />
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
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowColor: colors.border,
    shadowOpacity: 0.5,
  },
  textInput: {
    flex: 5,
    padding: 10,
    paddingTop: 10,
    height: 45,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  buttonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
    padding: 3,
  },
});

export default CardDetailScreen;
