import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header, Icon, ListThumbCircle, SafeAreaView } from '@/components';
import { BaseStyle, useTheme } from '@/config';
// Load sample data
import { NotificationData } from '@/data';

const NNotification = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [notification] = useState(NotificationData);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('notification')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            tintColor={colors.primary}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
        }
        data={notification}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListThumbCircle
            image={item.image}
            txtLeftTitle={item.title}
            txtContent={item.description}
            txtRight={item.date}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default NNotification;
