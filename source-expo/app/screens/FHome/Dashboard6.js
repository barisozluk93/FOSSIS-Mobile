import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { FChartItems } from '@/data';
import { CardReport05, CardReport10, HeaderText, LineChart, SafeAreaView } from '@/components';
import styles from './styles';
import HeaderCard from './HeaderCard';

const Dashboard6 = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [200, 500, 1000, 500, 1000, 250, 2000, 1500, 1000, 50, 20, 10],
        color: (_opacity = 1) => colors.primaryLight,
        strokeWidth: 2, // optional
      },
      {
        data: [300, 1500, 500, 500, 100, 200, 400, 500, 1000, 1000, 100, 100],
        color: (_opacity = 1) => BaseColor.accentColor, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: [t('income'), t('expense')],
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <HeaderText title={t('report')} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCard isCenter />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <CardReport05
              onPress={() => navigation.navigate('Dashboard5')}
              icon="arrow-up"
              title={t('income')}
              price="$500,290"
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 7 }}>
            <CardReport05
              onPress={() => navigation.navigate('Dashboard2')}
              icon="arrow-down"
              title={t('expense')}
              price="$300,290"
              style={{ backgroundColor: BaseColor.accentColor }}
            />
          </View>
        </View>
        <LineChart data={data} />
        {FChartItems.map((item, index) => (
          <CardReport10
            key={index}
            icon={item.icon}
            name={item.name}
            percent={item.percent}
            price={item.price}
            backgroundIcon={item.backgroundIcon}
            onPress={() => navigation.navigate('Dashboard4')}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard6;
