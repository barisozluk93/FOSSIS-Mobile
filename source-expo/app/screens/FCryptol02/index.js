import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SceneMap } from 'react-native-tab-view';
import { BaseStyle, useTheme } from '@/config';
import { Header, Icon, SafeAreaView, TabSlider } from '@/components';
import Detail from './Detail';
import Profile from './Profile';
import Profit from './Profit';
import Transactions from './Transactions';

export default function FCryptol01({ navigation }) {
  const route = useRoute();
  const item = route?.params?.item ?? { name: 'Bitcoin', code: 'BTC' };
  const screen = route?.params?.screen ?? '';
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'detail', title: 'detail' },
    { key: 'profile', title: 'profile' },
    { key: 'profit', title: 'profit_lost' },
    { key: 'transactions', title: 'transactions' },
  ]);

  const onUnWatch = () => {
    if (screen) {
      navigation.navigate({
        name: screen,
        params: { item: item },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  };

  const renderScene = SceneMap({
    detail: () => <Detail onUnWatch={onUnWatch} />,
    profile: Profile,
    profit: Profit,
    transactions: Transactions,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={`${item.name} (${item.code})`}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <TabSlider navigationState={{ index, routes }} renderScene={renderScene} onIndexChange={setIndex} />
    </SafeAreaView>
  );
}
