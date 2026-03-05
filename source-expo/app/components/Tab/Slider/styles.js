import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  tabbar: {
    backgroundColor: BaseColor.whiteColor,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    padding: 0,
    paddingHorizontal: 5,
  },
  tab: {
    width: 'auto',
    padding: 4,
  },
  viewLabel: {
    width: 'auto',
    alignSelf: 'flex-start',
    borderBottomWidth: 3,
    paddingBottom: 5,
    marginHorizontal: 5,
  },
});
