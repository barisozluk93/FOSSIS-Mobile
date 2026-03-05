import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

const SearchResult = ({ style = {}, textLeft = '', textRight = '', onPress = () => {}, disabled = false }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, { borderBottomColor: colors.border }, style]}
      onPress={onPress}
    >
      <Text body1>{textLeft}</Text>
      <Text body1 light>
        {textRight}
      </Text>
    </TouchableOpacity>
  );
};

SearchResult.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  onPress: PropTypes.func,
};

export default SearchResult;
