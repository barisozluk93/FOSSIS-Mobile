import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { FTransactions } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { CardReport06, Price2Col, SafeAreaView, Text, Icon } from '@/components';
import HeaderHome from './HeaderHome';
import styles from './styles';
import TitleList from './TitleList';
import HeaderCard from './HeaderCard';

const Dashboard7 = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const itemParam = route?.params?.item ?? { name: 'Bitcoin' };
  const [transactions, setTransactions] = useState(FTransactions);

  useEffect(() => {
    if (route?.params?.item?.id) {
      setTransactions(transactions.filter((itemOld) => itemOld.id !== itemParam.id));
    }
  }, [route?.params?.item]);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <HeaderHome
        style={{ marginBottom: 20 }}
        ComponentRight={
          <TouchableOpacity style={{ position: 'relative' }} onPress={() => navigation.navigate('Dashboard3')}>
            <Icon name={'chart-line'} solid size={19} color={BaseColor.grayColor} />
            <View
              style={[
                styles.notyHeader,
                {
                  borderColor: BaseColor.whiteColor,
                  backgroundColor: colors.primary,
                  bottom: 0,
                },
              ]}
            />
          </TouchableOpacity>
        }
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCard disabled onPress={() => navigation.navigate('Dashboard5')} />
        {/* <CardReport08
                    percent={50}
                    title="Current Goal"
                    subTitle="Accumulate $29,000"
                    description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
                /> */}
        <Text title3 style={{ marginBottom: 10 }}>
          {t('top_movers')}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <CardReport06
              icon="arrow-up"
              title="BTC"
              price="$0.68"
              percent="+8,99%"
              onPress={() => navigation.navigate('FCryptol02')}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 7 }}>
            <CardReport06
              style={{ backgroundColor: BaseColor.kashmir }}
              icon="arrow-up"
              title="BTC"
              price="$0.68"
              percent="+8,99%"
              onPress={() => navigation.navigate('FCryptol02')}
            />
          </View>
        </View>
        <TitleList title={t('transactions')} textMore={t('view_all')} onPress={() => navigation.navigate('CMarket')} />
        {transactions.map((item, index) => (
          <Price2Col
            key={index}
            image={item.image}
            code={item.code}
            name={item.name}
            costPrice={item.costPrice}
            marketCap={item.marketCap}
            percent={item.percent}
            price={item.price}
            isUp={item.isUp}
            onPress={() =>
              navigation.navigate('FCryptol02', {
                item: item,
                screen: 'CHome',
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard7;
