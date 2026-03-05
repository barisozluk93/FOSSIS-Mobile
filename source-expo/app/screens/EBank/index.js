import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  Switch,
  UIManager,
  View,
} from 'react-native';
import { BaseStyle, useTheme } from '@/config';
import { EPaymentItemsData } from '@/data';
import { Button, Header, Icon, MonthYearPicker, PaymentItem, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FTopUp = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading] = useState(false);
  const [payments] = useState(EPaymentItemsData);
  const [refreshing] = useState(false);
  const [card, setCard] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [digit, setDigit] = useState('');
  const [name, setName] = useState(''); // home or office
  const [add, setAdd] = useState(false);

  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });

  const onAdd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(!add);
  };

  const onCloseAdd = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('payment')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() =>
          add && (
            <Text body1 style={{ color: colors.primaryDark }}>
              {t('save')}
            </Text>
          )
        }
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          add && onCloseAdd();
        }}
      />
      {!add && (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={payments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <PaymentItem
              style={{ marginTop: 20 }}
              id={item.id}
              expiryDate={item.expiryDate}
              iconName={item.iconName}
              isPrimary={index === 0}
              onPress={() => navigation.navigate('EBankDetail')}
            />
          )}
        />
      )}

      <View style={{ padding: 20 }}>
        <Button
          outline
          loading={loading}
          full
          onPress={() => {
            onAdd();
          }}
          icon={!add && <Icon name={'plus'} style={{ color: colors.primary, marginHorizontal: 4 }} />}
        >
          {add ? t('cancel') : t('add_new')}
        </Button>
      </View>
      {add && (
        <KeyboardAvoidingView behavior={'height'}>
          <ScrollView>
            <View style={{ padding: 20, paddingTop: 0 }}>
              <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setName(text)}
                placeholder={t('name_on_card')}
                success={success.name}
                value={name}
              />
              <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setCard(text)}
                placeholder={t('credit_card_number')}
                success={success.card}
                keyboardType="numeric"
                value={card}
              />
              <MonthYearPicker style={{ marginTop: 10 }} onChange={() => {}} />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 3.5 }}>
                  <TextInput
                    onChangeText={(text) => setDigit(text)}
                    placeholder={t('digit_num')}
                    success={success.digit}
                    keyboardType="numeric"
                    value={digit}
                  />
                </View>
                <View style={styles.digiNumber}>
                  <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                    <Switch onValueChange={() => setIsSave((isSaveInline) => !isSaveInline)} value={isSave} />
                    <Text style={{ marginLeft: 8 }} body1>
                      {t('save')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default FTopUp;
