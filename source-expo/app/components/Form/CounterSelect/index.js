import { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

export default function FormCounterSelect({ style = {}, value = 1, onChange = () => {} }) {
  const [counterValue, setCounterValue] = useState(value);
  const { colors } = useTheme();

  const onHandleChange = (type) => {
    let newValue = 0;
    if (type === 'up') {
      newValue = counterValue + 1;
    } else {
      newValue = counterValue - 1 > 0 ? counterValue - 1 : 0;
    }
    setCounterValue(newValue);
    onChange(newValue);
  };

  return (
    <View
      style={[
        styles.contentPicker,
        {
          backgroundColor: colors.card,
          flexDirection: 'row',
        },
        style,
      ]}
    >
      <TouchableOpacity onPress={() => onHandleChange('up')}>
        <Icon name="plus-circle" size={24} color={colors.primary} />
      </TouchableOpacity>
      <Text title2 style={{ width: 40, textAlign: 'center' }}>
        {counterValue}
      </Text>
      <TouchableOpacity onPress={() => onHandleChange('down')}>
        <Icon name="minus-circle" size={24} color={BaseColor.grayColor} />
      </TouchableOpacity>
    </View>
  );
}

FormCounterSelect.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  value: PropTypes.number,
  onChange: PropTypes.func,
};
