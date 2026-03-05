import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentBankItem: {
    width: '100%',
    height: Utils.scaleWithPixel(80),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // ...Platform.select({
    //   android: {
    //     elevation: 1,
    //   },
    //   default: {
    //     shadowColor: "rgba(0,0,0, .2)",
    //     shadowOffset: { height: 0, width: 0 },
    //     shadowOpacity: 3,
    //     shadowRadius: 3,
    //   },
    // }),
    // padding: 8,
  },
  paymentBankItemLogo: {
    width: '100%',
    height: Utils.scaleWithPixel(79),
  },
});
