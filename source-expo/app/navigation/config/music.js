import { Pressable, StyleSheet } from 'react-native';
/* Bottom News Screen */
import MHome from '@/screens/MHome';
import MSearch from '@/screens/MSearch';
import MPodCast from '@/screens/MPodCast';
import MLibrary from '@/screens/MLibrary';
import MPlay from '@/screens/MPlay';
import MLikedSongs from '@/screens/MLikedSongs';
import MAlbum from '@/screens/MAlbum';
import MArtis from '@/screens/MArtis';
import MNotification from '@/screens/MNotification';
import MProfile from '@/screens/MProfile';
import MUpload from '@/screens/MUpload';
import { useTheme } from '@/config';
import { Icon } from '@/components';
import * as rootNavigation from '@/navigation/rootNavigation';

import { tabBarIcon, BottomTabNavigatorMazi } from '@/navigation/components';

const styles = StyleSheet.create({
  button: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

const SubmitButton = (props) => {
  const { colors } = useTheme();
  return (
    <Pressable {...props} style={[styles.button, { backgroundColor: colors.primary }]}>
      <Icon name="plus" color="white" />
    </Pressable>
  );
};

export const MusicTabScreens = {
  Home: {
    component: MHome,
    options: {
      title: 'home',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'home' }),
    },
  },
  MSearch: {
    component: MSearch,
    options: {
      title: 'search',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'search' }),
    },
  },
  MAdd: {
    component: MSearch,
    options: {
      // title: 'posts',
      tabBarButton: (props) => <SubmitButton {...props} onPress={() => rootNavigation.navigate('MUpload')} />,
    },
  },
  MPodCast: {
    component: MPodCast,
    options: {
      title: 'podcast',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'headphones' }),
    },
  },
  MLibrary: {
    component: MLibrary,
    options: {
      title: 'library',
      tabBarIcon: ({ color }) => tabBarIcon({ color, name: 'book' }),
    },
  },
};

const MusicMenu = () => <BottomTabNavigatorMazi tabScreens={MusicTabScreens} />;

export default {
  MusicMenu: {
    component: MusicMenu,
    options: {
      title: 'home',
    },
  },
  MAlbum: {
    component: MAlbum,
    options: {
      title: 'music_album',
    },
  },
  MArtis: {
    component: MArtis,
    options: {
      title: 'music_artis',
    },
  },
  MNotification: {
    component: MNotification,
    options: {
      title: 'music_notification',
    },
  },
  MProfile: {
    component: MProfile,
    options: {
      title: 'music_profile',
    },
  },
  MLikedSongs: {
    component: MLikedSongs,
    options: {
      title: 'music_list_song',
    },
  },
  MPlay: {
    component: MPlay,
    options: {
      title: 'music_play',
    },
  },
  MUpload: {
    component: MUpload,
    options: {
      title: 'music_upload',
      presentation: 'modal',
      headerShown: false,
    },
  },
};
