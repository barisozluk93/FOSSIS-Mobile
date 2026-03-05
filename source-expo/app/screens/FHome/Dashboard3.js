import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { FNews, FRecentTransactions } from '@/data';
import { BaseStyle, useTheme } from '@/config';
import { CardReport07, SafeAreaView, ProfileGridSmall, CardReport08, Header, Icon } from '@/components';
import HeaderCard from './HeaderCard';
import HeaderHome from './HeaderHome';
import TitleList from './TitleList';

const Dashboard3 = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const goToScreen = (name) => name && navigation.navigate(name);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        title={t('report')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <HeaderHome style={{ marginBottom: 5 }} onPressRight={() => navigation.navigate('FNotification')} />
      <ScrollView
        // contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <HeaderCard isPrimary disabled />
          <TitleList
            title={t('recent_transactions')}
            textMore={t('view_all')}
            onPress={() => goToScreen('FChooseFriend')}
          />
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {FRecentTransactions.map((item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProfileGridSmall image={item.image} name={item.name} onPress={() => goToScreen('FSendMoney')} />
              </View>
            ))}
          </View>
          <CardReport08
            style={{ marginBottom: 20 }}
            percent={50}
            title="Current Goal"
            subTitle="Accumulate $29,000"
            description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
            onPress={() => navigation.navigate('FCryptol02')}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          {FNews.map((item) => (
            <CardReport07
              key={item.id}
              style={{ marginBottom: 15 }}
              icon={item.icon}
              title={item.title}
              subTitle={item.subTitle}
              price={item.price}
              percent={item.percent}
              isUp={item.isUp}
              onPress={() => navigation.navigate('Dashboard4')}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard3;
