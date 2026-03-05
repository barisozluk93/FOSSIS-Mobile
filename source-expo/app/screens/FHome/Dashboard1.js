import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { FRecentTransactions, FHotNews } from '@/data';
import { BaseStyle } from '@/config';
import { CardReport03, ProfileGridSmall, SafeAreaView } from '@/components';
import Activities from './Activities';
import Categories from './Categories';
import HeaderHome from './HeaderHome';
import styles from './styles';
import TitleList from './TitleList';
import HeaderCard from './HeaderCard';

const Dashboard1 = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const goToScreen = (name) => name && navigation.navigate(name);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <HeaderHome onPressRight={() => navigation.navigate('FNotification')} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.paddingContent}>
          <HeaderCard disabled onPress={() => navigation.navigate('Dashboard5')} />
          <Categories style={{ marginTop: 10 }} />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {FHotNews.map((item, index) => (
            <CardReport03
              key={item.id}
              isUp={item.isUp}
              style={{
                width: 150,
                marginLeft: index === 0 ? 20 : 10,
                marginRight: index === FHotNews.length - 1 ? 20 : 0,
              }}
              icon={item.icon}
              title={item.title}
              price={item.price}
              subTitle={item.subTitle}
              percent={item.percent}
              colorIcon={item.colorIcon}
              backgroundIcon={item.backgroundIcon}
              onPress={() => navigation.navigate('FCryptol02')}
            />
          ))}
        </ScrollView>
        {/* <CardReport08
                    percent={50}
                    title="Current Goal"
                    subTitle="Accumulate $29,000"
                    description="Proin eget tortor risus. Donec sollicitudin molestie malesuada"
                /> */}
        <View style={styles.paddingContent}>
          <TitleList
            title={t('recent_transactions')}
            textMore={t('view_all')}
            onPress={() => goToScreen('FChooseFriend')}
          />
          <View style={{ flexDirection: 'row' }}>
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
          <Activities />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard1;
