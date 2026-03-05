import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { FHotNews2 } from '@/data';
import { CardReport08, CardReport09, PieChart, SafeAreaView, Text, Header, Icon } from '@/components';
import styles from './styles';

const Dashboard5 = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const data = [
    {
      name: 'Ultilitites',
      population: 70,
      color: colors.primaryLight,
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Entertainment',
      population: 20,
      color: colors.accent,
      legendFontColor: '#7F7F7F',
    },
    {
      name: 'Food and Drink',
      population: 10,
      color: BaseColor.kashmir,
      legendFontColor: '#7F7F7F',
    },
  ];
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        style={{
          marginBottom: 20,
        }}
        title={t('dashboard_circle_chart')}
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
        <PieChart data={data} />
        <CardReport08
          disabled
          percent={50}
          title="Current Goal"
          subTitle="Accumulate $29,000"
          description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
        />
        <Text title3 style={{ marginTop: 20 }}>
          {t('hot_news')}
        </Text>
        <ScrollView
          contentContainerStyle={{
            // paddingHorizontal: 15,
            paddingVertical: 15,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {FHotNews2.map((item) => (
            <CardReport09
              key={item.id}
              style={{ marginRight: 10 }}
              backgroundIcon={item.backgroundIcon}
              icon={item.icon}
              title={item.title}
              description={item.description}
              textReadMore={item.textReadMore}
              onPress={() => navigation.navigate('NPostDetail')}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard5;
