import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { SearchBar } from 'react-native-elements';

import baseStyles from '../constants/Styles';
import { colors } from '../constants/Colors';

import PostedHeader from '../components/PostedHeader';
import BuzzPlusButton from '../components/BuzzPlusButton';
import CardTrending from '../components/CardTrending';

import { OpenSansBoldText } from '../components/StyledText'

class PostedScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: <PostedHeader navigation={navigation} />,
  });
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
          data={[
            {key: 'haloo smua. love you mahuni mahuni mahuni. mahuni paling bau tapi.'},
            {key: 'Brp sih gaji di Gojek?'},
            {key: 'Ini app apa ya?'},
            {key: 'Keren jg nih... haloo smua'},
          ]}
          renderItem={({ item, index }) => (
              <CardTrending text={item.key} navigation={this.props.navigation} style={baseStyles.bottomBorder}/>
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
    borderWidth: 0,
    backgroundColor: 'white',
  },
});

export default PostedScreen;
