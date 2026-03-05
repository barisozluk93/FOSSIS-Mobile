import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const CardReport01 = ({ title = '', price = '', icon = '', style = {}, onPress = () => {}, disabled = false }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: parseHexTransparency(colors.primaryLight, 30),
              },
            ]}
          >
            <Icon name={icon} size={12} style={{ color: colors.primary }} solid />
          </View>
          <Text subhead light style={{ marginLeft: 5 }}>
            {title}
          </Text>
        </View>
        <Text headline style={{ marginTop: 8 }}>
          {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CardReport01.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
};

export default CardReport01;
