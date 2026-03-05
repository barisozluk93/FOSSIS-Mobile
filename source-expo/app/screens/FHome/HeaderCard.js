import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/config';
import { Text } from '@/components';
import styles from './styles';

function HeaderCard({ isCenter = false, isPrimary = false, style = {}, onPress = () => {}, disabled = false }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.headerCard,
        { backgroundColor: colors.card },
        isPrimary && styles.headerCardPrimary,
        isPrimary && { backgroundColor: colors.primaryLight },
        isCenter && styles.headerCardCenter,
        style,
      ])}
      onPress={onPress}
    >
      <Text subhead light={!isPrimary} whiteColor={isPrimary}>
        {t('total_balance')}
      </Text>
      <Text title1 whiteColor={isPrimary} style={{ marginTop: 5 }}>
        $1,399.29
      </Text>
    </TouchableOpacity>
  );
}

export default HeaderCard;
