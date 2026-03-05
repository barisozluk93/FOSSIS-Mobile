import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, UIManager, View } from 'react-native';
import { Button, Header, Icon, SafeAreaView, Text } from '@/components';
import { BaseStyle, useTheme } from '@/config';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EBankDetail = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading] = useState(false);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('payment')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() => (
          <Text body1 style={{ color: colors.primaryDark }}>
            {t('save')}
          </Text>
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />

      <View style={{ padding: 20 }}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={{ flex: 1 }}>
            <Icon
              name={'credit-card'}
              size={40}
              solid={true}
              style={{ marginRight: 12, width: 48 }}
              color={colors.text}
            />
            <Text style={{ marginTop: 12 }} headline>
              {'**** **** **** 1990'}
            </Text>
            <Text footnote light style={{ marginTop: 4 }}>
              {t('expiries')} {'03/2020'}
            </Text>
          </View>
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <Text footnote darkPrimaryColor style={{ marginTop: 4 }}>
              {t('primary')}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ padding: 20 }}>
        <Button outline loading={loading} full onPress={() => navigation.goBack()}>
          {t('delete')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EBankDetail;
