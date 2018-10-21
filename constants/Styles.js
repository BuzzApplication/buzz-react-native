import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export default StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
  },
  button: {
    // backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    zIndex: 1,
  },
  buttonShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  bottomBorder: {
    borderStyle: "solid",
    borderWidth: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
