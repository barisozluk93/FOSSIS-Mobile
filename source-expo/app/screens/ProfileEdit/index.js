import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Header, Icon, Image, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { profileEdit } from '@/apis/userApi';
import { getUserById } from '@/actions/auth';
import { avatarUploadFolderUrl, isNullOrEmpty } from '@/utils/utility';
import Toast from 'react-native-toast-message';

const successInit = {
  email: true,
  name: true,
  surname: true,
  username: true,
  phone: true,
  country: true,
  city: true,
  district: true,
  address: true
};

const ProfileEdit = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user } = useSelector((state) => state.user);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [district, setDistrict] = useState(user.district);
  const [address, setAddress] = useState(user.address);

  const [image] = useState(user.fileId ? "data:" + user.fileResult.contentType + ";base64," + user.fileResult.fileContents : Images.avata5);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onConfirm = async () => {

    if (isNullOrEmpty(username) || isNullOrEmpty(name) || isNullOrEmpty(surname) || isNullOrEmpty(email) || isNullOrEmpty(phone)
    || isNullOrEmpty(country) || isNullOrEmpty(city) || isNullOrEmpty(district) || isNullOrEmpty(address)) {
      setSuccess({
        ...success,
        username: !isNullOrEmpty(username) ? true : false,
        name: !isNullOrEmpty(name) ? true : false,
        surname: !isNullOrEmpty(surname) ? true : false,
        email: !isNullOrEmpty(email) ? true : false,
        phone: !isNullOrEmpty(phone) ? true : false,
        country: !isNullOrEmpty(country) ? true : false,
        city: !isNullOrEmpty(city) ? true : false,
        district: !isNullOrEmpty(district) ? true : false,
        address: !isNullOrEmpty(address) ? true : false,
      });
    }
    else {
      setLoading(true);

      profileEdit(user.id, email, user.fileId, name, surname, username, phone, country, city, district, address, user.roles, "***").then(response => {
        if (response.isSuccess) {
          dispatch(getUserById(user.id));

          Toast.show({
            type: 'success',
            text1: t('success'),
            text2: t('success_message'),
          });

          setTimeout(() => {
            setLoading(false);
            navigation.goBack();
          }, 500);
        }
        else {
          Toast.show({
            type: 'error',
            text1: t('error'),
            text2: t('error_file_message'),
          });

          setLoading(false);
        }
      }).catch((err) => {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: t('error_file_message'),
        });

        setLoading(false);
      })
    }
  }

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('edit_profile')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => { }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          <View style={styles.contain}>
            <View>
              {user.fileId && <Image source={{uri :image}} style={styles.thumb} borderRadius={50} />}
              {!user.fileId && <Image source={image} style={styles.thumb} borderRadius={50} />}
            </View>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('username')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setUsername(text)}
              autoCorrect={false}
              placeholder={t('username')}
              placeholderTextColor={success.username ? BaseColor.grayColor : colors.primary}
              value={username}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('name')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setName(text)}
              autoCorrect={false}
              placeholder={t('name')}
              placeholderTextColor={success.name ? BaseColor.grayColor : colors.primary}
              value={name}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('surname')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setSurname(text)}
              autoCorrect={false}
              placeholder={t('surname')}
              placeholderTextColor={success.surname ? BaseColor.grayColor : colors.primary}
              value={surname}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('email')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              placeholder={t('email')}
              placeholderTextColor={success.email ? BaseColor.grayColor : colors.primary}
              value={email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('phone')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setPhone(text)}
              autoCorrect={false}
              placeholder={t('phone')}
              placeholderTextColor={success.phone ? BaseColor.grayColor : colors.primary}
              value={phone}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('country')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setCountry(text)}
              autoCorrect={false}
              placeholder={t('country')}
              placeholderTextColor={success.country ? BaseColor.grayColor : colors.primary}
              value={country}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('city')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setCity(text)}
              autoCorrect={false}
              placeholder={t('city')}
              placeholderTextColor={success.city ? BaseColor.grayColor : colors.primary}
              value={city}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('district')}
              </Text>
            </View>
            <TextInput
              style={BaseStyle.textInput}
              onChangeText={(text) => setDistrict(text)}
              autoCorrect={false}
              placeholder={t('district')}
              placeholderTextColor={success.district ? BaseColor.grayColor : colors.primary}
              value={district}
              selectionColor={colors.primary}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {t('address')}
              </Text>
            </View>
            <TextInput
              style={[BaseStyle.textInput, { height: 100}]}
              multiline
              scrollEnabled
              onChangeText={(text) => setAddress(text)}
              autoCorrect={false}
              placeholder={t('address')}
              placeholderTextColor={success.district ? BaseColor.grayColor : colors.primary}
              value={address}
              selectionColor={colors.primary}
            />
          </View>
        </ScrollView>
        <View style={{ padding: 20 }}>
          <Button
            loading={loading}
            full
            onPress={() => {
              onConfirm();
            }}
          >
            {t('confirm')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileEdit;
