import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  contentPickDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 10,
  },
  itemPick: {
    flex: 1,
    justifyContent: 'center',
  },
  linePick: {
    width: 1,
    backgroundColor: BaseColor.dividerColor,
    marginRight: 10,
  },
  right: {
    alignItems: 'flex-end',
  },
});
