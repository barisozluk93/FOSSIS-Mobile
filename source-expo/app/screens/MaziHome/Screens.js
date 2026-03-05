import { useState } from 'react';
import { FlatList, ImageBackground, TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MaziListApp } from '@/config/maziHome';
import { Text } from '@/components';
import { useTheme, BaseColor } from '@/config';
import { parseHexTransparency } from '@/utils';
import styles from './styles';

const Screens = () => {
  const ScreensData = MaziListApp.filter((item) => !item.isHideInScreens);
  const [app, setApp] = useState(ScreensData[0]);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    const isSelect = item.id === app.id;

    return (
      <TouchableOpacity
        style={[
          styles.itemLeftScreen,
          {
            backgroundColor: isSelect ? parseHexTransparency(colors.primary, 40) : 'transparent',
            borderLeftColor: isSelect ? colors.primary : 'transparent',
          },
        ]}
        onPress={() => setApp(item)}
      >
        <ImageBackground source={item.image} style={{ height: 60, width: 60 }} borderRadius={8} />
        <Text
          body2
          bold={isSelect}
          style={{
            alignItems: 'center',
            marginTop: 5,
            color: isSelect ? BaseColor.whiteColor : colors.text,
          }}
          numberOfLines={1}
        >
          {t(item.title)}
        </Text>
        <Text overline grayColor={!isSelect} whiteColor={isSelect}>
          {item.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        styles.containerScreens,
        {
          borderTopColor: parseHexTransparency(colors.border, 40),
        },
      ]}
    >
      <View
        style={{
          flex: 2.5,
          backgroundColor: parseHexTransparency(colors.border, 40),
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          data={ScreensData}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          flex: 7.5,
          backgroundColor: colors.card,
        }}
      >
        <ScrollView
          contentContainerStyle={{ paddingRight: 10, paddingTop: 10 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {Object.keys(app.screens).map((name, index) => {
            const { title } = app?.screens?.[name]?.options ?? {};
            return (
              <TouchableOpacity
                key={name}
                style={[
                  styles.itemRightScreen,
                  {
                    backgroundColor: colors.background,
                    marginBottom: 5,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  },
                ]}
                onPress={() => navigation.navigate(name, {})}
              >
                <View
                  style={[
                    styles.contentRightScreen,
                    {
                      backgroundColor: parseHexTransparency(colors.primary, 40),
                    },
                  ]}
                >
                  <Text body2 bold whiteColor>
                    {index + 1}
                  </Text>
                </View>
                <Text body2>{t(title)}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default Screens;
