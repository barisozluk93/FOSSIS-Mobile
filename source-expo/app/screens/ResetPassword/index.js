import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Button, Header, Icon, SafeAreaView, TextInput } from '@/components';

const successInit = {
  email: true,
};
const ResetPassword = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(successInit);

  const onReset = () => {
    if (email === '') {
      setSuccess({
        ...success,
        email: false,
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
        title={t('reset_password')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            padding: 20,
            width: '100%',
          }}
        >
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 65 }]}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => {
              setSuccess({
                ...success,
                email: true,
              });
            }}
            autoCorrect={false}
            placeholder={t('email_address')}
            placeholderTextColor={success.email ? BaseColor.grayColor : colors.primary}
            value={email}
            selectionColor={colors.primary}
          />
          <View style={{ width: '100%' }}>
            <Button
              full
              style={{ marginTop: 20 }}
              onPress={() => {
                onReset();
              }}
              loading={loading}
            >
              {t('reset_password')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
