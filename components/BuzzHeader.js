import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalDropdown from 'react-native-modal-dropdown';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class BuzzHeader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <MaterialCommunityIcons name="window-close" size={25} color={colors.skyBlue} onPress={() => this.props.navigation.goBack()} />
          </View>
          <ModalDropdown
            style={styles.modal}
            textStyle={styles.modalText}
            dropdownStyle={styles.dropdownModal}
            dropdownTextStyle={styles.dropdownModalText}
            showsVerticalScrollIndicator={false}
            defaultValue='Everyone'
            options={['Everyone', 'Bank Mandiri', 'Universitas Indonesia']}/>
          <View style={styles.headerRight}>
            <View style={styles.buzzButtonContainer}>
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
  modal: {
    flex: 5,
  },
  dropdownModal: {
    // backgroundColor: 'green',
    maxWidth: Dimensions.get('window').width - 150,
    borderWidth: 0,
  },
  dropdownModalText: {
    // backgroundColor: 'blue',
    fontSize: 14,
    fontFamily: 'open-sans',
    textAlign: 'left',
    alignItems: 'center',
    // left: 0,
  },
  modalText: {
    // backgroundColor: 'yellow',
    fontSize: 14,
    fontFamily: 'open-sans',
    textAlign: 'center',
    alignItems: 'center',
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
