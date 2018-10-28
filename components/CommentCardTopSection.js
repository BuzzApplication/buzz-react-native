import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Time from '../components/Time';
import UserContainerRowAligned from '../components/UserContainerRowAligned';


class CommentCardTopSection extends React.Component {
  render() {
    const alias = this.props.alias;
    const company = this.props.company;
    const timePassed = this.props.timePassed;
    return (
      <View style={styles.topContainer}>
        <UserContainerRowAligned alias={alias} company={company}/>
        <Time timePassed={timePassed} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContainer: {
    // backgroundColor: colors.lightPink,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CommentCardTopSection;
