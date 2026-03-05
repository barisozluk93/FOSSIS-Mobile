import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { FRecentTransactions } from '@/data';
import { Button, Header, Icon, ProfileGridSmall, SafeAreaView, Text, TextInput, TextInputMoney } from '@/components';

const FBank = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [memo, setMemo] = useState('');
  const [add] = useState(false);
  const item = FRecentTransactions[1];
  const [money, setMoney] = useState(32000);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('transfer_amount')}
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
      />

      <View style={{ paddingHorizontal: 20, alignItems: 'center' }}>
        <ProfileGridSmall
          style={{ marginVertical: 20 }}
          image={item.image}
          name={item.name}
          onPress={() => navigation.navigate('FChooseFriend')}
        />
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
        <Button full style={{ marginTop: 20 }} onPress={() => navigation.navigate('FConfirmation')}>
          {t('send')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default FBank;
