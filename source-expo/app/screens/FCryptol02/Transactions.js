import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { FTransactionsTab } from '@/data';
import { Button, ListTransactionExpand, Text } from '@/components';

export default () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text title1>{'$98.45'}</Text>
            <Text body2 primaryColor>
              {'-4.25%'}
            </Text>
          </View>
          {FTransactionsTab.map((item) => (
            <ListTransactionExpand
              key={item.id}
              isExpandInit={item.id === 2}
              ListTransactionProps={{
                icon: item.icon,
                name: item.name,
                date: item.date,
                status: item.status,
                price: item.price,
              }}
              tradingPairTitle={item.tradingPairTitle}
              tradingPairValue={item.tradingPairValue}
              priceTitle={item.priceTitle}
              price={item.price}
              feeTitle={item.feeTitle}
              feeValue={item.feeValue}
              costTitle={item.costTitle}
              costValue={item.costValue}
              changeTitle={item.changeTitle}
              changeValue={item.changeValue}
              currentTitle={item.currentTitle}
              currentValue={item.currentValue}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          padding: 20,
        }}
      >
        <Button full onPress={() => navigation.navigate('FCrypto060708', { id: 3 })}>
          {t('add_transaction')}
        </Button>
      </View>
    </View>
  );
};
