import EAddress from '@/screens/EAddress';
import EBank from '@/screens/EBank';
import EBankDetail from '@/screens/EBankDetail';
import ECategory from '@/screens/ECategory';
import EConfirmed from '@/screens/EConfirmed';
import EFeedback from '@/screens/EFeedback';
import EFilter from '@/screens/EFilter';
import EFollowers from '@/screens/EFollowers';
import EMessages from '@/screens/EMessages';
import EMyOrder from '@/screens/EMyOrder';
import ENotification from '@/screens/ENotification';
import EPayment from '@/screens/EPayment';
import EProductDetail from '@/screens/EProductDetail';
import EProductPageNotFound from '@/screens/EProductPageNotFound';
import EProductStoreProfile from '@/screens/EProductStoreProfile';
import EReviews from '@/screens/EReviews';
import ESearchHistory from '@/screens/ESearchHistory';
import EShipping from '@/screens/EShipping';
import ETrackOrder from '@/screens/ETrackOrder';
import EWishlist from '@/screens/EWishlist';
/* Bottom E-Commerce Screen */
import ECart from '@/screens/ECart';
import EHome from '@/screens/EHome';
import EProduct from '@/screens/EProduct';
import EPost from '@/screens/EPost';
import Profile from '@/screens/Profile';
import { tabBarIcon, tabBarIconHaveNoty, BottomTabNavigatorMazi } from '@/navigation/components';

export const ECommerceTabScreens = {
  EHome: {
    component: EHome,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  EProduct: {
    component: EProduct,
    options: {
      title: 'products',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'th-large' }),
    },
  },
  News: {
    component: EPost,
    options: {
      title: 'news',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'book' }),
    },
  },
  ECart: {
    component: ECart,
    options: {
      title: 'cart',
      tabBarIcon: ({ color }) => tabBarIconHaveNoty({ color, name: 'shopping-cart' }),
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

const ECommerceMenu = () => <BottomTabNavigatorMazi tabScreens={ECommerceTabScreens} />;

export default {
  ECommerceMenu: {
    component: ECommerceMenu,
    options: {
      title: 'home',
    },
  },
  EAddress: {
    component: EAddress,
    options: {
      title: 'address',
    },
  },
  EBank: {
    component: EBank,
    options: {
      title: 'payment',
    },
  },
  EBankDetail: {
    component: EBankDetail,
    options: {
      title: 'payment_card',
    },
  },
  ECategory: {
    component: ECategory,
    options: {
      title: 'categories',
    },
  },
  EConfirmed: {
    component: EConfirmed,
    options: {
      title: 'completed',
    },
  },
  EFeedback: {
    component: EFeedback,
    options: {
      title: 'feedback',
    },
  },
  EFilter: {
    component: EFilter,
    options: {
      title: 'filtering',
    },
  },
  EFollowers: {
    component: EFollowers,
    options: {
      title: 'followers',
    },
  },
  EMessages: {
    component: EMessages,
    options: {
      title: 'message',
    },
  },
  EMyOrder: {
    component: EMyOrder,
    options: {
      title: 'order_history',
    },
  },
  ENotification: {
    component: ENotification,
    options: {
      title: 'notification',
    },
  },
  EPayment: {
    component: EPayment,
    options: {
      title: 'choose_payment_card',
    },
  },
  EProductDetail: {
    component: EProductDetail,
    options: {
      title: 'product_detail',
    },
  },
  EProductPageNotFound: {
    component: EProductPageNotFound,
    options: {
      title: 'product_not_found',
    },
  },
  EProductStoreProfile: {
    component: EProductStoreProfile,
    options: {
      title: 'store',
    },
  },
  EReviews: {
    component: EReviews,
    options: {
      title: 'customer_review',
    },
  },
  ESearchHistory: {
    component: ESearchHistory,
    options: {
      title: 'search',
    },
  },
  EShipping: {
    component: EShipping,
    options: {
      title: 'shipping',
    },
  },
  ETrackOrder: {
    component: ETrackOrder,
    options: {
      title: 'track_order',
    },
  },
  EWishlist: {
    component: EWishlist,
    options: {
      title: 'wishlist',
    },
  },
};
