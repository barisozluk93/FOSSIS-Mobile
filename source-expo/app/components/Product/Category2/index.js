import PropTypes from 'prop-types';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { parseHexTransparency } from '@/utils';
import Text from '@/components/Text';
import { useTheme, Images, BaseColor } from '@/config';
import styles from './styles';
import Loading from './Loading';

const ProductCategory2 = ({ title = '', subtitle = '', image = Images.location1, style = {}, onPress, loading }) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <ImageBackground source={image} style={styles.imageBackground} borderRadius={8}>
        <View style={[styles.content]}>
          <View
            style={[
              styles.viewText,
              {
                backgroundColor: parseHexTransparency(BaseColor.whiteColor, 90),
              },
            ]}
          >
            <Text headline style={{ color: colors.text }} numberOfLines={1}>
              {title}
            </Text>
            <Text subhead grayColor>
              {subtitle}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

ProductCategory2.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.node.isRequired,
};

export default ProductCategory2;
