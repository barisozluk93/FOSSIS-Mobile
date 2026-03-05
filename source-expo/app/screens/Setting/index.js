import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { BaseStyle, useTheme, BaseColor, BaseSetting } from '@/config';
import * as Utils from '@/utils';
import { getInto } from '@/selectors';
import { ApplicationActions } from '@/actions';
import { Header, SafeAreaView, Icon, Text } from '@/components';
import styles from './styles';

const { setIntro } = ApplicationActions;

const Item = ({ onPress, title, ComponentRight = null, iconName, iconBackground, isBorder = true }) => {
  const { colors } = useTheme();
  const styleItem = [
    styles.profileItem,
    {
      borderBottomColor: colors.border,
    },
  ];
  return (
    <TouchableOpacity style={styleItem} onPress={onPress} disabled={!onPress}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 5,
          backgroundColor: iconBackground,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 15,
        }}
      >
        <Icon size={20} name={iconName} color={BaseColor.whiteColor} />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            borderBottomWidth: isBorder ? StyleSheet.hairlineWidth : 0,
            borderBottomColor: colors.border,
            paddingVertical: 15,
            justifyContent: 'center',
            height: 50,
            paddingRight: 15,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text body1>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>{ComponentRight}</View>
          {onPress && (
            <Icon name="angle-right" size={18} color={BaseColor.grayColor} style={{ marginLeft: 5 }} enableRTL={true} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Setting({ isShowHeader = true }) {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const forceDark = useSelector((state) => state.application.force_dark);
  const font = useSelector((state) => state.application.font);

  const [reminders, setReminders] = useState(true);
  const dispatch = useDispatch();
  const intro = useSelector(getInto);
  /**
   * @description Call when reminder option switch on/off
   */
  const toggleSwitch = (value) => {
    setReminders(value);
  };

  const darkOption = forceDark ? t('always_on') : forceDark !== null ? t('always_off') : t('dynamic_system');

  const onChangeIntro = () => {
    dispatch(setIntro(!intro));
  };

  const renderContent = () => {
    return (
      <View style={{ backgroundColor: colors.card, flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.contain]}>
          <View
            style={{
              backgroundColor: colors.background,
              borderRadius: 8,
            }}
          >
            <Item
              title={t('language')}
              iconName="globe"
              iconBackground={BaseColor.pinkLightColor}
              onPress={() => {
                navigation.navigate('ChangeLanguage');
              }}
              ComponentRight={
                <Text body1 grayColor>
                  {Utils.languageFromCode(i18n.language)}
                </Text>
              }
            />
            <Item
              title={t('theme')}
              iconName="palette"
              iconBackground={BaseColor.greenColor}
              onPress={() => {
                navigation.navigate('ThemeSetting');
              }}
              ComponentRight={
                <View
                  style={[
                    styles.themeIcon,
                    {
                      backgroundColor: colors.primary,
                      borderColor: colors.border,
                    },
                  ]}
                />
              }
            />
            <Item
              title={t('font')}
              iconName="font"
              iconBackground={BaseColor.accentColor}
              onPress={() => {
                navigation.navigate('SelectFontOption');
              }}
              ComponentRight={
                <Text body1 grayColor>
                  {font ?? t('default')}
                </Text>
              }
            />

            <Item
              title={t('dark_theme')}
              iconName="adjust"
              iconBackground={BaseColor.pinkColor}
              onPress={() => {
                navigation.navigate('SelectDarkOption');
              }}
              ComponentRight={
                <Text body1 grayColor>
                  {darkOption}
                </Text>
              }
            />
            <Item
              title={t('notification')}
              iconName="bell"
              iconBackground={BaseColor.pinkDarkColor}
              contentStyle={{ paddingVertical: 10 }}
              ComponentRight={<Switch size={18} onValueChange={toggleSwitch} value={reminders} />}
            />
            <Item
              title={t('Display intro screen')}
              iconName="teamspeak"
              iconBackground={BaseColor.kashmir}
              contentStyle={{ paddingVertical: 10 }}
              ComponentRight={<Switch onValueChange={onChangeIntro} value={intro} />}
            />
            <Item
              isBorder={false}
              title={t('app_version')}
              iconName="vimeo-v"
              iconBackground={BaseColor.blueColor}
              ComponentRight={
                <Text body1 grayColor>
                  {BaseSetting.appVersion}
                </Text>
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  };

  if (!isShowHeader) {
    return renderContent();
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('setting')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={BaseColor.grayColor} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      {renderContent()}
    </SafeAreaView>
  );
}
