import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { CardReport02, CardReport03, CardReport04, SafeAreaView, Icon, Header } from '@/components';
import Activities from './Activities';
import HeaderCard from './HeaderCard';
import styles from './styles';

const Dashboard2 = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        style={{
          marginBottom: 20,
        }}
        title={t('dashboard_line_chart')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HeaderCard disabled onPress={() => navigation.navigate('Dashboard5')} />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <CardReport02
              style={{ marginBottom: 7 }}
              icon="chart-bar"
              title="Balance"
              price="$2900,98"
              onPress={() => navigation.navigate('Dashboard5')}
            />
            <CardReport03
              style={{ marginTop: 7 }}
              icon="chart-line"
              title="Profits"
              price="$98,99"
              subTitle="Bitcoin"
              percent="8,99%"
              onPress={() => navigation.navigate('FCryptol02')}
            />
          </View>
          <View style={{ flex: 1, paddingLeft: 7 }}>
            <CardReport04
              contentStyle={{ paddingBottom: 27 }}
              icon="credit-card"
              title="Cash Flow"
              price="$2900,98"
              subTitle1="Income"
              percent1="100%"
              subTitle2="Expense"
              percent2="80%"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
              onPress={() => navigation.navigate('FReport')}
            />
          </View>
        </View>

        <Activities />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard2;
