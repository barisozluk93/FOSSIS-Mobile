import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardImage: {
    alignItems: 'center',
  },
  cardTitle: {
    position: 'absolute',
    padding: 20,
    right: 0,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 25,
  },
  description: {
    paddingVertical: 5,
  },
  playSong: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
  },
  timeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  toolView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    alignItems: 'center',
  },
});
