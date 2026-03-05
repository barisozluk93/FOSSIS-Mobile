import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, RefreshControl, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { PostListData } from '@/data';
import { FilterSort, Header, Icon, News169, News43, NewsGrid, NewsList, SafeAreaView } from '@/components';
import { BaseStyle, useTheme } from '@/config';
// Load sample data
import * as Utils from '@/utils';
import styles from './styles';

let timeoutChangeMode = null;

export const modes = {
  square: 'square',
  bars: 'bars',
  thList: 'th-list',
  thLarge: 'th-large',
};

const NPost = ({ mode = modes.square, posts = PostListData }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState(mode);
  const [list] = useState(posts);
  const [loading, setLoading] = useState(true);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim
      ),
      0,
      40
    )
  ).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeSort = () => {};

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('NFilter');
  };

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onChangeView = () => {
    setLoading(true);
    clearTimeout(timeoutChangeMode);
    timeoutChangeMode = setTimeout(() => {
      setLoading(false);
    }, 1000);
    Utils.enableExperimental();
    let modeInline = 'square';
    switch (modeView) {
      case 'square':
        modeInline = 'bars';
        break;
      case 'bars':
        modeInline = 'th-list';
        break;
      case 'th-list':
        modeInline = 'th-large';
        break;
      case 'th-large':
        modeInline = 'square';
        break;

      default:
        break;
    }
    setModeView(modeInline);
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'square':
        return 1;
      case 'bars':
        return 1;
      case 'th-list':
        return 1;
      case 'th-large':
        return 2;
      default:
        return 1;
    }
  };

  const goPostDetail = (item) => () => {
    navigation.navigate('NPostDetail', { item: item });
  };

  const renderItem = ({ item, index }) => {
    switch (modeView) {
      case 'square':
        return (
          <News43
            avatar={item.avatar}
            loading={loading}
            style={{ marginVertical: 8 }}
            name={item.name}
            description={item.description}
            title={item.title}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );
      case 'bars':
        return (
          <News169
            avatar={item.avatar}
            loading={loading}
            style={{ marginVertical: 8 }}
            name={item.name}
            description={item.description}
            title={item.title}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );

      case 'th-list':
        return (
          <NewsList
            avatar={item.avatar}
            loading={loading}
            style={{ marginVertical: 8 }}
            description={item.description}
            title={item.title}
            subtitle={item.subtitle}
            date={item.date}
            image={item.image}
            onPress={goPostDetail(item)}
          />
        );
      case 'th-large':
        return (
          <NewsGrid
            avatar={item.avatar}
            loading={loading}
            style={{
              paddingLeft: index % 2 === 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            image={item.image}
            description={item.description}
            title={item.title}
            onPress={goPostDetail(item)}
          />
        );
      default:
        break;
    }
  };

  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    const android = Platform.OS === 'android';
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{ top: 50 }}
          contentContainerStyle={{
            marginTop: android ? 50 : 0,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          data={list}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }] }]}>
          <FilterSort modeView={modeView} onChangeSort={onChangeSort} onChangeView={onChangeView} onFilter={onFilter} />
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('posts')}
        renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('NSearchHistory');
        }}
      />
      {renderList()}
    </SafeAreaView>
  );
};

export default NPost;
