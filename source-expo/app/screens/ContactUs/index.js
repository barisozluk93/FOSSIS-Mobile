import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Button, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

const regionInit = {
  latitude: 1.352083,
  longitude: 103.819839,
  latitudeDelta: 0.009,
  longitudeDelta: 0.004,
};

const successInit = {
  name: true,
  email: true,
  message: true,
};

const ContactUs = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(successInit);
  const [loading, setLoading] = useState(false);
  const [region] = useState(regionInit);

  /**
   * @description Called when user sumitted form
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  const onSubmit = () => {
    if (name === '' || email === '' || message === '') {
      setSuccess({
        ...success,
        email: email !== '' ? true : false,
        name: name !== '' ? true : false,
        message: message !== '' ? true : false,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigation.goBack();
      }, 500);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('contact_us')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.contain}>
          <View style={{ height: 180, width: '100%' }}>
            <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region} onRegionChange={() => {}}>
              <Marker
                coordinate={{
                  latitude: 10.73902,
                  longitude: 106.709938,
                }}
              />
            </MapView>
          </View>
          <Text headline style={{ marginVertical: 10 }}>
            {t('contact_details')}
          </Text>
          <TextInput
            style={[BaseStyle.textInput]}
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
            style={[BaseStyle.textInput, { marginTop: 10, height: 120 }]}
            onChangeText={(text) => setMessage(text)}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder={t('message')}
            placeholderTextColor={success.message ? BaseColor.grayColor : colors.primary}
            value={message}
          />
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          loading={loading}
          full
          onPress={() => {
            onSubmit();
          }}
        >
          {t('send')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;
