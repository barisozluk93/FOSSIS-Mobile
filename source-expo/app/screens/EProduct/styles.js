import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  navbar: {
    backgroundColor: BaseColor.whiteColor,
    height: 40,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  followLocationIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BaseColor.whiteColor,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
});
