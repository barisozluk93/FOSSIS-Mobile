import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import { Image, Text } from '@/components';
import styles from './styles';

const IMAGES = [
  {
    name: 'profile1',
    image: Images.profile1,
  },
  {
    name: 'profile2',
    image: Images.profile2,
  },
  {
    name: 'profile3',
    image: Images.profile3,
  },
  {
    name: 'profile4',
    image: Images.profile4,
  },
  {
    name: 'profile5',
    image: Images.profile5,
  },
  {
    name: 'profile6',
    image: Images.profile6,
  },
];

const ColorPicker = ({ label = '', value = { name: '', image: '' }, images = IMAGES, onChange = () => {} }) => {
  const { colors } = useTheme();
  const handlePress = (item) => {
    onChange(item);
  };

  const getStyle = (item) => ({
    padding: 2,
    borderWidth: 1,
    borderColor: value.name === item.name ? colors.primary : 'transparent',
    borderRadius: 20,
    marginRight: 16,
  });

  return (
    <View>
      <Text footnote bold style={styles.label}>
        {label}
      </Text>
      <View style={styles.content}>
        {images.map((item) => (
          <TouchableOpacity key={item.name} style={getStyle(item)} onPress={() => handlePress(item)}>
            <Image style={styles.image} source={item.image} borderRadius={16} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.any,
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.any,
    })
  ),
  onChange: PropTypes.func,
};

export default ColorPicker;
