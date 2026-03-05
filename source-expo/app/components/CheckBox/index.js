import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';

const CheckBox = ({
  onPress = () => {},
  title = '',
  checkedIcon = 'check-square',
  uncheckedIcon = 'square',
  checked = true,
  color = '',
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onPress}>
      <Icon solid={checked} name={checked ? checkedIcon : uncheckedIcon} color={color || colors.text} size={24} />
      <Text body1 style={{ paddingHorizontal: 8 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
