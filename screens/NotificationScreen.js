import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { colors } from '../constants/Colors';

import NotificationHeader from '../components/NotificationHeader';
import Notification from '../components/Notification';
import BuzzPlusButton from '../components/BuzzPlusButton';

class NotificationScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({ //don't forget parentheses around the object notation
    header: <NotificationHeader navigation={navigation}/>,
  })

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor:colors.lightBlue}}
          showsVerticalScrollIndicator={false}
          data={[
            {key: '7 people commented on your Buzz \"Ini app apa ya?\"', type: 'COMMENT'},
            {key: '5 people also liked \"Bagaimana cara menabung yg benar? kata bla bla bla bla blahhh\" Buzz', type: 'LIKE'},
            {key: '3 people commented on your Buzz \"Ini app apa ya? Ini app apa ya?Ini app apa ya?Ini app apa ya?Ini app apa ya?Ini app apa ya?\"', type: 'COMMENT'},
          ]}
          renderItem={({ item }) => (
            <Notification text={item.key} type={item.type} navigation={this.props.navigation} />
          )}
        />
        <BuzzPlusButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.skyBlue,
    borderWidth: 0,
  },
});

export default NotificationScreen;
