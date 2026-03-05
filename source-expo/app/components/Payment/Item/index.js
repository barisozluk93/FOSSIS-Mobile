import { useTranslation } from 'react-i18next';
import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

export default function PaymentItem({
  id = '**** **** **** 1989',
  expiryDate = '02/2020',
  iconName = 'credit-card',
  isPrimary = false,
  onPress = () => {},
  style = {},
  textPrimary = '',
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={colors.card}
      onPress={onPress}
    >
      <View style={[styles.container, { borderBottomColor: colors.border }, style]}>
        <Icon name={iconName} size={40} solid={true} style={{ marginRight: 12, width: 48 }} color={colors.text} />
        <View style={{ flex: 1 }}>
          <Text headline semibold>
            {id}
          </Text>
          <Text footnote light style={{ marginTop: 4 }}>
            {expiryDate}
          </Text>
        </View>
        {isPrimary && (
          <Text footnote darkPrimaryColor>
            {textPrimary || t('primary')}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
}
