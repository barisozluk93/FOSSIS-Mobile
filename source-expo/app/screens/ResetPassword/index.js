import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import { Button, Header, Icon, Image, SafeAreaView, TextInput } from '@/components';
import styles from './styles';
import { isNullOrEmpty } from '@/utils/utility';
import { resetPasswordRequest } from '@/apis/authApi';
import Toast from 'react-native-toast-message';

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

  const onConfirm = async () => {

    if(isNullOrEmpty(email)) {
      setSuccess({
        ...success,
        email: !isNullOrEmpty(email) ? true : false
      })
    }
    else{
      setLoading(true);

      resetPasswordRequest(email).then(response => {
        if (response.isSuccess) {
          Toast.show({
            type: 'success',
            text1: t('success'),
            text2: t('success_message'),
          });

          setTimeout(() => {
            navigation.navigate('SignIn');
            setLoading(false);
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
      }).catch((error) => {
        Toast.show({
          type: 'error',
          text1: t('error'),
          text2: t('error_file_message'),
        });

        setLoading(false);
      });
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

      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      </View>

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
            autoCorrect={false}
            placeholder={t('email_address')}
            placeholderTextColor={success.email ? BaseColor.grayColor : colors.primary}
            value={email}
            selectionColor={colors.primary}
          />
          <View style={{ width: '100%' }}>
            <Button
              full
              loading={loading}
              style={{ marginTop: 20 }}
              onPress={() => {
                onConfirm();
              }}
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
