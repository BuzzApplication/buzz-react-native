import React from 'react';
import { StyleSheet, View, FlatList, Switch } from 'react-native';

import { colors } from '../constants/Colors';

import PushNotificationSettingsHeader from '../components/PushNotificationSettingsHeader';

import { OpenSansText } from '../components/StyledText';


class PushNotificationSettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <PushNotificationSettingsHeader navigation={navigation} />
  })

  constructor() {
   super();
   this.state = {
      toggled: false,
   }
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <FlatList
          style={{backgroundColor:'white'}}
          showsVerticalScrollIndicator={false}
          data={[
            {key: 'Someone liked on your buzz', value: true},
            {key: 'Someone commented on your buzz', value: false},
          ]}
          renderItem={({ item }) => (
            <View style={styles.notificationSettings}>
              <OpenSansText style={styles.switchText}>{item.key}</OpenSansText>
              <Switch
                style={styles.switchButton}
                onValueChange={(value) => this.setState({ toggled: item.value })}
                value={ this.state.toggled } />
            </View>
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
    paddingTop: 20,
  },
  notificationSettings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingRight: 20,
  },
  switchButton: {
    // backgroundColor: 'yellow',
  },
  switchText: {
    // backgroundColor: 'blue',
    padding: 10,
    fontSize: 14,
  },
});

export default PushNotificationSettingsScreen;
