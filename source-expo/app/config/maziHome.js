import {
  ECommerceScreens,
  FinanceScreens,
  FryptoScreens,
  ModalScreens,
  NewsScreens,
  ShareScreens,
  ProjectScreens,
  MusicScreens,
} from '@/navigation/config';
import { parseHexTransparency } from '@/utils';
import { Images, BaseColor } from '@/config';

const CommonScreens = { ...ShareScreens, ...ModalScreens };

export const MaziListApp = [
  {
    id: 'MaziHome',
    title: 'home',
    image: '',
    subtitle: '',
    screens: FinanceScreens,
    icon: 'home',
    isHideInHome: true,
    isHideInScreens: true,
    backgroundColor: parseHexTransparency(BaseColor.pinkLightColor, 75),
  },
  {
    id: 'WalletMenu',
    title: 'wallet_app',
    image: Images.dashboardWallet,
    subtitle: `${Object.keys(FinanceScreens).length}+ UI KITs`,
    screens: FinanceScreens,
    icon: 'wallet',
    backgroundColor: parseHexTransparency(BaseColor.orangeColor, 75),
  },
  {
    id: 'CryptoMenu',
    title: 'crypto_app',
    image: Images.dashboardCrypto,
    subtitle: `${Object.keys(FryptoScreens).length}+ UI KITs`,
    screens: FryptoScreens,
    icon: 'bitcoin',
    backgroundColor: parseHexTransparency(BaseColor.pinkColor, 75),
  },
  {
    id: 'ECommerceMenu',
    title: 'ecommerce_app',
    image: Images.dashboardEcomercial,
    subtitle: `${Object.keys(ECommerceScreens).length}+ UI KITs`,
    screens: ECommerceScreens,
    icon: 'shopping-cart',
    backgroundColor: parseHexTransparency(BaseColor.blueColor, 75),
  },
  {
    id: 'NewsMenu',
    title: 'news_app',
    image: Images.dashboardNews,
    subtitle: `${Object.keys(NewsScreens).length}+ UI KITs`,
    screens: NewsScreens,
    icon: 'newspaper',
    backgroundColor: parseHexTransparency(BaseColor.kashmir, 75),
  },
  {
    id: 'ProjectMenu',
    title: 'project_management',
    image: Images.dashboardProject,
    subtitle: `${Object.keys(ProjectScreens).length}+ UI KITs`,
    screens: ProjectScreens,
    icon: 'project-diagram',
    backgroundColor: parseHexTransparency(BaseColor.greenColor, 75),
  },
  {
    id: 'MusicMenu',
    title: 'music_app',
    image: Images.dashboardMusic,
    subtitle: `${Object.keys(MusicScreens).length}+ UI KITs`,
    screens: MusicScreens,
    icon: 'music',
    backgroundColor: parseHexTransparency(BaseColor.navyBlue, 75),
  },
  {
    id: 'Common',
    description:
      'Fully completed react-native news app that provides most common screens required by any E-commerce app.',
    title: 'Common',
    image: Images.logo,
    subtitle: `${Object.keys(CommonScreens).length}+ UI KITs`,
    screens: CommonScreens,
    icon: '',
    isHideInHome: true,
    isHideInScreens: false,
  },
];
