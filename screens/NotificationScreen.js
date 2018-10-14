import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { colors } from '../constants/Colors';

import StatusBarHeader from '../components/StatusBarHeader';
import Notification from '../components/Notification';
import BuzzPlusButton from '../components/BuzzPlusButton';

class NotificationScreen extends React.Component {
  static navigationOptions = {
    header: <StatusBarHeader />,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          data={[
            {key: '7 people commented on your Buzz \"Ini app apa ya?\"', type: 'COMMENT'},
            {key: '5 people also liked \"Bagaimana cara menabung yg benar?\" Buzz', type: 'LIKE'},
            {key: '3 people commented on your Buzz \"Ini app apa ya?\"', type: 'COMMENT'},
          ]}
          renderItem={({ item }) => (
            <Notification text={item.key} type={item.type} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: colors.skyBlue,
    borderWidth: 0,
    backgroundColor: 'white',
  },
});

export default NotificationScreen;
