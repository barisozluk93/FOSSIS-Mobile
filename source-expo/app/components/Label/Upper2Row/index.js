import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Text from '@/components/Text';
import styles from './styles';

export const Types = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const LabelUpper2Row = ({
  style = {},
  label = '',
  value = '',
  onPress = () => {},
  type = Types.left, //left, right, center
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          justifyContent: type === Types.center ? 'center' : type === Types.right ? 'flex-end' : 'flex-start',
        },
      ]}
      onPress={onPress}
    >
      <View>
        <Text
          subhead
          light
          style={[
            styles.text,
            {
              textAlign: type === Types.center ? 'center' : type === Types.right ? 'right' : 'auto',
            },
          ]}
        >
          {label}
        </Text>
        <Text headline style={[styles.textMarginCenter]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

LabelUpper2Row.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  onPress: PropTypes.func,
};

export default LabelUpper2Row;
