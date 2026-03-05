import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HomeChannelData, HomeListData, HomePopularData, HomeTopicData, PostListData } from '@/data';
import { BaseStyle } from '@/config';
import { CardChannelGrid, CardSlide, CategoryList, News43, NewsList, SafeAreaView, Text } from '@/components';
import styles from './styles';

const NHome = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goPost = (item) => () => {
    navigation.navigate('NPost', { item: item });
  };

  const goPostDetail = (item) => () => {
    navigation.navigate('NPostDetail', { item: item });
  };

  const goToCategory = () => {
    navigation.navigate('NCategory');
  };

  const renderContent = () => {
    const mainNews = PostListData[0];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          <Text header bold>
            {t('today')}
          </Text>
          <Text subhead grayColor style={{ marginTop: 5 }}>
            {t('discover_last_news_today')}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.paddingSrollView}>
          <News43
            loading={loading}
            onPress={goPostDetail(mainNews)}
            style={{ marginTop: 5 }}
            image={mainNews.image}
            name={mainNews.name}
            description={mainNews.description}
            title={mainNews.title}
          />
          {HomeListData.map((item, index) => (
            <NewsList
              key={index.toString()}
              loading={loading}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              style={{
                marginTop: 15,
              }}
              onPress={goPostDetail(item)}
            />
          ))}
          <ScrollView
            contentContainerStyle={styles.paddingFlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {HomePopularData.map((item, index) => (
              <CardSlide
                key={index.toString()}
                loading={loading}
                onPress={goPostDetail(item)}
                style={{
                  marginRight: index === HomePopularData.length - 1 ? 0 : 15,
                }}
                image={item.image}
                date={item.date}
                title={item.title}
              />
            ))}
          </ScrollView>
          <View style={styles.topicsView}>
            <Text title3 semibold style={styles.title}>
              {t('browse_topics')}
            </Text>
            <Text light footnote regular grayColor>
              {t('select_your_most_interesting_category')}
            </Text>
            <View style={styles.paddingFlatList}>
              {HomeTopicData.map((item, index) => (
                <CategoryList
                  key={index.toString()}
                  loading={loading}
                  onPress={goPost(item)}
                  style={{
                    marginBottom: index === HomeTopicData.length - 1 ? 0 : 15,
                  }}
                  image={item.image}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
              <TouchableOpacity style={styles.more} onPress={goToCategory}>
                <Text body2 semibold accentColor>
                  {t('see_more')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text title3 semibold style={styles.title}>
              {t('discover_channels')}
            </Text>
            <Text light footnote regular grayColor>
              {t('description_discover_channels')}
            </Text>
            <ScrollView
              contentContainerStyle={styles.paddingFlatList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {HomeChannelData.map((item, index) => (
                <CardChannelGrid
                  key={index.toString()}
                  loading={loading}
                  onPress={goPostDetail}
                  style={{
                    marginRight: index === HomeChannelData.length - 1 ? 0 : 15,
                  }}
                  image={item.image}
                  title={item.title}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default NHome;
