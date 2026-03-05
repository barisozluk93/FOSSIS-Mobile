import PropTypes from 'prop-types';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { Images } from '@/config';
import Text from '@/components/Text';
import styles from './styles';
import Loading from './Loading';

const ProductCategory3 = ({ title = '', subtitle = '', image = Images.location1, style = {}, onPress, loading }) => {
  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground} borderRadius={8}>
        <View style={[styles.content]}>
          <View style={[styles.viewText]}>
            <Text headline whiteColor numberOfLines={1}>
              {title}
            </Text>
            <Text footnote whiteColor>
              {subtitle}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

ProductCategory3.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.node.isRequired,
};

export default ProductCategory3;
