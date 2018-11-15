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

import { getCommentList, postComment, likeComment } from "../api/comment.js";


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
      startPagination: 0,
    }

    this._likeBuzz = this._likeBuzz.bind(this);
    this._favoriteBuzz = this._favoriteBuzz.bind(this);
    this._likeComment = this._likeComment.bind(this);
    this._updateComment = this._updateComment.bind(this);
  }

  componentDidMount() {
    this.setState({
      userEmailId: this.props.navigation.getParam('userEmailId'),
    });
    const buzzId = this.props.navigation.getParam('buzzId');
    this._getCommentList(buzzId);
  }

  _updateComment(updatedComment) {
    const commentList = this.state.commentList;
    const updatedCommentList = _.map(commentList, function(comment, index) {
      return comment.id === updatedComment.id ? updatedComment : comment;
    });

    this.setState({commentList: updatedCommentList});
  }

  _likeBuzz(buzzId, liked) {
    const likeAction = this.props.navigation.getParam('likeAction');
    likeAction(buzzId, liked);
    this._getCommentList(buzzId);
  }

  _favoriteBuzz(buzzId, favorited) {
    const favoriteAction = this.props.navigation.getParam('favoriteAction');
    favoriteAction(buzzId, favorited);
    this._getCommentList(buzzId);
  }

  _likeComment(commentId, liked, _toggleLiked) {
    likeComment(commentId, !liked).then((response) => {
      this._updateComment(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _getCommentList(buzzId) {
    getCommentList(buzzId).then((response) => {
      const commentList = [];
      commentList.push(response.buzz);
      this.setState({
        buzz: response.buzz,
        commentList: commentList.concat(response.commentList),
        isFetching: false,
        startPagination: 10,
      });
    });
  }

  _loadMoreComments(buzzId) {
    getCommentList(buzzId).then((responseCommentList) => {
      if (responseCommentList.length > 0) {
        this.setState({
          commentList: [...this.state.commentList, ...responseCommentList.commentList],
          startPagination: this.state.startPagination + 10,
        });
      }
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
        keyExtractor={(item) => {item.id}}
        // scroll to end only after posted a comment
        ref={ref => this.flatList = ref}
        onContentSizeChange={() => {
          if (this.state.posted) this.flatList.scrollToEnd({animated: true})
        }}
        onLayout={() => {
          if (this.state.posted) this.flatList.scrollToEnd({animated: true})
        }}
        onEndReached={({ distanceFromEnd }) => {
          this._loadMoreComments(buzzId);
        }}
        onEndReachedThreshold={1}
        renderItem={(item) => (
          item.index == '0' ?
            <View >
              <Card data={item} likeAction={this._likeBuzz} favoriteAction={this._favoriteBuzz} clickable={false}/>
              <View style={[styles.lines, baseStyles.bottomBorder]} />
            </View>
          : <CommentCard data={item} likeAction={this._likeComment} navigation={this.props.navigation}/>
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
            placeholder={'Type a comment...'}
            enablesReturnKeyAutomatically = {true}
            multiline={true}
            autoCorrect={false}
            autoCapitalize='none'
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
