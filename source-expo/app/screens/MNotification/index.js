import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { NotificationEarlier, NotificationRecent } from '@/data/music';
import { BaseStyle, useTheme } from '@/config';
import { GridList, Header, Icon, SafeAreaView, Text, ThumbSquareSmall } from '@/components';

const MNotification = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title="Notification"
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text headline style={{ padding: 20, paddingBottom: 10 }}>
          {t('music_recents')}
        </Text>
        <GridList
          columns={1}
          data={NotificationRecent}
          renderItem={({ item }) => (
            <ThumbSquareSmall
              image={item.image}
              txtLeftTitle={item.name}
              txtContent={item.description}
              txtRight={item.time}
              onPress={() => {}}
            />
          )}
        />
        <Text headline style={{ padding: 20, paddingBottom: 10 }}>
          {t('music_earlier')}
        </Text>
        <GridList
          columns={1}
          data={NotificationEarlier}
          renderItem={({ item }) => (
            <ThumbSquareSmall
              image={item.image}
              txtLeftTitle={item.name}
              txtContent={item.description}
              txtRight={item.time}
              onPress={() => {}}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MNotification;
