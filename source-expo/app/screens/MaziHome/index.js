import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaziListApp } from '@/config/maziHome';
import { SafeAreaView, Text, Icon } from '@/components';
import { BaseStyle, useTheme, BaseColor } from '@/config';
import SettingScreen from '@/screens/Setting';
import ComponentList from '@/screens/ComponentList';
import Screens from './Screens';
import ProductGrid1 from './Grid1';

const Tab = createMaterialBottomTabNavigator();

const Container = ({ children, title, description }) => {
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <View style={{ padding: 15, paddingTop: 0 }}>
        <Text header bold>
          {title}
        </Text>
        <Text subhead grayColor style={{ marginTop: 5 }}>
          {description}
        </Text>
      </View>
      {children}
    </SafeAreaView>
  );
};

const Apps = () => {
  const AppData = MaziListApp.filter((item) => !item.isHideInHome);
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <Container title={t('mazi_home')} description={t('description_mazi_home')}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 15, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {AppData.map((item, index) => (
              <View key={index.toString()} style={{ width: '50%' }}>
                <ProductGrid1
                  style={{
                    width: '100%',
                    paddingRight: index % 2 === 0 ? 10 : 0,
                    paddingLeft: index % 2 !== 0 ? 10 : 0,
                  }}
                  iconName={item.icon}
                  iconColor={item.backgroundColor}
                  description={item.subtitle}
                  title={t(item.title)}
                  image={item.image}
                  onPress={() => navigation.navigate(item.id)}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const ScreenReview = () => {
  const { t } = useTranslation();
  return (
    <Container title={t('mazi_screens')} description={t('mazi_screens_description')}>
      <Screens />
    </Container>
  );
};

const Components = () => {
  const { t } = useTranslation();
  return (
    <Container title={t('mazi_components')} description={t('mazi_components_description')}>
      <View style={{ flex: 1 }}>
        <ComponentList isShowHeader={false} />
      </View>
    </Container>
  );
};

const Setting = () => {
  const { t } = useTranslation();
  return (
    <Container title={t('mazi_setting')} description={t('mazi_setting_description')}>
      <SettingScreen isShowHeader={false} />
    </Container>
  );
};

const MusicMenu = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      // labeled={false}
      shifting
      // activeColor={BaseColor.whiteColor}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.primary}
      initialRouteName="MaziIntro"
      barStyle={{
        backgroundColor: colors.background,
        // height: 80,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
      }}
    >
      <Tab.Screen
        name="MaziIntro"
        component={Apps}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="MaziScreen"
        component={ScreenReview}
        options={{
          tabBarLabel: t('screens'),
          tabBarIcon: ({ color }) => <Icon name="layer-group" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="MaziComponent"
        component={Components}
        options={{
          tabBarLabel: t('components'),
          tabBarIcon: ({ color }) => <Icon name="list" color={color} size={18} />,
        }}
      />
      <Tab.Screen
        name="MaziSetting"
        component={Setting}
        options={{
          tabBarLabel: t('setting'),
          tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={18} />,
        }}
      />
    </Tab.Navigator>
  );
};

const MaziHome = () => {
  return <MusicMenu />;
};

export default MaziHome;
