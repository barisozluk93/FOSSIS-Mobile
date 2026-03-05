import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Image from '@/components/Image';
import styles from './styles';

export default function Card(props) {
  const { colors } = useTheme();
  const { style = {}, children, styleContent, image = Images.profile2, onPress, styleImage = {} } = props;
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: colors.border }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={[styles.imageBanner, styleImage]} borderRadius={8} />
      <View style={[styles.content, styleContent]}>{children}</View>
    </TouchableOpacity>
  );
}

Card.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleContent: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
  onPress: PropTypes.func,
};
