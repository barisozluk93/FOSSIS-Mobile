import { StyleSheet } from 'react-native';
import * as Utils from '@/utils';

export default StyleSheet.create({
  imageBackground: {
    height: ((Utils.getWidthDevice() - 40) * 9) / 16,
    width: '100%',
    position: 'relative',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  salePercent: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(120),
    height: Utils.scaleWithPixel(120),
    borderRadius: 8,
  },
  salePercentList: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingBottom: 2,
  },
  imageBackgroundGrid1: {
    width: '100%',
    height: Utils.scaleWithPixel(200),
  },
  grid1: {
    width: '50%',
    paddingVertical: 10,
  },
  imageBackgroundGrid2: {
    width: '100%',
    height: Utils.scaleWithPixel(120),
  },
  imageBackgroundCard1: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(110),
  },

  imageBackgroundCard3: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
  },
  viewItemList: {
    marginVertical: 8,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
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
    borderRadius: 36,
  },
  costPrice: { paddingHorizontal: 8, textDecorationLine: 'line-through' },
});
