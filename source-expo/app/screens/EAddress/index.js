import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { Button, CheckBox, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { EAddressData } from '@/data';
import styles from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddressItem = ({
  style,
  isSelected = true,
  name = 'Steve Garrett',
  address = '35 Mandalay Road # 13–37 Mandalay Towers Singapore 308215 SINGAPORE',
  phone = '+65 1290 1234',
  onEdit = () => {},
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          padding: 12,
          borderRadius: 8,
          backgroundColor: isSelected ? colors.primary : colors.backgroundColor,
          borderWidth: isSelected ? 0 : StyleSheet.hairlineWidth,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text headline whiteColor={isSelected} style={{ flex: 1 }}>
          {name}
        </Text>
        <TouchableOpacity onPress={onEdit} hitSlop={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <Icon
            name="edit"
            style={{
              color: isSelected ? BaseColor.whiteColor : colors.text,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text body2 whiteColor={isSelected} style={{ marginBottom: 4, marginTop: 6 }}>
        {address}
      </Text>
      <Text headline whiteColor={isSelected}>
        {phone}
      </Text>
    </TouchableOpacity>
  );
};

const EAddress = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [address, setAddress] = useState(EAddressData[0]);
  const [loading] = useState(false);
  const [addresses] = useState(EAddressData);
  const [refreshing] = useState(false);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');
  const [type, setType] = useState('home'); // home or office
  const [add, setAdd] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

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

  const onEdit = (item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setAdd(true);
    setName(item.name);
    setPhone(item.phone);
    setStreet(item.address);
    setCity('Ho Chi Minh City');
    setPostCode('999999');
    setCountry('Viet Nam');
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('address')}
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
          navigation.goBack();
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
          data={addresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <AddressItem
              style={{ marginTop: 10 }}
              name={item.name}
              address={item.address}
              phone={item.phone}
              isSelected={address.id === item.id}
              onPress={() => setAddress(item)}
              onEdit={() => onEdit(item)}
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
                placeholder={t('name')}
                success={success.street}
                value={name}
              />
              <TextInput
                style={{ marginTop: 10 }}
                onChangeText={(text) => setPhone(text)}
                placeholder={t('phone_number')}
                success={success.street}
                value={phone}
              />
              <TextInput
                style={{ marginTop: 10, flex: 1 }}
                onChangeText={(text) => setStreet(text)}
                placeholder={t('street_address')}
                success={success.street}
                value={street}
                numberOfLines={6}
                multiline={false}
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
                <View
                  style={{
                    flex: 3.5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default EAddress;
