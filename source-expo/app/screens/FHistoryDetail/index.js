import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseStyle, Images, useTheme } from '@/config';
import { Header, Icon, ListMenuIcon, ListSearchResultLabel, ProfileAuthor, SafeAreaView, Text } from '@/components';

const FHistoryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const renderContent = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Header
          title={'May 01 2021 05:30 AM'}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          renderRight={() => {
            return (
              <Text body1 lightPrimaryColor>
                {t('close')}
              </Text>
            );
          }}
          onPressLeft={() => navigation.goBack()}
          onPressRight={() => navigation.navigate('FHome')}
        />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <ProfileAuthor
            style={{}}
            image={Images.profile2}
            name="Steve Garrett"
            description="Paypal - @steve.garrett"
            textRight=""
            onPress={() => {}}
          />
          <Text body2>
            Nulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada. Nulla quis lorem ut
            libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae
          </Text>
          <ListSearchResultLabel
            style={{ marginTop: 25 }}
            title={t('from')}
            textLeft={'Paypal Balance'}
            textRight={'$980.00'}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={{ marginTop: 5 }}
            title={t('transaction_type')}
            textLeft={'Money Sent'}
            textRight={''}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={{ marginTop: 5 }}
            title={t('category')}
            textLeft={'Friend & Family'}
            textRight={''}
            onPress={() => {}}
          />
          <ListSearchResultLabel
            style={{ marginTop: 5 }}
            title={t('transaction_id')}
            textLeft={'5N019383MNHU'}
            textRight={'08:00:21 PM GMT+7'}
            onPress={() => {}}
          />
          <Text title3 style={{ marginTop: 40 }}>
            {t('contact_information')}
          </Text>
          <ListMenuIcon style={{ paddingVertical: 15 }} icon={'envelope'} title={'steve.garrett@passionui.com'} />
          <ListMenuIcon style={{ paddingVertical: 15 }} icon={'list'} title={'See History'} />
          <ListMenuIcon style={{ paddingVertical: 15 }} icon={'money-bill-alt'} title={'Send Money'} />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      {renderContent()}
    </SafeAreaView>
  );
};

export default FHistoryScreen;
