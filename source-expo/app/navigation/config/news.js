import NFeedback from '@/screens/NFeedback';
import NFilter from '@/screens/NFilter';
import NMessages from '@/screens/NMessages';
import NMessenger from '@/screens/NMessenger';
import NNotification from '@/screens/NNotification';
import NPostDetail from '@/screens/NPostDetail';
import NSearch from '@/screens/NSearch';
import NSearchHistory from '@/screens/NSearchHistory';
/* Bottom News Screen */
import NHome from '@/screens/NHome';
import NPost from '@/screens/NPost';
import Profile from '@/screens/Profile';
import NCategory from '@/screens/NCategory';
import NFavourite from '@/screens/NFavourite';
import { tabBarIcon, tabBarIconHaveNoty, BottomTabNavigatorMazi } from '@/navigation/components';

export const NewsTabScreens = {
  NHome: {
    component: NHome,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  NCategory: {
    component: NCategory,
    options: {
      title: 'category',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'th-large' }),
    },
  },
  NPost: {
    component: NPost,
    options: {
      title: 'posts',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'file' }),
    },
  },
  NFavourite: {
    component: NFavourite,
    options: {
      title: 'favorites',
      tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: 'bookmark' }),
    },
  },
  Profile: {
    component: Profile,
    options: {
      title: 'account',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'user-circle' }),
    },
  },
};

const NewsMenu = () => <BottomTabNavigatorMazi tabScreens={NewsTabScreens} />;

export default {
  NewsMenu: {
    component: NewsMenu,
    options: {
      title: 'home',
    },
  },
  NFeedback: {
    component: NFeedback,
    options: {
      title: 'feedback',
    },
  },
  NFilter: {
    component: NFilter,
    options: {
      title: 'filtering',
    },
  },
  NMessages: {
    component: NMessages,
    options: {
      title: 'message',
    },
  },
  NMessenger: {
    component: NMessenger,
    options: {
      title: 'messenger',
    },
  },
  NNotification: {
    component: NNotification,
    options: {
      title: 'notification',
    },
  },
  NPostDetail: {
    component: NPostDetail,
    options: {
      title: 'post_detail',
    },
  },
  NSearch: {
    component: NSearch,
    options: {
      title: 'search',
    },
  },
  NSearchHistory: {
    component: NSearchHistory,
    options: {
      title: 'search_history',
    },
  },
};
