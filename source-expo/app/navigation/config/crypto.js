import FCrypto060708 from '@/screens/FCrypto060708';
import FCryptol01 from '@/screens/FCryptol01';
import FCryptol02 from '@/screens/FCryptol02';
import { Dashboard3, Dashboard7 } from '@/screens/FHome';
import FPost from '@/screens/FPost';
import Profile from '@/screens/Profile';
import { BottomTabNavigatorMazi, tabBarIcon } from '@/navigation/components';

export const CryptoTabScreens = {
  CHome: {
    component: Dashboard7,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  CMarket: {
    component: FCryptol01,
    options: {
      title: 'market',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'chart-bar' }),
    },
  },
  CNews: {
    component: FPost,
    options: {
      title: 'news',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'file' }),
    },
  },
  Profile: {
    component: Profile,
    options: {
      title: 'setting',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'cog' }),
    },
  },
};

const CryptoMenu = () => <BottomTabNavigatorMazi tabScreens={CryptoTabScreens} />;

export default {
  CryptoMenu: {
    component: CryptoMenu,
    options: {
      title: 'home',
    },
  },
  Dashboard3: {
    component: Dashboard3,
    options: {
      title: 'report',
    },
  },
  FCryptol02: {
    component: FCryptol02,
    options: {
      title: 'detailed_information',
    },
  },
  FCrypto060708: {
    component: FCrypto060708,
    options: {
      title: 'activities',
    },
  },
};
