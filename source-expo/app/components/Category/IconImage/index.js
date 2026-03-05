import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Images } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

const CategoryIconImage = ({ image = Images.profile1, name = '', onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} borderRadius={10} />
      <Text footnote numberOfLines={1}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

CategoryIconImage.propTypes = {
  onPress: PropTypes.func,
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
};

export default CategoryIconImage;
