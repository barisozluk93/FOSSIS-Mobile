import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View, ImageBackground } from 'react-native';
import { BaseColor, BaseStyle, Images } from '@/config';
import { TopHits, JustTheHits, MakeForYou, PopularAlbums, TopArtist, BestSongs } from '@/data/music';
import {
  CardChannelGrid,
  CategoryList2,
  GridList,
  HeaderLargeTitleBadge,
  Icon,
  MusicPlaySong,
  NewsGrid2,
  ProductCard5,
  ProfileGrid2,
  SafeAreaView,
  Text,
  CategoryGrid2,
} from '@/components';
import styles from './styles';

const MHome = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();

  const goToPage = (pageName) => () => navigation.navigate(pageName);

  const renderContent = () => {
    return (
      <View style={[styles.flex1]}>
        <View style={styles.header}>
          <View style={styles.flex1}>
            <Text title3>{t('music_good_morning')}</Text>
          </View>
          <TouchableOpacity onPress={goToPage('MProfile')}>
            <Icon name="cog" solid color={BaseColor.grayColor} size={18} style={styles.cog} />
          </TouchableOpacity>
          <View style={styles.notification}>
            <HeaderLargeTitleBadge onPress={goToPage('MNotification')} />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.paddingScrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <GridList
            columns={2}
            data={TopHits}
            renderItem={({ item, index }) => (
              <View
                style={{
                  paddingRight: index % 2 === 0 ? 5 : 0,
                  paddingLeft: index % 2 !== 0 ? 5 : 0,
                }}
              >
                <CategoryList2
                  key={index.toString()}
                  image={item.image}
                  title={item.name}
                  style={{
                    marginVertical: 5,
                    window: '100%',
                  }}
                  onPress={goToPage('MLikedSongs')}
                />
              </View>
            )}
          />
          <View style={styles.topicsView}>
            <Text title3>{t('music_just_the_hits')}</Text>
            <ScrollView
              contentContainerStyle={styles.paddingFlatList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {JustTheHits.map((item, index) => (
                <NewsGrid2
                  key={index.toString()}
                  image={item.image}
                  title={item.name}
                  style={{
                    marginRight: index === JustTheHits.length - 1 ? 0 : 15,
                  }}
                  onPress={goToPage('MPlay')}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.topicsView}>
            <Text title3>{t('music_make_for_you')}</Text>
            <TouchableOpacity onPress={goToPage('MLikedSongs')}>
              <ImageBackground borderRadius={10} source={Images.music21} style={styles.discoverWeekly}>
                <View style={{ padding: 10, flex: 1 }}>
                  <Text headline whiteColor>
                    Discover Weekly
                  </Text>
                  <Text caption2 whiteColor>
                    Your weekly mix
                  </Text>
                </View>

                <Icon name="arrow-right" size={12} color={BaseColor.whiteColor} style={{ padding: 10 }} />
              </ImageBackground>
            </TouchableOpacity>
            <ScrollView
              contentContainerStyle={styles.paddingFlatList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {MakeForYou.map((item, index) => (
                <CategoryGrid2
                  key={index.toString()}
                  image={item.image}
                  title={item.name}
                  style={{
                    marginRight: index === MakeForYou.length - 1 ? 0 : 15,
                  }}
                  onPress={goToPage('MArtis')}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.topicsView}>
            <Text title3>{t('music_popular_albums')}</Text>
            <ScrollView
              contentContainerStyle={styles.paddingFlatList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {PopularAlbums.map((item, index) => (
                <CardChannelGrid
                  key={index.toString()}
                  onPress={goToPage('MAlbum')}
                  style={{
                    marginTop: 0,
                    marginRight: index === PopularAlbums.length - 1 ? 0 : 15,
                  }}
                  image={item.image}
                  title={item.name}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.marginTop10}>
            <Text title3 style={{ marginBottom: 5 }}>
              {t('music_top_artist')}
            </Text>
            <GridList
              columns={3}
              data={TopArtist}
              renderItem={({ index, item }) => (
                <View style={{ paddingHorizontal: 5, paddingTop: 10 }}>
                  <ProfileGrid2
                    key={index.toString()}
                    image={item.image}
                    name={item.name}
                    onPress={goToPage('MProfile')}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.topicsView}>
            <Text title3 style={{ marginBottom: 10 }}>
              {t('music_best_songs')}
            </Text>
            {BestSongs.map((item, index) => (
              <ProductCard5
                key={index.toString()}
                image={item.image}
                title={item.name}
                dateTime={item.createdAt}
                hours={item.time}
                playTime={item.playTime}
                price={item.price}
                onPress={goToPage('MPlay')}
              />
            ))}
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

  return (
    <View style={styles.flex1}>
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default MHome;
