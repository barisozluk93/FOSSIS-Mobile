import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Header, Icon, Image, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
// Load sample data
import { UserData } from '@/data';
import styles from './styles';

const ProfileEdit = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState(UserData[0].name);
  const [email, setEmail] = useState(UserData[0].email);
  const [address, setAddress] = useState(UserData[0].address);
  const [image] = useState(UserData[0].image);
  const [loading, setLoading] = useState(false);

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
        onPressRight={() => {}}
      />
      <ScrollView>
        <View style={styles.contain}>
          <View>
            <Image source={image} style={styles.thumb} borderRadius={50} />
          </View>
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('account')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setId(text)}
            autoCorrect={false}
            placeholder={t('input_id')}
            placeholderTextColor={BaseColor.grayColor}
            value={id}
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
            placeholder={t('input_name')}
            placeholderTextColor={BaseColor.grayColor}
            value={name}
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
            placeholder={t('input_email')}
            placeholderTextColor={BaseColor.grayColor}
            value={email}
          />
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {t('address')}
            </Text>
          </View>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setAddress(text)}
            autoCorrect={false}
            placeholder={t('input_address')}
            placeholderTextColor={BaseColor.grayColor}
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
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }}
        >
          {t('confirm')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
