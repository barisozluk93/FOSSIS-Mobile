import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardImage: {
    position: 'relative',
  },
  cardTitle: {
    position: 'absolute',
    padding: 20,
    right: 0,
    alignItems: 'flex-end',
  },
  image: {
    height: 120,
    width: '100%',
  },
  description: {
    paddingVertical: 5,
    marginTop: 5,
  },
  playSong: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
  },
});
