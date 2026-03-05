import FActivity from '@/screens/FActivity';
import FActivityFilter from '@/screens/FActivityFilter';
import FAddTransaction from '@/screens/FAddTransaction';
import FBank from '@/screens/FBank';
import FCategory from '@/screens/FCategory';
import FChooseCategory from '@/screens/FChooseCategory';
import FChooseCurrency from '@/screens/FChooseCurrency';
import FChooseFriend from '@/screens/FChooseFriend';
import FChooseLocation from '@/screens/FChooseLocation';
import FConfirmation from '@/screens/FConfirmation';
import FHistory from '@/screens/FHistory';
import FHistoryDetail from '@/screens/FHistoryDetail';
import { Dashboard1, Dashboard2, Dashboard4, Dashboard5, Dashboard6 } from '@/screens/FHome';
import FNotification from '@/screens/FNotification';
import FSendMoney from '@/screens/FSendMoney';
import FTopUp from '@/screens/FTopUp';
import FTopUpCompleted from '@/screens/FTopUpCompleted';
import FTopUpConfirmation from '@/screens/FTopUpConfirmation';
import FTransactionCompleted from '@/screens/FTransactionCompleted';
import Profile from '@/screens/Profile';
import { BottomTabNavigatorMazi, tabBarIcon } from '@/navigation/components';

export const WalletTabScreens = {
  FHome: {
    component: Dashboard1,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  FReport: {
    component: Dashboard6,
    options: {
      title: 'report',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'chart-area' }),
    },
  },
  FActivity: {
    component: FActivity,
    options: {
      title: 'activities',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'rss' }),
    },
  },
  Profile: {
    component: Profile,
    options: {
      title: 'account',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'cog' }),
    },
  },
};

const WalletMenu = () => <BottomTabNavigatorMazi tabScreens={WalletTabScreens} />;

export default {
  WalletMenu: {
    component: WalletMenu,
    options: {
      title: 'home',
    },
  },
  FCategory: {
    component: FCategory,
    options: {
      title: 'categories',
    },
  },
  Dashboard2: {
    component: Dashboard2,
    options: {
      title: 'dashboard_line_chart',
    },
  },
  Dashboard4: {
    component: Dashboard4,
    options: {
      title: 'dashboard_bar_chart',
    },
  },
  Dashboard5: {
    component: Dashboard5,
    options: {
      title: 'dashboard_circle_chart',
    },
  },
  FAddTransaction: {
    component: FAddTransaction,
    options: {
      title: 'add_transaction',
    },
  },
  FChooseCategory: {
    component: FChooseCategory,
    options: {
      title: 'choose_a_category',
    },
  },
  FChooseLocation: {
    component: FChooseLocation,
    options: {
      title: 'choose_location',
    },
  },
  FChooseCurrency: {
    component: FChooseCurrency,
    options: {
      title: 'choose_a_currency',
    },
  },
  FChooseFriend: {
    component: FChooseFriend,
    options: {
      title: 'choose_friend',
    },
  },
  FSendMoney: {
    component: FSendMoney,
    options: {
      title: 'transfer_amount',
    },
  },
  FBank: {
    component: FBank,
    options: {
      title: 'send_money',
    },
  },
  FConfirmation: {
    component: FConfirmation,
    options: {
      title: 'transfer_confirmation',
    },
  },
  FTransactionCompleted: {
    component: FTransactionCompleted,
    options: {
      title: 'transaction_completed',
    },
  },
  FHistory: {
    component: FHistory,
    options: {
      title: 'transfer_history',
    },
  },
  FHistoryDetail: {
    component: FHistoryDetail,
    options: {
      title: 'detailed_history',
    },
  },
  FActivityFilter: {
    component: FActivityFilter,
    options: {
      title: 'activity_filter',
    },
  },
  FTopUp: {
    component: FTopUp,
    options: {
      title: 'topup',
    },
  },
  FTopUpConfirmation: {
    component: FTopUpConfirmation,
    options: {
      title: 'topup_confirmation',
    },
  },
  FTopUpCompleted: {
    component: FTopUpCompleted,
    options: {
      title: 'topup_completed',
    },
  },
  FNotification: {
    component: FNotification,
    options: {
      title: 'notification',
    },
  },
};
