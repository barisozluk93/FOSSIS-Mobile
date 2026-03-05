import { Fragment, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Dimensions, FlatList, RefreshControl, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { EPostListData, ESortOption } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
// Load sample data
import * as Utils from '@/utils';
import { FilterESort, ProductBlock, ProductGrid2, ProductList, SafeAreaView, Tag } from '@/components';
import styles from './styles';

let timeoutChangeMode = null;

const initialLayout = { width: Dimensions.get('window').width };

const Product = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState('list');
  const [list, setList] = useState(EPostListData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeSort = (sortOption) => {
    Utils.enableExperimental();
    const { value } = sortOption;
    switch (value) {
      case 'all':
        setList(EPostListData);
        break;
      case 'best_match':
        setList(EPostListData.filter((product) => product.isBestMatch));
        break;
      case 'price_low_to_high':
        var products = [...EPostListData];
        products.sort((a, b) => {
          return a.price - b.price;
        });
        setList(products);
        break;
      case 'price_high_to_low':
        var productHights = [...EPostListData];
        productHights.sort((a, b) => {
          return b.price - a.price;
        });
        setList(productHights);
        break;
      default:
        setList(EPostListData);
        break;
    }
  };

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   */
  const onFilter = () => {
    navigation.navigate('EFilter');
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

    let mode = 'block';
    switch (modeView) {
      case 'block':
        mode = 'grid';
        break;
      case 'grid':
        mode = 'list';
        break;
      case 'list':
        mode = 'block';
        break;
      default:
        break;
    }
    setModeView(mode);
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'block':
        return 1;
      case 'list':
        return 1;
      case 'grid':
        return 2;
      default:
        return 1;
    }
  };

  const goProductDetail = (item) => {
    navigation.navigate('EProductDetail', { item: item });
  };

  const renderItem = ({ item, index }) => {
    switch (modeView) {
      case 'list':
        return (
          <ProductList
            loading={loading}
            description={item.description}
            title={item.title}
            style={{ marginVertical: 8 }}
            image={item.image}
            costPrice={item.costPrice}
            salePrice={item.salePrice}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );
      case 'grid':
        return (
          <ProductGrid2
            loading={loading}
            description={item.description}
            title={item.title}
            style={{
              paddingLeft: index % 2 ? 4 : 0,
              paddingRight: index % 2 ? 0 : 4,
              width: '50%',
              paddingBottom: 16,
            }}
            image={item.image}
            costPrice={item.costPrice}
            salePrice={item.salePrice}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );

      case 'block':
        return (
          <ProductBlock
            loading={loading}
            description={item.description}
            title={item.title}
            style={{ marginVertical: 8 }}
            image={item.image}
            costPrice={item.costPrice}
            salePrice={item.salePrice}
            onPress={() => goProductDetail(item)}
            isFavorite={item.isFavorite}
            salePercent={item.salePercent}
          />
        );

      default:
        break;
    }
  };

  const renderList = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navbar}>
          <FilterESort
            title={`${list.length} ${t('products')}`}
            modeView={modeView}
            sortOption={ESortOption}
            onChangeSort={onChangeSort}
            onChangeView={onChangeView}
            onFilter={onFilter}
          />
        </View>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: modeView !== 'block' ? 20 : 0,
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
          data={list}
          key={getTotalCol()}
          numColumns={getTotalCol()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  };

  return <Fragment>{renderList()}</Fragment>;
};

const PostTab = () => {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'clothing', title: 'Clothing' },
    { key: 'accessories', title: 'Accessories' },
    { key: 'activewear', title: 'Activewear' },
    { key: 'shoes', title: 'Shoes' },
  ]);

  const renderScene = SceneMap({
    clothing: Product,
    accessories: Product,
    activewear: Product,
    shoes: Product,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderIndicator={() => null}
      scrollEnabled
      style={[styles.tabbar, { backgroundColor: colors.background }]}
      tabStyle={styles.tab}
      activeColor={BaseColor.whiteColor}
      inactiveColor={colors.text}
      renderLabel={({ route, focused, color }) => (
        <Tag
          primary={true}
          style={{
            backgroundColor: focused ? colors.primary : colors.background,
          }}
          textStyle={{
            color: color,
          }}
        >
          {route.title}
        </Tag>
      )}
    />
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <TabView
        scrollEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

export default PostTab;
