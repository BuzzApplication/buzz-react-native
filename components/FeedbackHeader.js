import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText, OpenSansBoldText } from '../components/StyledText'

import { submitFeedback } from "../api/feedback";


class FeedbackHeader extends React.Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {

  }

  _sendFeedback() {
    submitFeedback(this.props.navigation.getParam('text'))
      .then((response) => {
        this.props.navigation.navigate('Settings');
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <HeaderBackButton tintColor='white' onPress={() => this.props.navigation.goBack()} />,
          </View>
          <OpenSansBoldText style={styles.headerText}>Feedback</OpenSansBoldText>
          <View style={styles.headerRight}>
            <View style={styles.feedbackButtonContainer}>
              <Button
                title="Send"
                color='white'
                disabled={this.props.navigation.getParam('text') == ''}
                onPress={() => this._sendFeedback()} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: colors.skyBlue,
  },
  statusHeader: {
    backgroundColor: colors.skyBlue,
    height: getStatusBarHeight(),
    borderColor: colors.skyBlue,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.skyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerText: {
    color: 'white',
    flex: 5,
    textAlign: 'center',
    fontSize: 18,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    right: 10,
  },
  feedbackButtonContainer: {
    backgroundColor: colors.skyBlue,
    alignItems: 'center',
    width: 70,
  },
});

export default FeedbackHeader;
