import { useTranslation } from 'react-i18next';
import { ScrollView, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import { Images, useTheme } from '@/config';
import { CardSlide, Image, MusicPlaySong, NewsGrid2, ProductCard6, Text } from '@/components';
import { ContinueListening, TopEpisodes, FeaturedData, TopShows, LiveStreaming, Events } from '@/data/music';
import styles from './styles';
import Featured from './Featured';

const Content = ({
  banner = Images.music11,
  continueListeningData = ContinueListening,
  topEpisodesData = TopEpisodes,
  featuredData = FeaturedData,
  eventsData = Events,
  topShowsData = TopShows,
  liveStreamingData = LiveStreaming,
}) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const goToPage = (pageName) => () => navigation.navigate(pageName);

  const getPropsNewsGrid2 = (index) => ({
    marginRight: index === continueListeningData.length - 1 ? 0 : 15,
  });

  const getPropsProductCard6 = (index) => ({
    width: width * 0.65,
    marginRight: index !== topEpisodesData.length - 1 ? 20 : 0,
  });

  const getPropsFeatured = (index) => ({
    marginRight: index !== featuredData.length - 1 ? 15 : 0,
  });

  const getPropsTopShows = (index) => ({
    marginRight: index === topShowsData.length - 1 ? 0 : 15,
  });

  const getPropsLiveStreaming = (index) => ({
    marginRight: index === liveStreamingData.length - 1 ? 0 : 15,
  });

  return (
    <View style={styles.flex1}>
      <ScrollView
        contentContainerStyle={styles.paddingScrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Image source={banner} style={styles.banner} borderRadius={10} />
        <View style={styles.topicsView}>
          <Text title3>{t('music_continue_listening')}</Text>
          <ScrollView
            contentContainerStyle={styles.paddingFlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {continueListeningData.map((item, index) => (
              <NewsGrid2
                key={index.toString()}
                image={item.image}
                title={item.name}
                style={getPropsNewsGrid2(index)}
                onPress={goToPage('MLikedSongs')}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.topicsView}>
          <Text title3>{t('music_top_episodes')}</Text>
          <ScrollView
            contentContainerStyle={styles.marginTop10}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {topEpisodesData.map((data, index) => (
              <View key={String(index)} style={getPropsProductCard6(index)}>
                {data.map((item, indexChild) => (
                  <ProductCard6
                    key={String(indexChild)}
                    isPlaying={false}
                    image={item.image}
                    title={item.name}
                    dateTime={item.description}
                    onPress={goToPage('MPlay')}
                    onMore={() => {}}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.topicsView}>
          <Text title3>{t('music_featured')}</Text>
          <ScrollView
            contentContainerStyle={styles.marginTop15}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {featuredData.map((item, index) => (
              <Featured
                key={String(index)}
                style={getPropsFeatured(index)}
                image={item.image}
                avatar={item.avatar}
                name={item.name}
                description={item.description}
                onPress={goToPage('MArtis')}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.topicsView}>
          <Text title3>{t('music_events')}</Text>
          <View style={styles.eventView}>
            <Swiper
              autoplay
              dotStyle={styles.dotStyle}
              activeDotStyle={styles.activeDotStyle}
              paginationStyle={styles.paginationStyle}
              loop={true}
              activeDotColor={colors.primary}
              removeClippedSubviews={false}
            >
              {eventsData.map((item, key) => {
                return (
                  <TouchableOpacity key={key} style={styles.eventTouch} activeOpacity={1} onPress={() => null}>
                    <Image source={item.image} style={styles.event} borderRadius={10} />
                  </TouchableOpacity>
                );
              })}
            </Swiper>
          </View>
        </View>
        <View style={styles.topicsView}>
          <Text title3>{t('music_top_shows')}</Text>
          <ScrollView
            contentContainerStyle={styles.marginTop15}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {topShowsData.map((item, index) => (
              <NewsGrid2
                key={index.toString()}
                image={item.image}
                title={item.name}
                style={getPropsTopShows(index)}
                onPress={goToPage('MLikedSongs')}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.topicsView}>
          <Text title3>{t('music_live_streaming')}</Text>
          <ScrollView
            contentContainerStyle={styles.paddingFlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {liveStreamingData.map((item, index) => (
              <CardSlide
                key={index.toString()}
                style={getPropsLiveStreaming(index)}
                image={item.image}
                date={item.time}
                title={item.name}
                onPress={goToPage('MAlbum')}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.playSong}>
        <MusicPlaySong
          image={Images.music12}
          name="In The Star Light - Kyle Coline"
          description="Vivamus magna justo, lacinia eget consectetur …"
          percent={80}
        />
      </View>
    </View>
  );
};

export default Content;
