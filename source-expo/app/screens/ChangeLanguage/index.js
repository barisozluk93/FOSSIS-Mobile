import { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BaseStyle, useTheme, BaseColor, Languages, BaseSetting } from '@/config';
import * as Utils from '@/utils';
import { Header, SafeAreaView, TextInput, Icon, Text, Image, GridList, NotFound } from '@/components';
import { ApplicationActions } from '@/actions';
import styles from './styles';

export default function ChangeLanguage({ navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState(BaseSetting.languageSupport);
  const [languageSelected, setLanguageSelected] = useState(i18n.language);

  /**
   * @description Called when setting language is selected
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {string} select
   */
  const onChange = (select) => {
    setLanguageSelected(select);
  };

  /**
   * Called when apply change language
   */
  const saveLanguage = () => {
    if (!loading) {
      setLoading(true);
      const oldLanguage = i18n.language;
      dispatch(ApplicationActions.onChangeLanguage(languageSelected));
      i18n.changeLanguage(languageSelected);

      setTimeout(() => {
        Utils.reloadLocale(oldLanguage, languageSelected);
        navigation.goBack();
      }, 500);
    }
  };

  const filterLanguage = (text) => {
    setCountry(text);
    if (text) {
      setLanguage(language.filter((item) => Utils.languageFromCode(item).includes(text)));
    } else {
      setLanguage(BaseSetting.languageSupport);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('change_language')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={saveLanguage}
      />
      <View style={styles.contain}>
        <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
          <TextInput
            onChangeText={filterLanguage}
            placeholder={t('search_language')}
            value={country}
            iconLeft={<Icon name="search" color={colors.border} style={{ marginRight: 8 }} size={18} />}
            icon={
              country ? (
                <TouchableOpacity onPress={() => filterLanguage('')}>
                  <Icon name="times" size={16} color={BaseColor.grayColor} />
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
        <View style={{ flex: 1, backgroundColor: colors.card }}>
          {language.length === 0 && <NotFound />}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 15,
            }}
          >
            <GridList
              columns={3}
              data={language}
              renderItem={({ item }) => {
                const selected = item === languageSelected;
                return (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 3,
                      borderRadius: 8,
                    }}
                    onPress={() => onChange(item)}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        height: 130,
                        backgroundColor: selected ? Utils.parseHexTransparency(colors.primary, 75) : colors.background,
                        padding: 15,
                        borderRadius: 8,
                      }}
                    >
                      <Image
                        source={Languages[item].image}
                        style={{
                          width: 60,
                          height: 60,
                          marginBottom: 10,
                        }}
                        borderRadius={30}
                        borderWidth={StyleSheet.hairlineWidth}
                        borderColor={colors.border}
                      />
                      <Text
                        body2
                        bold={selected}
                        style={
                          selected
                            ? {
                                color: BaseColor.whiteColor,
                              }
                            : {}
                        }
                      >
                        {Utils.languageFromCode(item)}
                      </Text>
                      <Text grayColor style={{ textTransform: 'uppercase', fontSize: 10 }}>
                        {item}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
