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
  header: {
    backgroundColor: colors.paleSalmon,
    height: 0,
    borderColor: colors.paleSalmon,
  },
  button: {
    // backgroundColor: colors.paleSalmon,
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  Touchbutton: {
    borderRadius: 20,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
});
