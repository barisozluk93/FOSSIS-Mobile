import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

const COLORS = [
  {
    name: 'Gray',
    color: '#D8D8D8',
  },
  {
    name: 'Red-Pink',
    color: '#FF2D55',
  },
  {
    name: 'Red',
    color: '#F90030',
  },
  {
    name: 'Pink',
    color: '#FF5E80',
  },
  {
    name: 'Green-Blue',
    color: '#4A90A4',
  },
  {
    name: 'Black',
    color: '#212121',
  },
];

const ColorPicker = ({ colorChoosed = { name: '', color: '' }, colors = COLORS, onPress = () => {} }) => {
  const handlePress = (color) => {
    onPress(color);
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {colors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={{
            padding: 2,
            borderWidth: 1,
            borderColor: colorChoosed.color === color.color ? color.color : 'transparent',
            borderRadius: 20,
            marginRight: 16,
          }}
          onPress={() => handlePress(color)}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: color.color,
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

ColorPicker.propTypes = {
  colorChoosed: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  onPress: PropTypes.func,
};

export default ColorPicker;
