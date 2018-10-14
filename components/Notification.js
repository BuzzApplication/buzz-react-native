import React from 'react';
import { StyleSheet, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Notification extends React.Component {
  render() {
    
    let notification;
    if (this.props.type == 'COMMENT') {
      notification = <EvilIcons name="comment" size={25} />
    } else if (this.props.type == 'LIKE'){
      notification = <EvilIcons name="heart" size={25} />
    }

    return (
      <View style={styles.notificationContainer}>
        {notification}
        <OpenSansText style={styles.text}>{this.props.text}</OpenSansText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notificationContainer: {
    padding: 15,
    paddingRight: 30,
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: 0.2,
    borderColor: baseStyles.grey,
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    paddingLeft:5,
    paddingRight: 5,
  },
});


export default Notification;
