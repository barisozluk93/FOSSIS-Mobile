import 'react-native-gesture-handler';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { BaseSetting } from '@/config';
import App from './app/index';

export default function Index() {
  const [fontsLoaded] = useFonts(BaseSetting.resourcesFont);
  if (fontsLoaded) {
    return <App />;
  }
  return <View />;
}
