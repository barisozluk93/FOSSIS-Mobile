import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 65,
    padding: 10,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    overflow: 'hidden',
  }
});
