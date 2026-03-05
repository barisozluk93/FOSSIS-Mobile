import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Button, CheckBox, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

export default function EShipping({ navigation }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('home'); // home or office

  const [success] = useState({
    street: true,
    city: true,
    postCode: true,
    country: true,
    contactName: true,
    email: true,
    phone: true,
  });

  /**
   *
   * Called when process checkout
   */
  const onCheckOut = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('EPayment');
    }, 500);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ flex: 1 }}>
        <Header
          title={t('Shipping')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text headline>{t('dilivery_address').toUpperCase()}</Text>
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setStreet(text)}
            placeholder={t('street_address')}
            success={success.street}
            value={street}
          />
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setCity(text)}
            placeholder={t('city')}
            success={success.city}
            value={city}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 3.5 }}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                keyboardType="numeric"
                placeholder={t('post_code')}
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={styles.inputItem}>
              <TextInput
                onChangeText={(text) => setCountry(text)}
                placeholder={t('country')}
                success={success.country}
                value={country}
                icon={<Icon name="chevron-down" size={12} solid color={BaseColor.grayColor} />}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 3.5, flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox
                title={t('home')}
                checked={type === 'home'}
                onPress={() => setType(type === 'home' ? 'office' : 'home')}
              />
            </View>
            <View style={[styles.inputItem, { flexDirection: 'row', alignItems: 'center' }]}>
              <CheckBox
                title={t('office')}
                checked={type === 'office'}
                onPress={() => setType(type === 'home' ? 'office' : 'home')}
              />
            </View>
          </View>

          <Text headline semibold style={{ marginTop: 20 }}>
            {t('contact_details').toUpperCase()}
          </Text>
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setContactName(text)}
            placeholder={t('contact_name')}
            success={success.street}
            value={contactName}
          />
          <TextInput
            style={{ marginTop: 10 }}
            onChangeText={(text) => setEmail(text)}
            placeholder={t('email')}
            success={success.email}
            value={email}
          />
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 3 }}>
              <TextInput
                onChangeText={(text) => setPostCode(text)}
                placeholder={t('code')}
                keyboardType="numeric"
                success={success.postCode}
                value={postCode}
              />
            </View>
            <View style={{ flex: 7, marginLeft: 10 }}>
              <TextInput
                onChangeText={(text) => setPhone(text)}
                placeholder={t('phone_number')}
                keyboardType="numeric"
                success={success.phone}
                value={phone}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onCheckOut();
            }}
          >
            {t('payment')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
