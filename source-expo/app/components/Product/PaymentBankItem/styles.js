import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  paymentBankItem: {
    width: '100%',
    height: Utils.scaleWithPixel(80),
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  paymentBankItemLogo: {
    width: Utils.scaleWithPixel(36),
    height: Utils.scaleWithPixel(36),
    // borderRadius: 36,
  },
});
