import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, CardBooking, Header, Icon, ModalFilter, ProductCard1, SafeAreaView, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { ProductsData } from '@/data';

const sortOptionInit = [
  {
    value: 'remove',
    icon: 'sort-amount-up',
    text: 'remove',
  },
  {
    value: 'share_this_article',
    icon: 'sort-amount-down',
    text: 'share_this_article',
  },
  {
    value: 'view_detail',
    icon: 'sort-amount-up',
    text: 'view_detail',
  },
  {
    value: 'reset_all',
    icon: 'sort-amount-up',
    text: 'reset_all',
  },
];

const ECart = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [products, setProducts] = useState(ProductsData);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);

  const [promotionCode, setPromotionCode] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value === selected.value,
        };
      })
    );
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      setSortOption(sortOptionInit);
    }
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={t('checkout')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={[{ flex: 1, paddingHorizontal: 20, paddingBottom: 10 }]}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <TextInput
              style={{ flex: 1 }}
              onChangeText={(text) => setPromotionCode(text)}
              autoCorrect={false}
              placeholder={t('promotion_code')}
              placeholderTextColor={BaseColor.grayColor}
              value={promotionCode}
              selectionColor={colors.primary}
              onSubmitEditing={() => {
                navigation.goBack();
              }}
            />
            <Button small style={{ height: 45, marginLeft: 8 }}>
              {t('check')}
            </Button>
          </View>

          <FlatList
            // contentContainerStyle={{ paddingVertical: 12 }}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[colors.primary]}
                tintColor={colors.primary}
                refreshing={refreshing}
                onRefresh={() => {}}
              />
            }
            data={products}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <ProductCard1
                loading={loading}
                style={{ marginTop: 10 }}
                title={item.title}
                image={item.image}
                salePrice={item.salePrice}
                description={item.description}
                secondDescription={item.secondDescription}
                onDelete={() => setProducts(products.filter((product) => product.id !== item.id))}
                onChange={(total) => console.log('total', total)}
              />
            )}
          />

          <ModalFilter
            options={sortOption}
            isVisible={modalVisible}
            onSwipeComplete={() => {
              setModalVisible(false);
              setSortOption(sortOptionInit);
            }}
            onApply={onApply}
            onSelectFilter={onSelectFilter}
          />
        </View>
        <CardBooking
          loading={loading}
          description={t('total_price')}
          price={'$156.00'}
          secondDescription={'Tax included'}
          textButton={t('checkout')}
          onPress={() => navigation.navigate('EShipping')}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default ECart;
