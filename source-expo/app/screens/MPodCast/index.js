import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SceneMap } from 'react-native-tab-view';
import { BaseStyle, Images } from '@/config';
import { SafeAreaView, TabSlider, Text } from '@/components';
import {
  ContinueListeningPodcast,
  TopEpisodesPodcast,
  FeaturedDataPodcast,
  TopShowsPodcast,
  LiveStreamingPodcast,
  EventsPodcast,
  ContinueListeningAudioBook,
  TopEpisodesAudioBook,
  FeaturedDataAudioBook,
  TopShowsAudioBook,
  LiveStreamingAudioBook,
  EventsAudioBook,
  ContinueListeningRadio,
  TopEpisodesRadio,
  FeaturedDataRadio,
  TopShowsRadio,
  LiveStreamingRadio,
  EventsRadio,
} from '@/data/music';
import Content from './Content';
import styles from './styles';

const ScreenDemo = () => {
  return <Content />;
};

const ContentPodcast = () => {
  return (
    <Content
      banner={Images.music12}
      continueListeningData={ContinueListeningPodcast}
      topEpisodesData={TopEpisodesPodcast}
      featuredData={FeaturedDataPodcast}
      eventsData={EventsPodcast}
      topShowsData={TopShowsPodcast}
      liveStreamingData={LiveStreamingPodcast}
    />
  );
};

const ContentAudioBook = () => {
  return (
    <Content
      banner={Images.music13}
      continueListeningData={ContinueListeningAudioBook}
      topEpisodesData={TopEpisodesAudioBook}
      featuredData={FeaturedDataAudioBook}
      eventsData={EventsAudioBook}
      topShowsData={TopShowsAudioBook}
      liveStreamingData={LiveStreamingAudioBook}
    />
  );
};

const ContentRadio = () => {
  return (
    <Content
      banner={Images.music14}
      continueListeningData={ContinueListeningRadio}
      topEpisodesData={TopEpisodesRadio}
      featuredData={FeaturedDataRadio}
      eventsData={EventsRadio}
      topShowsData={TopShowsRadio}
      liveStreamingData={LiveStreamingRadio}
    />
  );
};

const MPodCast = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    forYou: ScreenDemo,
    podcast: ContentPodcast,
    audioBook: ContentAudioBook,
    radio: ContentRadio,
  });
  const [routes] = useState([
    { key: 'forYou', title: 'For you' },
    { key: 'podcast', title: 'Podcast' },
    { key: 'audioBook', title: 'Audiobook' },
    { key: 'radio', title: 'Radio' },
  ]);

  return (
    <View style={styles.flex1}>
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
        <View style={[styles.flex1]}>
          <View style={styles.header}>
            <Text title3>{t('music_podcast')}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <TabSlider
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              tabBarProps={{ style: { marginHorizontal: 6 } }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MPodCast;
