import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
  },
  contain: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  image: {
    height: Utils.scaleWithPixel(40),
    width: Utils.scaleWithPixel(40),
  },
  text: {
    textAlign: 'right',
  },
  content: {
    paddingLeft: 5,
    flex: 1,
  },
  viewDescription: { flexDirection: 'row', alignItems: 'center' },
  description: { flex: 1 },
  progress: { flex: 1, paddingTop: 8 },
});
