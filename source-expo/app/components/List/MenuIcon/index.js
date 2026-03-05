import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

export default function ListMenuIcon({ style = {}, onPress = () => {}, title = '', icon = '' }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.contain, { borderColor: colors.border }, style]} onPress={onPress}>
      <Icon name={icon} size={18} solid color={colors.primaryLight} />
      <Text body1 style={{ flex: 1, paddingLeft: 10 }}>
        {title}
      </Text>
      <Icon name="angle-right" size={18} solid color={colors.primaryLight} />
    </TouchableOpacity>
  );
}

ListMenuIcon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
};
