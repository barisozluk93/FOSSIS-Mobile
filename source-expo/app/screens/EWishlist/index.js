import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { WishlistsData, EOptions } from '@/data';
import { ProductCard4, SafeAreaView, Header, Icon } from '@/components';
import ModalOption from './ModalOption';

const EWishlist = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [products] = useState(WishlistsData);
  const [refreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          title={t('wishlist')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
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
              <ProductCard4
                image={item.image}
                style={{ marginTop: 20 }}
                title={item.title}
                description={item.description}
                salePrice={item.salePrice}
                addToCard={() => navigation.navigate('ECart')}
                onOption={() => setModalVisible(true)}
              />
            )}
          />
        </View>
        <ModalOption
          options={EOptions}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
          }}
          onPress={() => setModalVisible(false)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default EWishlist;
