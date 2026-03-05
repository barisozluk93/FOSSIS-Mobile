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
import { BaseSetting, useTheme } from '@/config';
import AssistiveTouch from './AssistiveTouch';
import * as rootNavigation from './rootNavigation';
import { AllScreens, ModalScreens } from './config';

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
      rootNavigation.dispatch(StackActions.replace(intro ? 'SliderIntro' : 'MaziHome'));
    }
  }, [loading]);

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
      {!loading && <AssistiveTouch goToApp={goToApp} />}
    </View>
  );
};

export default Navigator;
