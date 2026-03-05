import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { BaseStyle, useTheme, Images } from '@/config';
import { Button, Icon, SafeAreaView, Text, Header, ProfileGrid } from '@/components';
import styles from './styles';

export default function FTransactionCompleted({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loading] = useState(false);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }}>
        <Header
          title={t('transaction_completed')}
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
            <ProfileGrid image={Images.profile2} name="Steve Garrett" />
            <Text
              headline
              bold
              style={{
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              {t('transaction_completed')}
            </Text>
            <Text body2 light>
              Steave Garrent have received your money.
            </Text>

            <Text
              body1
              light
              style={{
                marginTop: 40,
              }}
            >
              {t('total')}
            </Text>
            <Text headline style={{ marginTop: 4 }}>
              $980.00 USD
            </Text>
          </View>

          <Button loading={loading} full onPress={() => navigation.navigate('FSendMoney')}>
            {t('send_more')}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
