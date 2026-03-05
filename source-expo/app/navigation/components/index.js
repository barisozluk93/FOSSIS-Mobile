import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';

export const tabBarIcon = ({ color, name }) => <Icon name={name} size={20} solid color={color} />;

export const tabBarIconHaveNoty = ({ color, name }) => (
  <View>
    {tabBarIcon({ color, name })}
    <View
      style={{
        borderWidth: 1,
        borderColor: BaseColor.whiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: 'red',
        top: -5,
        right: -12,
        borderRadius: 10,
      }}
    >
      <Text whiteColor caption2>
        5
      </Text>
    </View>
  </View>
);

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigatorMazi = ({ tabScreens = {} }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarStyle: BaseStyle.tabBar,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {Object.keys(tabScreens).map((name, index) => {
        const { options, component } = tabScreens[name];
        return (
          <BottomTab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              ...options,
              title: t(options.title),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
};
