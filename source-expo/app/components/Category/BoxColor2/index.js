import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const CategoryBoxColor2 = ({
  title = '',
  subtitle = '',
  icon = '',
  style = {},
  onPress = () => {},
  loading = false,
}) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={[styles.viewIcon, { backgroundColor: colors.card }]}>
          <Icon name={icon} size={18} style={{ color: colors.primary }} />
        </View>
        <View style={[styles.viewText, { backgroundColor: colors.backgroundColor }]}>
          <Text headline bold style={{ marginBottom: 3, color: colors.text }} numberOfLines={1}>
            {title}
          </Text>
          <Text body2 regular grayColor>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CategoryBoxColor2.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
};

export default CategoryBoxColor2;
