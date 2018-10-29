import React from 'react';
import { StyleSheet, InputAccessoryView, TextInput, View, Button, Dimensions } from 'react-native';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { postComment } from "../api/comment.js";


class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      buzzId: '',
      userEmailId: '',
    }
  }

  componentDidMount() {
  }

  _postComment(buzzId, userEmailId) {
    postComment(this.state.text,
                buzzId,
                userEmailId)
      .then((response) => {
        this.setState({text: ''});
      })
  }

  render() {
    const {width} = Dimensions.get('window');
    const buzzId = this.props.buzzId;
    const userEmailId = this.props.userEmailId;
    return (
      <InputAccessoryView style={styles.inputAccessoryView}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => {
              this.setState({text});
            }}
            value={this.state.text}
            placeholder={'Type a message...'}
            // maxLength = {500}
            multiline = {true}
            numberOfLines = {2}
            enablesReturnKeyAutomatically = {true}
          />
          <Button
            onPress={() => this._postComment(buzzId, userEmailId)}
            title="Buzz"
            style={styles.button}
          />
        </View>
      </InputAccessoryView>
    );
  }
}

const styles = StyleSheet.create({
  inputAccessoryView: {
    flex: 1,
    flexDirection: 'row',
  },
  headerRight: {
    right: 55,
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: colors.lightBlue,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%'
  },
  textInput: {
    height: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    borderRadius: 18,
    padding: 10,
    width: '100%',
    // backgroundColor: "blue",

  },
  text: {
    // color: 'white',
  },
  button: {
    padding: 10,
    color: colors.skyBlue,
    // backgroundColor: "purple",
  }
});

export default Keyboard;
