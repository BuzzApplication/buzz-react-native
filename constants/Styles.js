import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export default StyleSheet.create({

  TouchableOpacityStyle:{
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 0,
  },
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FloatingButtonStyle: {
    // resizeMode: 'contain',
    width: 70,
    height: 70,
  },

  // Community Header Tab
  communityHeaderStyle: {
    width: 375,
    height: 87,
    backgroundColor: colors.paleSalmon,
  },
  communityHeaderTextStyle: {
    width: 87,
    height: 57,
    fontFamily: 'open-sans',
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: colors.dark
  },
  communityHeaderTextUnderlineStyle: {
    backgroundColor: colors.paleSalmon
  },


  button: {
    // backgroundColor: colors.paleSalmon,
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
});
