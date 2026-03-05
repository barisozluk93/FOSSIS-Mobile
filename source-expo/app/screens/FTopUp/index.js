import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  Switch,
  UIManager,
  View,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { FPaymentItemsData } from '@/data';
import {
  Button,
  Header,
  Icon,
  MonthYearPicker,
  PaymentItem,
  SafeAreaView,
  Text,
  TextInput,
  TextInputMoney,
} from '@/components';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const EBank = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading] = useState(false);
  const [payments, setPayments] = useState(FPaymentItemsData);
  const [paymentChoosed, setPaymentChoosed] = useState(FPaymentItemsData[0]);
  const [card, setCard] = useState('');
  const [isSave, setIsSave] = useState(false);
  const [digit, setDigit] = useState('');
  const [name, setName] = useState(''); // home or office
  const [add, setAdd] = useState(false);
  const [memo, setMemo] = useState('');
  const [date, setDate] = useState(new Date());
  const [money, setMoney] = useState(32000);

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

  const onSave = () => {
    const payment = {
      id: card,
      expiryDate: `Expiries ${moment(date).format('MM')}/${moment(date).format('YYYY')}`,
      iconName: 'credit-card',
    };
    setDigit('');
    setName('');
    setCard('');
    setDate(new Date());
    setPayments([payment].concat(payments));
    setPaymentChoosed(payment);
    onAdd();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('topup')}
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
        onPressRight={() => onSave()}
      />
      {!add && (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <TextInputMoney value={money} onChange={(value) => setMoney(value)} />
            <TextInput
              style={{
                marginTop: 20,
                height: 'auto',
                paddingVertical: 10,
                fontSize: 18,
              }}
              inputStyle={Typography.body1}
              minHeight={120}
              onChangeText={(text) => setMemo(text)}
              textAlignVertical="top"
              multiline={true}
              autoCorrect={false}
              placeholder={t('please_input_the_memo')}
              placeholderTextColor={BaseColor.grayColor}
              value={memo}
              selectionColor={colors.primary}
              numberOfLines={10}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              keyboardType="default"
              returnKeyType="done"
            />
            <Button full style={{ marginTop: 20 }} onPress={() => navigation.navigate('FTopUpConfirmation')}>
              {t('ok')}
            </Button>
          </View>
          {payments.map((item) => (
            <PaymentItem
              key={item.id}
              style={{
                borderWidth: 1,
                borderBottomWidth: 1,
                borderColor: paymentChoosed.id === item.id ? colors.primary : colors.background,
                borderBottomColor: paymentChoosed.id === item.id ? colors.primary : colors.background,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
              id={item.id}
              expiryDate={item.expiryDate}
              iconName={item.iconName}
              isPrimary={item.id === FPaymentItemsData[0].id}
              textPrimary="Free"
              onPress={() => setPaymentChoosed(item)}
            />
          ))}
        </ScrollView>
      )}

      <View style={{ padding: 20 }}>
        <Button
          outline
          loading={loading}
          full
          onPress={() => {
            onAdd();
          }}
          icon={
            !add && (
              <Icon
                name={'plus'}
                style={{
                  color: colors.primary,
                  marginHorizontal: 4,
                }}
              />
            )
          }
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
              <MonthYearPicker
                style={{ marginTop: 10 }}
                onChange={(dateInline) => console.log('dateInline', dateInline)}
              />
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
                    maxLength={3}
                  />
                </View>
                <View style={styles.digiNumber}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
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

export default EBank;
