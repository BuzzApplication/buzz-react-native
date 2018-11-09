import React from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-material-dropdown';
import _ from 'lodash';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { submitReport } from "../api/report.js";


class ReportHeader extends React.Component {
  constructor(props) {
    super(props);
  };

  _submitReport() {
    submitReport(this.props.navigation.getParam('type'),
                 this.props.navigation.getParam('reportCategoryId'),
                 this.props.navigation.getParam('itemId'))
      .then((response) => {
        this.props.navigation.goBack();
      })
  }

  render() {
    return (
      <View style={[styles.container, baseStyles.header]}>
        <View style={styles.statusHeader} />
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft} >
            <MaterialCommunityIcons
              name="window-close"
              size={25}
              color={colors.skyBlue}
              onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.headerCenter}>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.reportButtonContainer}>
              <Button
                title="Report"
                color={colors.skyBlue}
                disabled={this.props.navigation.getParam('reportCategoryId') == ''}
                onPress={() => this._submitReport()} />
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerCenter: {
    flex: 3,
  },
  headerRight: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 10,
    padding: 5,
  },
  reportButtonContainer: {
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default ReportHeader;
