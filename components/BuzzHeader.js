import React from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'


class BuzzHeader extends React.Component {
  state = {text: 'Everyone'};
  render() {
    let data = [{
      value: 'Everyone',
    }, {
      value: 'Bank Mandiri',
    }, {
      value: 'Universitas Indonesia',
    }];
    return (
      <View style={[styles.container, baseStyles.header]}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <MaterialCommunityIcons name="window-close" size={25} color={colors.skyBlue} onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerCenter}>
            <Dropdown
              containerStyle={styles.dropdownContainer}
              pickerStyle={styles.pickerContainer}
              itemTextStyle={styles.itemText}
              fontSize={16}
              dropdownPosition={0}
              dropdownOffset={{top: 10, left: 0}}
              data={data}
              onChangeText={text => {
                this.setState({text});
              }}
              value={this.state.text}
            />
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.buzzButtonContainer, baseStyles.buttonShadow]}>
              <Button title="Buzz" color='white' onPress={() => navigation.goBack()} />
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
    borderColor: baseStyles.grey,
  },
  statusHeader: {
    backgroundColor: 'white',
    height: getStatusBarHeight(),
    borderColor: colors.skyBlue,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    left: 10,
    flex: 2,
  },
  headerCenter: {
    flex: 3,
  },
  dropdownContainer: {
  },
  pickerContainer: {
  },
  itemText: {
    textAlign: 'center',
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 10,
    padding: 5,
  },
  buzzButtonContainer: {
    backgroundColor: colors.skyBlue,
    borderRadius: 20,
    alignItems: 'center',
    width: 70,
  },
});

export default BuzzHeader;
