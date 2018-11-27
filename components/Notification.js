import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Notification extends React.Component {
  _navigateToCardDetail() {
    this.props.navigation.navigate('CardDetail', {
      buzzId: this.props.item.itemId,
      userEmailId: this.props.navigation.getParam('userEmailId'),
    });
  }

  render() {
    const data = this.props.item;

    let notification;
    if (data.action === 'LIKE_ACTION') {
      notification = <Image source={require('../assets/images/liked.png')} style={styles.image} />
    } else if (data.action === 'COMMENT_ACTION') {
      notification = <Image source={require('../assets/images/commented.png')} style={styles.image} />
    }

    return (
      <View style={styles.notificationContainer}>
        <View style={styles.notificationRoundedContainer}>
          <TouchableOpacity style={baseStyles.button} onPress={() => this._navigateToCardDetail()}>
            <View style={styles.row}>
              {notification}
              <OpenSansText style={styles.text}>{data.message}</OpenSansText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notificationContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  notificationRoundedContainer: {
    borderRadius: 15,
    borderColor: colors.lightBlue,
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowColor: colors.grey,
    shadowOpacity: 0.5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
  },
  text: {
    flex: 7,
    paddingLeft: 10,
  },
});


export default Notification;
