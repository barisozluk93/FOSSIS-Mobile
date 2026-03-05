import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  paddingScrollView: { padding: 20, paddingTop: 15 },
  paddingFlatList: {
    paddingTop: 15,
  },
  topicsView: {
    marginTop: 20,
  },
  flex1: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  playSong: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
  banner: { width: '100%', height: 120 },
  marginTop10: { paddingTop: 10 },
  marginTop15: { paddingTop: 15 },
  eventView: { height: 180 },
  dotStyle: {
    backgroundColor: BaseColor.dividerColor,
    marginBottom: 15,
  },
  activeDotStyle: {
    marginBottom: 15,
  },
  paginationStyle: { bottom: 0 },
  event: {
    width: '100%',
    height: 160,
    marginTop: 15,
  },
  eventTouch: { flex: 1 },
});
