import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, ScrollView, TouchableOpacity, View } from 'react-native';
import { BaseStyle } from '@/config';
import { ECategories, EFeaturedShop, EPopulars, EYourStores, EWishlistHome } from '@/data';
import {
  CategoryIconSoft,
  HeaderAnimated,
  ModalFilter,
  ProductGrid1,
  ProductGrid2,
  SafeAreaView,
  ShopCard1,
  Text,
  TextInput,
  HeaderLargeTitleStore,
  HeaderLargeTitleBadge,
} from '@/components';
import styles from './styles';

const HeaderLine = ({ style = {}, title = '', onPress = () => {} }) => {
  const { t } = useTranslation();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text title3 style={{ flex: 1 }}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text body2 accentColor>
          {t('see_all')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [search] = useState('');
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState(EYourStores);
  const [, setStoreChoosed] = useState(EYourStores[0]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false,
  });

  const onChangeStore = () => {
    let storeChoosed = {};
    for (const store of stores) {
      if (store.checked) {
        storeChoosed = store;
        break;
      }
    }
    setStoreChoosed(storeChoosed);
    setModalVisible(false);
  };

  const onSelectStore = (store) => {
    const storesInline = EYourStores.map((item) => {
      return {
        ...item,
        checked: item.value === store.value,
      };
    });
    setStores(storesInline);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const goCategory = (item = {}) => {
    navigation.navigate('ECategory', { item: item });
  };

  const goShop = (item) => {
    navigation.navigate('EProductStoreProfile', { item: item });
  };

  const goProductDetail = (item) => {
    navigation.navigate('EProductDetail', { item: item });
  };

  const goSearch = () => {
    navigation.navigate('ESearchHistory');
  };

  const goProducts = () => {
    navigation.navigate('EProduct');
  };

  const goProductsWishlist = () => {
    navigation.navigate('EWishlist');
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <HeaderAnimated
          scrollY={scrollY}
          componentLeft={<HeaderLargeTitleStore />}
          componentRight={<HeaderLargeTitleBadge onPress={() => navigation.navigate('ENotification')} />}
          componentBottom={
            <TouchableOpacity onPress={goSearch}>
              <TextInput
                autoCorrect={false}
                placeholder={t('enter_keywords')}
                value={search}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }
        />

        <Animated.ScrollView contentContainerStyle={[styles.paddingSrollView]} onScroll={onScroll}>
          <HeaderLine title={t('categories')} onPress={goCategory} />

          <Text subhead grayColor style={{ marginTop: 4 }}>
            {t('e_description_featured_shop')}
          </Text>
          {/*Not use FlatList in ScrollView */}
          <ScrollView
            contentContainerStyle={styles.paddingFlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {ECategories.map((item, index) => (
              <CategoryIconSoft
                loading={loading}
                key={index.toString()}
                title={item.title}
                icon={item.icon}
                style={{
                  marginRight: index !== ECategories.length - 1 ? 20 : 0,
                }}
                onPress={() => goCategory()}
              />
            ))}
          </ScrollView>

          <Text title3 style={{ flex: 1, paddingTop: 20 }}>
            {t('e_featured_shop')}
          </Text>

          <Text subhead grayColor style={{ marginTop: 4 }}>
            {t('e_description_featured_shop')}
          </Text>

          {/*Not use FlatList in ScrollView */}
          <ScrollView
            contentContainerStyle={styles.paddingFlatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {EFeaturedShop.map((item, index) => (
              <ShopCard1
                loading={loading}
                onPress={goShop}
                key={index.toString()}
                image={item.image}
                title={item.title}
                description={item.description}
                rating={item.rating}
                totalRating={item.totalRating}
                style={{
                  marginRight: index === EFeaturedShop.length - 1 ? 0 : 10,
                }}
                isVerified={index === 0}
              />
            ))}
          </ScrollView>

          <HeaderLine style={{ paddingTop: 20 }} title={t('popular')} onPress={goProducts} />
          {/*Not use FlatList in ScrollView */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {EPopulars.map((item, index) => (
              <View key={index.toString()} style={{ width: '50%' }}>
                <ProductGrid1
                  loading={loading}
                  style={{
                    width: '100%',
                    paddingRight: index % 2 === 0 ? 10 : 0,
                    paddingLeft: index % 2 !== 0 ? 10 : 0,
                  }}
                  description={item.description}
                  title={item.title}
                  image={item.image}
                  costPrice={item.costPrice}
                  salePrice={item.salePrice}
                  isFavorite={item.isFavorite}
                  onPress={() => goProductDetail(item)}
                />
              </View>
            ))}
          </View>
          <HeaderLine style={{ paddingTop: 20 }} title={t('product_wishlist')} onPress={goProductsWishlist} />
          <ScrollView
            contentContainerStyle={[styles.paddingFlatList]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {EWishlistHome.map((item, index) => (
              <ProductGrid2
                key={index.toString()}
                style={{
                  width: 155,
                  marginRight: index !== EWishlistHome.length - 1 ? 15 : 0,
                }}
                description={item.description}
                title={item.title}
                image={item.image}
                costPrice={item.costPrice}
                salePrice={item.salePrice}
                isFavorite={item.isFavorite}
                onPress={() => goProductDetail(item)}
              />
            ))}
          </ScrollView>
        </Animated.ScrollView>
        <ModalFilter
          options={stores}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
          }}
          onApply={onChangeStore}
          onSelectFilter={onSelectStore}
        />
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

export default Home;
