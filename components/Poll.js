import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { Text, Svg, Image } from 'react-native-svg'
import * as scale from 'd3-scale';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../constants/Colors';

class Poll extends React.Component {
  _getVoted(x, y, bandwidth, poll, index) {
    return poll.polled ?
      <Image
        x={ x(2) }
        y={ y(index) + (bandwidth / 2) }
        width="50%"
        height="50%"
        preserveAspectRatio="xMidYMid slice"
        opacity='1'
        href={require('../assets/images/tick.png')}
        clipPath="url(#clip)"
      /> : null;
  }

  render() {
    const data = this.props.data;
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

    const height = this.props.data.length * 40;

    return (
      <View style={{ flexDirection: 'row', height: height }}>
        <BarChart
          style={{ flex: 1, marginLeft: 8, marginRight: 8 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.percentage}
          yMax={120}
          svg={{ fill: '#e6e6e6' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <ValueLabels />
          <TextLabels />
        </BarChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userNameContainer: {
    padding: 1,
  },
  userNameText: {
    // backgroundColor: colors.cloudyBlue,
    fontSize: 12,
    fontWeight: "300",
  },
});

export default Poll;
