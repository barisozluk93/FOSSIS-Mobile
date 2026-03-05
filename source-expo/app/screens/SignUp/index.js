import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Header, Icon, SafeAreaView, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import styles from './styles';

const successInit = {
  name: true,
  email: true,
  address: true,
};

const SignUp = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onSignUp = () => {
    if (name === '' || email === '' || address === '') {
      setSuccess({
        ...success,
        name: name !== '' ? true : false,
        email: email !== '' ? true : false,
        address: address !== '' ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.navigate('SignIn');
      }, 500);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('sign_up')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={(text) => setName(text)}
            autoCorrect={false}
            placeholder={t('name')}
            placeholderTextColor={success.name ? BaseColor.grayColor : colors.primary}
            value={name}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setEmail(text)}
            autoCorrect={false}
            placeholder={t('email')}
            keyboardType="email-address"
            placeholderTextColor={success.email ? BaseColor.grayColor : colors.primary}
            value={email}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setAddress(text)}
            autoCorrect={false}
            placeholder={t('address')}
            placeholderTextColor={success.address ? BaseColor.grayColor : colors.primary}
            value={address}
          />
          <View style={{ width: '100%' }}>
            <Button full style={{ marginTop: 20 }} loading={loading} onPress={() => onSignUp()}>
              {t('sign_up')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
