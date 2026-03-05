import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseStyle, useTheme } from '@/config';
// Load sample data
import { MessagesData } from '@/data';
import { Header, Icon, ListThumbSquare, SafeAreaView } from '@/components';

const NMessenger = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [messenger] = useState(MessagesData);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('messenger')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={messenger}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListThumbSquare
            onPress={() => {
              navigation.navigate('NMessages');
            }}
            image={item.image}
            txtLeftTitle={item.user}
            txtContent={item.message}
            txtRight={item.date}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default NMessenger;
