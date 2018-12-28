import React from 'react';
import { StyleSheet, View, Text, Button, FlatList, TextInput, Keyboard} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import _ from 'lodash';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import CardDetailHeader from '../components/CardDetailHeader';
import Card from '../components/Card';
import CommentCard from '../components/CommentCard';

import { getCommentList, postComment, likeComment } from "../api/comment.js";
import { favoriteBuzz, likeBuzz, submitPoll} from "../api/buzz";
import { getUserEmail } from "../api/user";


export class CardDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <CardDetailHeader navigation={navigation} />
  });

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
    };

    this._likeBuzz = this._likeBuzz.bind(this);
    this._likeBuzzFetch = this._likeBuzzFetch.bind(this);
    this._favoriteBuzz = this._favoriteBuzz.bind(this);
    this._favoriteBuzzFetch = this._favoriteBuzzFetch.bind(this);
    this._likeComment = this._likeComment.bind(this);
    this._pollBuzz = this._pollBuzz.bind(this);
    this._pollBuzzFetch = this._pollBuzzFetch.bind(this);
    this._updateComment = this._updateComment.bind(this);
  }

  componentDidMount() {
    this._getCommentList();
    const userEmailId = this.props.navigation.getParam('userEmailId') ?
        this.props.navigation.getParam('userEmailId') : this._getUserEmailId();
    this.setState({userEmailId: userEmailId});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this._getCommentList();
    }
    const userEmailId = this.props.navigation.getParam('userEmailId') ?
        this.props.navigation.getParam('userEmailId') : this._getUserEmailId();
    this.setState({userEmailId: userEmailId});
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
    if (likeAction) {
      likeAction(buzzId, liked);
        const buzz = this.state.buzz;
        buzz.liked = !liked;
        this.setState({
            buzz: buzz,
        });
    } else {
      this._likeBuzzFetch(buzzId, liked);
    }
  }

  _favoriteBuzz(buzzId, favorited) {
    const favoriteAction = this.props.navigation.getParam('favoriteAction');
    if (favoriteAction) {
        favoriteAction(buzzId, favorited);
        const buzz = this.state.buzz;
        buzz.favorited = !favorited;
        this.setState({
            buzz: buzz,
        });
    } else {
        this._favoriteBuzzFetch(buzzId, favorited);
    }
  }

  _likeComment(commentId, liked, _toggleLiked) {
    likeComment(commentId, !liked).then((response) => {
      this._updateComment(response);
    }).catch((e) => console.log('ERROR', e));
  }

  _pollBuzz(pollId) {
    const pollAction = this.props.navigation.getParam('pollAction');
    if (pollAction) {
      pollAction(pollId);
      this._getCommentList();
    } else {
      this._pollBuzzFetch(pollId);
    }
  }

  _likeBuzzFetch(buzzId, liked) {
      likeBuzz(buzzId, !liked).then((response) => {
          const buzz = this.state.buzz;
          buzz.liked = !liked;
          this.setState({
              buzz: buzz,
          });
      }).catch((e) => console.log('ERROR', e));
  }

  _favoriteBuzzFetch(buzzId, favorited) {
      favoriteBuzz(buzzId, !favorited).then((response) => {
          const buzz = this.state.buzz;
          buzz.favorited = !favorited;
          this.setState({
              buzz: buzz,
          });
      }).catch((e) => console.log('ERROR', e));
  }

  _pollBuzzFetch(pollId) {
      submitPoll(pollId).then((response) => {
          this.setState({
              buzz: response,
          });
      }).catch((e) => console.log('ERROR', e));
  }

  _getCommentList() {
    const buzzId = this.props.navigation.getParam('buzzId');

    getCommentList(buzzId).then((response) => {
      this.setState({
        buzz: response.buzz,
        commentList: response.commentList,
        isFetching: false,
        startPagination: 10,
      });
    });
  }

  _getUserEmailId() {
      getUserEmail().then((response) => {
          const userEmailId = this._getUserEmailIdHelper(response.userEmails);
          this.setState({userEmailId: userEmailId});
      });
  }

  _getUserEmailIdHelper() {
      const userEmailsFiltered = _.filter(userEmails, function(userEmail) { return userEmail.company.id !== 1; });
      return userEmailsFiltered[0].id;
  }

  _loadMoreComments() {
    const buzzId = this.props.navigation.getParam('buzzId');
    getCommentList(buzzId, this.state.startPagination).then((responseCommentList) => {
      if (responseCommentList.commentList.length > 0) {
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
        const commentList = [...this.state.commentList, response];
        this.setState({
          text: '',
          posted: true,
          commentList: commentList,
        });
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
        keyExtractor={(item) => item.id}
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
          item.index === 0 ?
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
            autoCapitalize='sentences'
            numberOfLines={4}
            ref={(ref)=>{this.writeComment = ref}}
          />
          <View style={styles.buttonOuterContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Buzz"
                style={styles.button}
                color='white'
                disabled={this.state.text === ''}
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
