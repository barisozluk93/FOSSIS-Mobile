import { Images, ThemeSupport } from '@/config';

export const IMAGE_REVIEW = {
  orange: [Images.orangeHome, Images.orangeDetail, Images.orangeSetting],
  pink: [Images.pinkHome, Images.pinkDetail, Images.pinkSetting],
  blue: [Images.blueHome, Images.blueDetail, Images.blueSetting],
  green: [Images.greenHome, Images.greenDetail, Images.greenSetting],
  yellow: [Images.yellowHome, Images.yellowDetail, Images.yellowSetting],
};

export const THEME = ThemeSupport.map((item) => ({
  name: item.theme,
  theme: item.theme,
  color: item.light.colors.primary,
  images: IMAGE_REVIEW[item.theme],
}));
