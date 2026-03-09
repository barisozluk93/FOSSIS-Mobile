import { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, StatusBar, View, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationActions } from '@/actions';
import * as Utils from '@/utils';
import { languageSelect, getInto } from '@/selectors';
import { BaseColor, BaseSetting, useTheme } from '@/config';
import AssistiveTouch from './AssistiveTouch';
import * as rootNavigation from './rootNavigation';
import { AllScreens, ModalScreens } from './config';
import { removeToken } from '@/utils/storage';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainScreens = () => {
  return (
    <MainStack.Navigator
      initialRouteName={'Loading'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {Object.keys(AllScreens).map((name) => {
        const { component, options } = AllScreens[name];
        return <MainStack.Screen key={name} name={name} component={component} options={options} />;
      })}
    </MainStack.Navigator>
  );
};

const Navigator = () => {
  // Check display intro screen
  const intro = useSelector(getInto);
  const { theme } = useTheme();
  const isDarkMode = useColorScheme() === 'dark';
  const language = useSelector(languageSelect);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Config status bar
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(isDarkMode ? 'black' : 'white', true);
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [isDarkMode]);

  useEffect(() => {
    const onProcess = async () => {
      // Get current language of device
      const languageCode = language ?? BaseSetting.defaultLanguage;
      dispatch(ApplicationActions.onChangeLanguage(languageCode));
      // Config language for app
      await i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: languageCode,
        fallbackLng: languageCode,
        compatibilityJSON: 'v3',
      });
      setLoading(false);
      Utils.enableExperimental();
    };
    onProcess();
  }, []);

  const goToApp = (name) => {
    rootNavigation.navigate(name);
  };

  useEffect(() => {
    if (!loading) {
      removeToken();
      dispatch({ type: "AUTH_LOGOUT" });
      dispatch({ type: "AUTH_INIT" });
      dispatch({ type: "USER_INIT" });
      dispatch({ type: "ROLE_INIT" });
      dispatch({ type: 'PERMISSION_INIT' });
      dispatch({ type: 'PANEL_INIT' });
      dispatch({ type: 'INVERTER_INIT' });
      dispatch({ type: 'BATTERY_INIT' });
      dispatch({ type: 'HEATPUMP_INIT' });
      dispatch({ type: 'CONSTRUCTION_INIT' });
      dispatch({ type: 'CABLE_INIT' });
      dispatch({ type: 'CHARGINGSTATION_INIT' });

      rootNavigation.dispatch(StackActions.replace(intro ? 'SignIn' : 'SignIn'));
    }
  }, [loading]);

 const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: 'normal',
        color: theme.colors.text,
      }}
      style={{borderWidth: 1, borderColor: theme.colors.border, borderLeftColor: BaseColor.greenColor, backgroundColor: theme.colors.background}}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: 'normal',
        color: theme.colors.text,
      }}
      style={{borderWidth: 1, borderColor: theme.colors.border, borderLeftColor: BaseColor.pinkDarkColor, backgroundColor: theme.colors.background}}
    />
  ),
   
};

  return (
    // Use the font with the fontFamily property after loading
    <View style={{ flex: 1, position: 'relative' }}>
      <NavigationContainer theme={theme} ref={rootNavigation.navigationRef}>
        <RootStack.Navigator
          screenOptions={{
            presentation: 'transparentModal',
            headerShown: false,
            cardStyle: { backgroundColor: 'transparent' },
            cardOverlayEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        >
          <RootStack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
          {Object.keys(ModalScreens).map((name) => {
            const { component, options } = ModalScreens[name];
            return <RootStack.Screen key={name} name={name} component={component} options={options} />;
          })}
        </RootStack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </View>
  );
};

export default Navigator;
