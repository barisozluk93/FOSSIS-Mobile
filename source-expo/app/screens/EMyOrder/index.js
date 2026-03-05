import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { CompletedOrders } from '@/data';
import { ProductOrderItemList, SafeAreaView, Tag, Header, Icon } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { enableExperimental } from '@/utils';

const TABS = [
  {
    id: 1,
    title: 'Completed',
    key: 'isCompleted',
  },
  {
    id: 2,
    title: 'Cancelled',
    key: 'isCancelled',
  },
  {
    id: 3,
    title: 'Requested',
    key: 'isRequested',
  },
];

const EMyOrder = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [products, setProducts] = useState(CompletedOrders);

  const [tabChoosed, setTabChoosed] = useState(TABS[0]);

  useEffect(() => {
    enableExperimental();
    setProducts(CompletedOrders.filter((order) => order[tabChoosed.key]));
  }, [tabChoosed]);

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View style={[{ flex: 1, paddingBottom: 10 }]}>
          <Header
            title={t('order_history')}
            renderLeft={() => {
              return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
          >
            {TABS.map((tab) => (
              <View key={tab.id} style={{ flex: 1, padding: 4 }}>
                <Tag
                  primary={true}
                  style={{
                    backgroundColor: tab.id === tabChoosed.id ? colors.primary : colors.background,
                  }}
                  textStyle={{
                    color: tab.id === tabChoosed.id ? BaseColor.whiteColor : colors.text,
                  }}
                  onPress={() => setTabChoosed(tab)}
                >
                  {tab.title}
                </Tag>
              </View>
            ))}
          </View>

          <FlatList
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingTop: 20,
                  backgroundColor: colors.card,
                }}
              >
                <ProductOrderItemList
                  style={{
                    padding: 20,
                    backgroundColor: colors.background,
                  }}
                  orderData={item}
                  onPress={() => navigation.navigate('ETrackOrder')}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default EMyOrder;
