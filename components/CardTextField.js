import React from 'react';
import { StyleSheet, View, Image, Text, Linking, TouchableOpacity } from 'react-native';
import { OpenGraphParser } from 'react-native-opengraph-kit';

import { REGEX_VALID_URL } from '../constants/RegexParser'
import { colors } from '../constants/Colors'

import { OpenSansText } from '../components/StyledText'


class CardTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      linkPreview: '',
      text: '',
    };
    this._parseText = this._parseText.bind(this);
  };

  componentDidMount() {
    this._parseText(this.props.text);
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps !== this.props) {
      this._parseText(prevProps.text);
    }
  }

  _parseText(text) {
    text.replace(/\n/g, ' ').split(' ').forEach((token) => {
      if (REGEX_VALID_URL.test(token)) {
        OpenGraphParser.extractMeta(token)
          .then((data) => {
            this.setState({
              linkPreview: data[0],
              text: text.replace(token, '')
             });
            return;
          })
          .catch((error) => {
              console.log(error);
          });
      }
    });
  }

  _openLink(url) {
    if (!url) {
      return;
    }
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  _getLinkPreview() {
    const linkPreview = [];
    if (!this.state.linkPreview) {
      return;
    }
    return (
      <TouchableOpacity style={styles.linkPreviewSection}
        activeOpacity={1}
        onPress={() => this._openLink(this.state.linkPreview.url)} >
        <View style={styles.linkPreviewContainer}>
          {this.state.linkPreview.image && (<View style={styles.imageContainer}><Image resizeMode="cover" source={{uri: this.state.linkPreview.image}} style={styles.image} /></View>)}
          {this.state.linkPreview.title && <Text style={styles.title}>{this.state.linkPreview.title}</Text>}
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.cardTextFieldContainer}>
        <OpenSansText style={styles.cardTextFieldText}>
          {this.state.text}
        </OpenSansText>
          {this._getLinkPreview(this.props.text)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardTextFieldContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
  },
  cardTextFieldText: {
    fontSize: 14,
  },
  linkPreviewSection: {
    paddingTop: 10,
  },
  linkPreviewContainer: {
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  imageContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  image: {
    height: 180,
    width: null,
  },
  title: {
    padding: 10,
    fontFamily: 'Arial',
  },
});

export default CardTextField;
