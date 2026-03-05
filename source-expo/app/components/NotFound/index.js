import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const NotFound = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.viewCart, { backgroundColor: parseHexTransparency(colors.card, 80) }]}>
        <Icon
          name={'exclamation-triangle'}
          style={{
            fontSize: 32,
            color: parseHexTransparency(colors.text, 30),
          }}
        />
      </View>
      <Text
        headline
        bold
        style={{
          color: parseHexTransparency(colors.text, 50),
        }}
      >
        {t('not_found')}
      </Text>
    </View>
  );
};

export default NotFound;
