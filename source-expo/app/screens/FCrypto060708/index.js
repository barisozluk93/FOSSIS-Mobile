import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { FBuyList, FSellList, FTransfer } from '@/data';
import { Header, Icon, ListTextLR, SafeAreaView, Tag, Text } from '@/components';
import { BaseStyle, useTheme } from '@/config';
import { enableExperimental } from '@/utils';

const FAddTransaction = (props) => {
  const route = useRoute();
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const TABS = [
    {
      id: 1,
      title: t('buy'),
    },
    {
      id: 2,
      title: t('sell'),
    },
    {
      id: 3,
      title: t('transfer'),
    },
  ];
  const [tab, setTab] = useState(TABS[0]);

  useEffect(() => {
    const id = route?.params?.id;
    if (id) {
      TABS.forEach((tabInline) => {
        tabInline.id === id && setTab(tabInline);
      });
    }
  }, [route?.params?.id]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('Bitcoin')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        renderRight={() => {
          return (
            <Text body1 lightPrimaryColor>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('CHome');
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {TABS.map((item, index) => (
          <View key={index} style={{ flex: 1, paddingHorizontal: 20 }}>
            <Tag
              primary
              style={{
                backgroundColor: tab.id === item.id ? colors.primary : colors.background,
              }}
              onPress={() => {
                enableExperimental();
                setTab(item);
              }}
            >
              <Text body1={tab.id !== item.id} light={tab.id !== item.id} whiteColor={tab.id === item.id}>
                {item.title}
              </Text>
            </Tag>
          </View>
        ))}
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {tab.id === 1 &&
          FBuyList.map((item) => (
            <ListTextLR
              style={{ marginTop: 20 }}
              key={item.id}
              textLeft={t(item.textLeft)}
              textRight={item.textRight}
            />
          ))}
        {tab.id === 2 &&
          FSellList.map((item) => (
            <ListTextLR style={{ marginTop: 20 }} key={item.id} textLeft={item.textLeft} textRight={item.textRight} />
          ))}
        {tab.id === 3 &&
          FTransfer.map((item) => (
            <ListTextLR style={{ marginTop: 20 }} key={item.id} textLeft={item.textLeft} textRight={item.textRight} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAddTransaction;
