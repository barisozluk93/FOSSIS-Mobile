import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    height: Utils.scaleWithPixel(50),
  },
  text: {
    textTransform: 'uppercase',
  },
  textCenter: {
    textAlign: 'center',
  },
  textMarginCenter: {
    marginVertical: 3,
  },
});
