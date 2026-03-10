import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  contain: {
    padding: 20,
    width: '100%',
  },
  textInput: {
    height: 46,
    // backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  textInputName: {
    height: 46,
    // backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '48.5%',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
  }
});
