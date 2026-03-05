import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contain: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentLeft: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  nickName: {
    marginTop: 3,
    paddingRight: 10,
  },
  overview: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
