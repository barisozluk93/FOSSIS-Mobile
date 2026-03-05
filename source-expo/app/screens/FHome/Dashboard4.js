import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseColor, BaseStyle } from '@/config';
import { CardReport01, Icon, SafeAreaView, StackedBarChart, Text } from '@/components';
import Activities from './Activities';
import HeaderFilter from './HeaderFilter';
import styles from './styles';

const Dashboard4 = () => {
  const { t } = useTranslation();
  const data = {
    labels: ['January', 'Febuary'],
    legend: [t('income'), t('expense')],
    data: [
      [500, 300],
      [300, 200],
    ],
    barColors: [BaseColor.pinkLightColor, BaseColor.accentColor],
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <HeaderFilter style={{ marginBottom: 20 }} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingRight: 7 }}>
            <CardReport01 disabled icon="arrow-up" title={t('income')} price="$500,290" />
          </View>
          <View style={{ flex: 1, paddingLeft: 7 }}>
            <CardReport01 disabled icon="arrow-down" title={t('expense')} price="$350,120" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <Icon name="chevron-left" size={12} />
          <Text body2 style={{ flex: 1, textAlign: 'center' }}>
            2021 June
          </Text>
          <Icon name="chevron-right" size={12} />
        </View>
        <StackedBarChart data={data} />
        <Activities />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard4;
