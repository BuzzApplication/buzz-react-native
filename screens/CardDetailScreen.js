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
    this._pollBuzz = this._pollBuzz.bind(this);
    this._updateComment = this._updateComment.bind(this);
  }

  componentDidMount() {
    this._getCommentList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this._getCommentList();
    }
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
    const buzz = this.state.buzz;
    buzz.liked = !liked;
    this.setState({
      buzz: buzz,
    });
  }

  _favoriteBuzz(buzzId, favorited) {
    const favoriteAction = this.props.navigation.getParam('favoriteAction');
    favoriteAction(buzzId, favorited);
    const buzz = this.state.buzz;
    buzz.favorited = !favorited;
    this.setState({
      buzz: buzz,
    });
  }

  _likeComment(commentId, liked, _toggleLiked) {
    likeComment(commentId, !liked).then((response) => {
      this._updateComment(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _pollBuzz(pollId) {
    const pollAction = this.props.navigation.getParam('pollAction');
    pollAction(pollId);
    this._getCommentList();
  }

  _getCommentList() {
    const buzzId = this.props.navigation.getParam('buzzId');
    getCommentList(buzzId).then((response) => {
      this.setState({
        userEmailId: this.props.navigation.getParam('userEmailId'),
        buzz: response.buzz,
        commentList: response.commentList,
        isFetching: false,
        startPagination: 10,
      });
    });
  }

  _loadMoreComments() {
    const buzzId = this.props.navigation.getParam('buzzId');
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
        this._getCommentList();
        Keyboard.dismiss();
      })
  }

  _getBuzzAndComments() {
    return this.state.buzz && Object.keys(this.state.buzz).length > 0 ? [this.state.buzz, ...this.state.commentList] : this.state.commentList;
  }

  _getCards() {

    return (
      <FlatList
        style={{backgroundColor:'white'}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive"
        data={this._getBuzzAndComments()}
        onRefresh={() => this._getCommentList()}
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
          this._loadMoreComments();
        }}
        onEndReachedThreshold={1}
        renderItem={(item) => (
          item.index == '0' ?
            <View >
              <Card
                data={item}
                likeAction={this._likeBuzz}
                favoriteAction={this._favoriteBuzz}
                pollAction={this._pollBuzz}
                clickable={false}
                writeComment={this.writeComment} />
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
            numberOfLines={4}
            ref={(ref)=>{this.writeComment = ref}}
          />
          <View style={styles.buttonOuterContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Buzz"
                style={styles.button}
                color='white'
                disabled={this.state.text == ''}
                onPress={() => this._postComment()} />
            </View>
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
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 0,
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
    paddingTop: 15,
    height: 45,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  buttonOuterContainer: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
  },
});

export default CardDetailScreen;
