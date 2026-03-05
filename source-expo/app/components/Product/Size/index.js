import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Text from '@/components/Text';

const SIZES = [
  {
    id: 'xl',
    name: 'XL',
  },
  {
    id: 'l',
    name: 'L',
  },
  {
    id: 'm',
    name: 'M',
  },
  {
    id: 's',
    name: 'S',
  },
];

const Size = ({ sizeChoosed = { id: '', name: '' }, sizes = SIZES, onPress = () => {} }) => {
  const { colors } = useTheme();

  const handlePress = (size) => {
    onPress(size);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {sizes.map((size, index) => (
        <TouchableOpacity
          key={index}
          style={{
            borderWidth: 1,
            borderColor: sizeChoosed.id === size.id ? colors.primary : 'transparent',
            marginRight: 16,
            backgroundColor: sizeChoosed.id === size.id ? colors.card : colors.border,
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
          }}
          onPress={() => handlePress(size)}
        >
          <Text body2>{size.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Size.propTypes = {
  sizeChoosed: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  onPress: PropTypes.func,
};

export default Size;
