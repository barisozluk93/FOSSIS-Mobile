import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

export default function Button(props) {
  const { colors } = useTheme();
  const {
    style = {},
    styleText,
    icon = null,
    outline = false,
    full = false,
    round = false,
    loading = false,
    children,
    disabled,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, { backgroundColor: colors.primary }],
        outline && [
          styles.outline,
          {
            backgroundColor: colors.card,
            borderColor: colors.primary,
          },
        ],
        full && styles.full,
        round && styles.round,
        disabled && { backgroundColor: colors.card, borderColor: colors.card },
        style,
      ])}
      activeOpacity={0.9}
    >
      {icon ? icon : null}
      {children && (
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && { color: colors.primary },
            disabled && { color: colors.text },
            styleText,
          ])}
          numberOfLines={1}
        >
          {children}
        </Text>
      )}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? colors.primary : BaseColor.whiteColor}
          style={{ paddingLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
};
