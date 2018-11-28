import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg'
import _ from 'lodash';

import { OpenSansBoldText, OpenSansLightText, OpenSansLightItalicText } from '../components/StyledText'

import { colors } from '../constants/Colors';


class Poll extends React.Component {
  constructor(props) {
    super(props);

    this._submitPoll = this._submitPoll.bind(this);
    this._getPoll = this._getPoll.bind(this);
    this._getPolling = this._getPolling.bind(this);
    this._getPolledData = this._getPolledData.bind(this);
  }

  _submitPoll(pollId) {
    this.props.pollAction(pollId);
  }

  _getPoll(data, polled, totalPollsCount, ValueLabels, TextLabels) {
    return polled ? this._getPolledData(data, totalPollsCount, ValueLabels, TextLabels ) : this._getPolling(data)
  }

  _getPolling(data) {
    const pollList = data.map((poll) => {
      return (
        <TouchableOpacity style={styles.pollList} activeOpacity={0.7} onPress={() =>  this._submitPoll(poll.id)} key={poll.id}>
          <View style={styles.pollListContainer}>
            <OpenSansBoldText style={styles.pollText}>{poll.text}</OpenSansBoldText>
          </View>
        </TouchableOpacity>
      )
    });
    return (
      <View style={styles.pollingContainer}>
        {pollList}
        <View style={styles.pollTitleContainer}>
          <OpenSansLightItalicText style={styles.pollTitle}>Poll to see results</OpenSansLightItalicText>
        </View>
      </View>
    )
  }

  _getPolledData(data, totalPollsCount, ValueLabels, TextLabels) {
    return (
      <View style={styles.pollContainer}>
        <BarChart
          style={[styles.barChart, {height: this.props.data.length * 40}]}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.percentage}
          yMax={120}
          svg={{ fill: '#e6e6e6' }}
          contentInset={{
            top: 5,
            bottom: 5,
          }}
          spacing={0.2}
          gridMin={0}
        >
          <ValueLabels />
          <TextLabels />
        </BarChart>
        <View style={styles.polledTitleContainer}>
          <OpenSansLightText style={styles.polledTitle}>{totalPollsCount} votes</OpenSansLightText>
        </View>
      </View>
    )
  }

  render() {
    const data = this.props.data;
    const polled = this.props.polled;
    const totalPollsCount = _.sumBy(this.props.data, 'count');
    if (this.props.data.length === 0) {
      return null;
    }

    const ValueLabels = ({  x, y, bandwidth, data }) => (
      data.map((item, index) => (
          <Text
            key={ index }
            x={ x(105) }
            y={ y(index) + (bandwidth / 2) }
            fontSize={ 14 }
            fill={ 'black' }
            alignmentBaseline={ 'middle' }
          >
            {item.percentage}%
          </Text>
        ))
    )

    const TextLabels = ({  x, y, bandwidth, data }) => (
      data.map((item, index) => (
        item.polled ?
          <Text
            key={ index }
            x={ x(2) }
            y={ y(index) + (bandwidth / 2) }
            fontSize={ 14 }
            fill={ 'black' }
            alignmentBaseline={ 'middle' }
          >
            {item.text} ✓
          </Text> :
          <Text
            key={ index }
            x={ x(2) }
            y={ y(index) + (bandwidth / 2) }
            fontSize={ 14 }
            fill={ 'black' }
            alignmentBaseline={ 'middle' }
          >
            {item.text}
          </Text>
      ))
    )

    return (
      this._getPoll(data, polled, totalPollsCount, ValueLabels, TextLabels)
    );
  }
}

const styles = StyleSheet.create({
  pollContainer: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  pollingContainer: {
    paddingTop: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pollListContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.skyBlue,
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  pollList: {
    paddingBottom: 4,
    paddingTop: 4,
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  pollTitleContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pollTitle: {
    color: colors.skyBlue,
    fontSize: 12,
  },
  pollText: {
    color: colors.skyBlue,
  },
  polledTitleContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
  polledTitle: {
    color: 'black',
    fontSize: 13,
  },
  barChart: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default Poll;
