import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '../constants/Colors'
import baseStyles from '../constants/Styles'

import { OpenSansText, OpenSansLightText, OpenSansItalicText, OpenSansLightItalicText } from '../components/StyledText'


class Time extends React.Component {
  render() {
    return (
      <View style={styles.timeContainer}>
        <View style={styles.timeImageContainer}>
          <Image source={require('../assets/images/time.png')} style={styles.timeImage} />
        </View>
        <View style={styles.timeTextContainer}>
          <OpenSansLightText style={styles.timeText}>0 seconds ago</OpenSansLightText>
        </View>
      </View>
    );
  }
}

class Bookmark extends React.Component {
  render() {
    return (
      <View style={styles.bookmarkContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked me")}}>
          <Image source={require('../assets/images/bookmark.png')} style={styles.bookmarkImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

class TopRow extends React.Component {
  render() {
    return (
      <View style={styles.topRowContainer}>
        <Time />
        <Bookmark />
      </View>
    );
  }
}

class TextField extends React.Component {
  render() {
    return (
      <View style={styles.textFieldContainer}>
        <OpenSansText style={styles.textFieldText}>
          Brp sih gaji rata2 buat software engineer di SILICON VALLEY? Pgn coba apply kesana tp dnger2 ngekosnya mahal dsana. Tolong dshare klo ad pngalaman krja dsana.. thx..
        </OpenSansText>
      </View>
    );
  }
}

class EngagementData extends React.Component {
  render() {
    return (
      <View style={styles.engagementDataContainer}>
        <View style={styles.engagementDataTextContainer}>
          <OpenSansText style={styles.engagementDataText}>210</OpenSansText>
        </View>
        <View style={styles.engagementDataTextContainer}>
          <OpenSansLightText style={styles.engagementDataText}>{this.props.type}</OpenSansLightText>
        </View>
      </View>
    );
  }
}

class EngagementDataGroup extends React.Component {
  render() {
    return (
      <View style={styles.engagementDataGroupContainer}>
        <EngagementData type='likes'/>
        <EngagementData type='comments'/>
      </View>
    );
  }
}

class UserCommunity extends React.Component {
  render() {
    return (
      <View style={styles.userCommunityContainer}>
        <OpenSansLightText style={styles.userCommunityText}>Yahoo!</OpenSansLightText>
      </View>
    );
  }
}

class UserName extends React.Component {
  render() {
    return (
      <View style={styles.userNameContainer}>
        <OpenSansLightItalicText style={styles.userNameText}>Toshiki</OpenSansLightItalicText>
      </View>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <View style={styles.userContainer}>
        <UserCommunity />
        <UserName />
      </View>
    );
  }
}

class ShareButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked share")}}>
          <Image source={require('../assets/images/share.png')} style={styles.engagementButtonImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

class CommentButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked comment")}}>
          <Image source={require('../assets/images/comment.png')} style={styles.engagementButtonImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

class LikeButton extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonContainer}>
        <TouchableOpacity style={baseStyles.button} onPress={()=>{alert("you clicked like")}}>
          <Image source={require('../assets/images/like.png')} style={styles.engagementButtonImage} />
        </TouchableOpacity>
      </View>
    );
  }
}

class EngagementButtons extends React.Component {
  render() {
    return (
      <View style={styles.engagementButtonsContainer}>
        <ShareButton />
        <CommentButton />
        <LikeButton />
      </View>
    );
  }
}

class BottomRow extends React.Component {
  render() {
    return (
      <View style={styles.bottomRowContainer}>
        <User />
        <EngagementButtons />
      </View>
    );
  }
}

class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <TopRow />
        <TextField style={styles.textFieldText} />
        <EngagementDataGroup />
        <BottomRow />
      </View>
    );
  }
}


const styles = StyleSheet.create({
    timeContainer: {
      // backgroundColor: colors.pale,
      flexDirection: 'row',
      // bottom: -10,
    },
    timeImageContainer: {
      // backgroundColor: colors.grapefruit50,
      padding: 2,
      justifyContent: "center",
    },
    timeImage: {
      // backgroundColor: colors.paleTurquoise,
      width: 10,
      height: 10,
    },
    timeTextContainer: {
      // backgroundColor: colors.brownGrey,
      padding: 2,
      justifyContent: "center",
    },
    timeText: {
      // backgroundColor: colors.lightPeriwinkle,
      fontSize: 8,
      fontWeight: "300",
      letterSpacing: 0,
      color: colors.dark
    },

    bookmarkContainer: {
      // backgroundColor: colors.lightPeriwinkle,
    },
    bookmarkImage: {
      // backgroundColor: colors.paleTurquoise,
      // position: 'absolute',
      width: 25,
      height: 25,
    },

    topRowContainer: {
      // backgroundColor: colors.lightPink,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    textFieldContainer: {
      // backgroundColor: colors.paleTurquoise,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 5,
    },
    textFieldText: {
      // backgroundColor: colors.lightPeriwinkle,
      fontSize: 14,
    },

    engagementDataContainer: {
      // backgroundColor: colors.paleTurquoise,
      paddingTop: 8,
      paddingRight: 5,
      flexDirection: 'row',
    },
    engagementDataTextContainer: {
      // backgroundColor: colors.brownGrey,
      paddingRight: 2,
    },
    engagementDataText: {
      // backgroundColor: colors.cloudyBlue,
      fontSize: 10,
    },

    engagementDataGroupContainer: {
      flexDirection: 'row',
    },

    userCommunityContainer: {
      // backgroundColor: colors.lightPeriwinkle,
      padding: 0,
    },
    userCommunityText: {
      // backgroundColor: colors.cloudyBlue,
      fontSize: 12,
      fontWeight: "300",
    },

    userNameContainer: {
      // backgroundColor: colors.lightPink,
      padding: 0,
    },
    userNameText: {
      // backgroundColor: colors.cloudyBlue,
      fontSize: 12,
      fontWeight: "300",
    },

    userContainer: {
      flexDirection: 'column',
      justifyContent: "center",
    },

    engagementButtonContainer: {
      // backgroundColor: colors.paleTurquoise,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    engagementButtonImage: {
      width: 25,
      height: 25,
    },

    engagementButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    bottomRowContainer: {
      // backgroundColor: colors.brownGrey,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    card: {
      // backgroundColor: colors.grapefruit50,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 10,
      borderStyle: "solid",
      borderWidth: 0.2,
      borderColor: "#979797",
      flexDirection: 'column',
    },
});


export default Card;
