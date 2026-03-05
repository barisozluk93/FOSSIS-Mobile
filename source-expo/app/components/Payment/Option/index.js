import { TouchableHighlight, View } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

export default function PaymentOption({
  title = 'Title',
  iconName = 'credit-card',
  checked = true,
  onPress = () => {},
  style = {},
  isIcon = true,
}) {
  const { colors } = useTheme();
  return (
    <TouchableHighlight
      // activeOpacity={0.6}
      underlayColor={colors.card}
      onPress={onPress}
    >
      <View style={[styles.container, style]}>
        <Icon
          name={checked ? 'dot-circle' : 'circle'}
          size={16}
          solid={checked}
          style={{ padding: 8 }}
          color={colors.text}
        />

        {isIcon && (
          <View style={{ width: 42, alignItems: 'center' }}>
            <Icon name={iconName} size={24} solid style={{ padding: 8 }} />
          </View>
        )}
        <Text body1>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}
