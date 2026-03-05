import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  contain: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    width: 1,
    height: 14,
    backgroundColor: BaseColor.grayColor,
    marginLeft: 10,
  },
  contentModeView: {
    width: 30,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});
