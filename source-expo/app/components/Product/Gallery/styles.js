import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  image: { height: '100%', width: '100%', borderRadius: 8 },
  viewMore: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Utils.parseHexTransparency('#000000', 30),
  },
});
