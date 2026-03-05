import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, View, RefreshControl } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { FTransactions } from '@/data';
import { FilterBar, HeaderText, Price2Col, SafeAreaView, StatisticText3Col, TextInput, NotFound } from '@/components';

export default function FCryptol01({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState(null);
  const [filter, setFilter] = useState({
    leftValue: false,
    centerValue: false,
    rightValue: true,
  });
  const [refreshing] = useState(false);

  const route = useRoute();
  const item = route?.params?.item ?? { name: 'Bitcoin' };
  const [transactions, setTransactions] = useState(FTransactions);
  useEffect(() => {
    if (route?.params?.item?.id) {
      setTransactions(transactions.filter((itemOld) => itemOld.id !== item.id));
    }
  }, [route?.params?.item]);

  const onChangeText = (text) => {
    setKeyword(text);
    setTransactions(
      FTransactions.filter((itemInline) => {
        const name = itemInline?.name?.toLowerCase();
        const code = itemInline?.code?.toLowerCase();
        const textString = text?.toLowerCase?.();
        return name.includes(textString) || code.includes(textString);
      })
    );
  };

  const onFilterChange = (value) => {
    if (value.leftValue !== filter.leftValue) {
      setTransactions(
        FTransactions.sort((a, b) => {
          const aValue = parseFloat(a.marketCap.replaceAll(' B', ''));
          const bValue = parseFloat(b.marketCap.replaceAll(' B', ''));
          if (value.leftValue) {
            return bValue - aValue;
          } else {
            return aValue - bValue;
          }
        })
      );
    }
    if (value.centerValue !== filter.centerValue) {
      setTransactions(
        FTransactions.sort((a, b) => {
          const aValue = parseFloat(a.price.replaceAll('$', ''));
          const bValue = parseFloat(b.price.replaceAll('$', ''));
          if (value.centerValue) {
            return bValue - aValue;
          } else {
            return aValue - bValue;
          }
        })
      );
    }
    if (value.rightValue !== filter.rightValue) {
      setTransactions(
        FTransactions.sort((a, b) => {
          const x = a.isUp;
          const y = b.isUp;
          if (value.rightValue) {
            return x === y ? 0 : x ? -1 : 1;
          } else {
            return x === y ? 0 : x ? 1 : -1;
          }
        })
      );
    }
    setFilter(value);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <HeaderText title={t('market')} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
            paddingTop: 10,
          }}
        >
          <TextInput onChangeText={onChangeText} placeholder={t('search_over_500_coins')} value={keyword} />
          <StatisticText3Col
            style={{ marginVertical: 20 }}
            topLeft={t('market_cap').toUpperCase()}
            centerLeft="9.69T"
            bottomLeft="-10,99%"
            topCenter={t('24h_volume').toUpperCase()}
            centerCenter="100.5T"
            bottomCenter="-10,99%"
            topRight="BITCOIN"
            centerRight="43.99%"
            bottomRight="-0,99%"
          />
          <FilterBar
            leftTitle={t('coin')}
            centerTitle={t('price')}
            rightTitle={t('cap_vol')}
            value={filter}
            onChange={onFilterChange}
          />
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={transactions}
          keyExtractor={(_item, index) => index.toString()}
          ListEmptyComponent={<NotFound />}
          renderItem={({ item: itemInline, index }) => (
            <Price2Col
              key={index}
              image={itemInline.image}
              code={itemInline.code}
              name={itemInline.name}
              costPrice={itemInline.costPrice}
              marketCap={itemInline.marketCap}
              percent={itemInline.percent}
              price={itemInline.price}
              isUp={itemInline.isUp}
              onPress={() =>
                navigation.navigate('FCryptol02', {
                  item: itemInline,
                  screen: 'CMarket',
                })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
