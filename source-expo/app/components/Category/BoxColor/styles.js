import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  container: {
    width: '50%',
  },
  imageBackground: {
    backgroundColor: '#FF8A65',
    height: 80,
    width: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  viewIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: BaseColor.whiteColor,
  },
  imageBackgroundLoading: {
    height: 80,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
