import PropTypes from 'prop-types';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { parseHexTransparency } from '@/utils';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

export default function CategoryIconSoft({
  style = {},
  icon = '',
  title = '',
  onPress = () => {},
  loading = false,
  isNormal = true,
  isWhite = false,
  isRound = false,
  isBlack = false,
  maxWidth = 60,
  iconContentStyle = {},
}) {
  const { colors } = useTheme();
  if (loading) {
    return <Loading style={style} />;
  }

  const getIconColor = () => {
    if (isWhite) {
      return BaseColor.whiteColor;
    }
    if (isBlack) {
      return colors.text;
    }
    return colors.primaryLight;
  };

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.contain,
        isNormal && { backgroundColor: colors.backgroundColor },
        isWhite && { backgroundColor: BaseColor.grayColor },
        style,
      ])}
      onPress={onPress}
    >
      <View
        style={StyleSheet.flatten([
          styles.iconContent,
          isNormal && {
            backgroundColor: parseHexTransparency(colors.primary, 30),
          },
          isWhite && {
            backgroundColor: parseHexTransparency(colors.whiteColor, 30),
          },
          isBlack && {
            backgroundColor: parseHexTransparency(BaseColor.grayColor, 30),
          },
          isRound && styles.isRound,
          iconContentStyle,
        ])}
      >
        <Icon name={icon} size={isRound ? 24 : 32} color={getIconColor()} solid />
      </View>
      <View style={{ marginTop: 8, maxWidth: maxWidth }}>
        <Text footnote numberOfLines={1} style={{ textAlign: 'center' }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

CategoryIconSoft.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  onPress: PropTypes.func,
  iconContentStyle: PropTypes.object,
};
