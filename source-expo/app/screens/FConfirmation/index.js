import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { FPaymentItemsData } from '@/data';
import { Button, Header, Icon, ListSearchResult, PaymentItem, SafeAreaView, Text } from '@/components';
import ModalChoosePayment from './ModalChoosePayment';

const FBank = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [item, setItem] = useState(FPaymentItemsData[0]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('transfer_confirmation')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <PaymentItem
          key={item.id}
          style={{ marginTop: 20 }}
          id={item.id}
          expiryDate={item.expiryDate}
          iconName={item.iconName}
          isPrimary={true}
          textPrimary={t('change')}
          onPress={() => setModalVisible(true)}
        />
        <ListSearchResult textLeft={t('send_to')} textRight="Steave Grret" />
        <ListSearchResult textLeft={t('email')} textRight="steave.garret@gmail.com" />
        <ListSearchResult textLeft={t('phone')} textRight="+092 0123 2345" />
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
        <Button full style={{ marginTop: 20 }} onPress={() => navigation.navigate('FTransactionCompleted')}>
          {t('confirm')}
        </Button>
      </View>
      <ModalChoosePayment
        option={item}
        options={FPaymentItemsData}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        onChange={(itemInline) => {
          setItem(itemInline);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default FBank;
