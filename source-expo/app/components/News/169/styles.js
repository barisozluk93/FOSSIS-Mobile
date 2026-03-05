import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 40) * 9) / 16,
    width: '100%',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
});
