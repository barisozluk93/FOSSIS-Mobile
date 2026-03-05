import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import { Button, Header, Icon, SafeAreaView, Text } from '@/components';
import styles from './styles';

export default function FTopUpCompleted({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={t('topup_completed')}
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

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <View style={[styles.headerView]}>
          <View
            style={{
              paddingVertical: 50,
              alignItems: 'center',
            }}
          >
            <Text subhead light style={{ marginBottom: 5 }}>
              {t('your_balance')}
            </Text>
            <Text title1>$1,3999.29</Text>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: parseHexTransparency(colors.primary, 30),
            }}
          >
            <Icon name="check" size={48} color={colors.primary} />
          </View>
          <Text
            headline
            bold
            style={{
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            {t('transaction_completed')}
          </Text>
          <Text header>$980.00</Text>
          <Text
            body1
            light
            style={{
              marginTop: 20,
              marginBottom: 15,
              textAlign: 'center',
            }}
          >
            You have sent successfully $980.00 to your wallet via your PayPal balance
          </Text>

          <Text subhead bold>
            Transaction ID: 5N019383MNHU
          </Text>
        </View>
      </ScrollView>
      <Button
        icon={<Icon name="plus" color={colors.primary} style={{ marginRight: 5 }} />}
        outline
        style={{
          marginHorizontal: 20,
          backgroundColor: colors.background,
        }}
        onPress={() => navigation.navigate('FTopUp')}
      >
        {t('add_new_transaction')}
      </Button>
    </SafeAreaView>
  );
}
