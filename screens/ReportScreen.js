import React from 'react';
import { StyleSheet, View, Text, TextInput, Switch } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import { OpenSansLightText } from '../components/StyledText';
import BuzzButton from '../components/BuzzButton';
import ReportHeader from '../components/ReportHeader';

import { getReportCategories, submitReport } from "../api/report.js";


export class ReportScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <ReportHeader navigation={navigation} />
  });

  constructor(props) {
    super(props);
    this.state = {
      reportCategories: [],
    };
    this._getReportCategories = this._getReportCategories.bind(this);
  };

  componentDidMount() {
    getReportCategories().then((response) => {
      this.setState({
        reportCategories: response,
      });
    });
    this.props.navigation.setParams({
      reportCategoryId: -1,
    });
  }

  _getReportCategories() {
    var radioProps = [];
    this.state.reportCategories.map((reportCategory) => {
      radioProps.push({label: reportCategory.category, value: reportCategory.id});
    });
    return radioProps;
  }

  _onSelect(value, type, itemId) {
    console.log('this.props.type', type);
    console.log('this.props.itemId', itemId);
    this.props.navigation.setParams({
      reportCategoryId: value,
      type: type,
      itemId: itemId,
    });
  }

  render() {
    const type = this.props.navigation.getParam('type');
    const itemId = this.props.navigation.getParam('itemId');
    return (
      <View style={styles.screenContainer}>
        <View style={styles.switchContainer}>
          <RadioForm
            radio_props={this._getReportCategories()}
            initial={-1}
            animation={true}
            buttonSize={14}
            buttonOuterSize={24}
            style={styles.radioForm}
            labelStyle={styles.labelStyle}
            onPress={(value) => this._onSelect(value, type, itemId)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
  },
  switchContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  radioForm: {
    padding: 10,
  },
  labelStyle: {
    paddingBottom: 20,
    fontSize: 16,
    paddingLeft: 20,
  },
});

export default ReportScreen;
