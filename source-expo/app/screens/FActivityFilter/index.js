import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { Header, Icon, SafeAreaView, Button, PaymentOption, Text } from '@/components';
import { BaseStyle, useTheme } from '@/config';
import { FPayment, FPeriod } from '@/data';

export default function FActivityFilter() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [payments] = useState(FPayment);
  const [payment, setPayment] = useState(FPayment[0]);
  const [periods] = useState(FPeriod);
  const [period, setPeriod] = useState(FPeriod[0]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView}>
      <Header
        title={t('activity_filter')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text title3>{t('payment')}</Text>
        <View style={{ paddingVertical: 20 }}>
          {payments.map((item, index) => (
            <PaymentOption
              key={index}
              style={{ paddingVertical: 10 }}
              isIcon={false}
              checked={item.id === payment.id}
              title={item.title}
              onPress={() => setPayment(item)}
            />
          ))}
        </View>
        <Text title3>{t('period')}</Text>
        <View style={{ paddingVertical: 20 }}>
          {periods.map((item, index) => (
            <PaymentOption
              key={index}
              style={{ paddingVertical: 10 }}
              isIcon={false}
              checked={item.id === period.id}
              title={item.title}
              onPress={() => setPeriod(item)}
            />
          ))}
        </View>
      </ScrollView>
      <Button
        style={{ marginHorizontal: 20, marginTop: 20 }}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigation.goBack();
          }, 500);
        }}
        loading={loading}
      >
        {t('ok')}
      </Button>
    </SafeAreaView>
  );
}
