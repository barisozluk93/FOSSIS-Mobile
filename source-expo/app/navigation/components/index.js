import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { Icon, Text } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { useSelector } from 'react-redux';

export const tabBarIcon = ({ color, name }) => <Icon name={name} size={20} solid color={color} />;

export const tabBarIconHaveNoty = ({ color, name }) => (
  <View>
    {tabBarIcon({ color, name })}
  </View>
);

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigatorMazi = ({ tabScreens = {} }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user } = useSelector(state => state.user);

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
        if(user && user.roles.includes(2) && 
        (options.title === 'usermanagement' || options.title === 'materialmanagement')) {
          return (
            <></>
          );
        }
        else{
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
        }
      })}
    </BottomTab.Navigator>
  );
};
