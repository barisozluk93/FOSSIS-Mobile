import { ActivityIndicator, View, Text } from 'react-native';
import { Image } from '@/components';
import { Images, useTheme } from '@/config';
import styles from './styles';

const Loading = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
        <Text title1 style={{ marginTop: 10 }}>
          React Native UI KIT
        </Text>
      </View>
      <ActivityIndicator
        size="large"
        color={colors.text}
        style={{
          position: 'absolute',
          top: 260,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default Loading;
