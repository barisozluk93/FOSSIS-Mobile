import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { Button, Header, Icon, ListSearchResult, SafeAreaView, Text } from '@/components';

const FTopUpConfirmation = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={t('topup_confirmation')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <ListSearchResult textLeft={t('from')} textRight="Paypal Balance" />
        <ListSearchResult textLeft={t('amount')} textRight="$980.00 USD" />
        <ListSearchResult textLeft={t('fee')} textRight="$0.00 USD" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 15,
          }}
        >
          <Text headline style={{ textTransform: 'uppercase' }}>
            {t('total')}
          </Text>
          <Text headline primaryColor>
            $980.00 USD
          </Text>
        </View>
      </View>
      <Button style={{ marginTop: 20, marginHorizontal: 20 }} onPress={() => navigation.navigate('FTopUpCompleted')}>
        {t('confirm')}
      </Button>
    </SafeAreaView>
  );
};

export default FTopUpConfirmation;
