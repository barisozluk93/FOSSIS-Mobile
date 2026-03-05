import { StyleSheet } from 'react-native';
import { BaseColor } from '@/config';

export default StyleSheet.create({
  profileImage: {
    position: 'absolute',
    zIndex: 100,
  },
  headerStyle: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 200
  },
  headerImageStyle: {
    // height: 250,
    width: '100%',
    top: 0,
    alignSelf: 'center',
    position: 'absolute',
    // zIndex: 999,
    paddingBottom: 30,
  },
  // imgBanner: {
  //     width: "100%",
  //     height: 250,
  //     position: "absolute"
  // },
  lineSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  contentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: BaseColor.dividerColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    marginRight: 5,
  },
  tabbar: {
    backgroundColor: 'white',
    height: 40,
  },
  tab: {
    width: 130,
  },
  label: {
    fontWeight: '400',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentInforAction: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  lineWorkHours: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: BaseColor.dividerColor,
  },
  wrapContent: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 20,
    // borderBottomWidth: 1,
    borderColor: BaseColor.dividerColor,
    marginBottom: 30,
  },
  contentDescription: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewIcon: {
    // width: 60,
    // height: 60,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    // left: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  costPrice: { paddingHorizontal: 8, textDecorationLine: 'line-through' },
  specifications: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10,
    overflow: 'hidden',
  },
  follow: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  iconComments: {
    width: 24,
    height: 24,
  },
  viewProfilePerformance: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
