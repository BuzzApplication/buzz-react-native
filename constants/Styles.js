import { StyleSheet } from 'react-native';
import { colors } from './Colors';

export default StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: colors.paleSalmon,
    height: 0,
    borderColor: colors.paleSalmon,
  },
  button: {
    // backgroundColor: 'green',
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },

});
