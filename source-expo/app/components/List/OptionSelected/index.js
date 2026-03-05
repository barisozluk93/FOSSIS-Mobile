import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const OptionSelected = ({ style = {}, textLeft = '', textRight = '', onPress = () => {} }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, { borderBottomColor: colors.border }, style]} onPress={onPress}>
      <Text body1>{textLeft}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 10,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Text numberOfLines={1} body1 light style={{ marginRight: 5 }}>
          {textRight}
        </Text>
        <Icon name="angle-right" color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

OptionSelected.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  onPress: PropTypes.func,
};

export default OptionSelected;
