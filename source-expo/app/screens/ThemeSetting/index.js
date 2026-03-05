import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StatusBar, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseStyle, useTheme } from '@/config';
import { Header, SafeAreaView, Icon, Text, ProductColorPicker, Image } from '@/components';
import { ApplicationActions } from '@/actions';
import styles from './styles';
import { THEME } from './config';

export default function ThemeSetting({ navigation }) {
  const [height, setHeight] = useState(0);
  const [theme, setTheme] = useState(THEME[0]);
  const themeStorage = useSelector((state) => state.application.theme || 'pink');
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const themeCurrent = THEME.find((item) => item.theme === themeStorage);
    setTheme(themeCurrent);
  }, []);

  const sizeImage = useMemo(() => {
    var heighImage = height - 20;
    return {
      height: heighImage,
      width: (heighImage * 500) / 1082,
    };
  }, [height]);

  /**
   * call when save theme
   *
   */
  const onChangeTheme = () => {
    dispatch(ApplicationActions.onChangeTheme(theme.theme));
    Platform.OS === 'android' && StatusBar.setBackgroundColor(theme.color, true);
    navigation.goBack();
  };

  const onSwitchTheme = (themeSelected) => {
    setTheme(themeSelected);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('theme')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => (
          <Text body1 style={{ color: colors.primaryDark }}>
            {t('save')}
          </Text>
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={onChangeTheme}
      />
      <View style={{ backgroundColor: colors.card, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.row, { textTransform: 'uppercase' }]} caption2 grayColor>
            {t('reviews')}
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={{ padding: 20, paddingTop: 0 }}
            style={{ flex: 1 }}
            onLayout={(event) => {
              let data = event.nativeEvent.layout;
              setHeight(data.height);
            }}
          >
            {theme.images.map((item, index) => (
              <View
                style={[styles.card, { marginRight: index === theme.images.length - 1 ? 0 : 15, height: '100%' }]}
                key={String(index)}
              >
                <Image
                  source={item}
                  style={[
                    {
                      height: sizeImage.height,
                      width: sizeImage.width,
                    },
                  ]}
                  borderRadius={8}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={[styles.row, { backgroundColor: colors.background, height: 100 }]}>
          <Text style={{ marginBottom: 5, textTransform: 'uppercase' }} caption2 grayColor>
            {t('theme')}
          </Text>
          <ProductColorPicker colorChoosed={theme} colors={THEME} onPress={onSwitchTheme} />
        </View>
      </View>
    </SafeAreaView>
  );
}
