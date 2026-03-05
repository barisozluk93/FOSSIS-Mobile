import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentFilterBottom: {
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: '90%',
  },
  contentSwipeDown: {
    paddingBottom: 3,
    alignItems: 'center',
  },
  lineSwipeDown: {
    borderRadius: 10,
    width: 55,
    height: 2.5,
    backgroundColor: BaseColor.whiteColor,
  },
  image: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginRight: 8,
  },
});
