import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

const Card3 = ({
  style,
  image = Images.eProduct,
  title = '',
  salePrice = '',
  quantity = '',
  description = '',
  onPress = () => {},
}) => {
  return (
    <View style={[styles.contain, style]} activeOpacity={0.9}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={image} style={styles.imageBackgroundCard3} borderRadius={8} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={onPress}>
              <Text body1>{title}</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 6,
                alignItems: 'center',
              }}
            >
              <Text headline>{salePrice}</Text>
              <Text body1 grayColor style={{ marginLeft: 8 }}>
                {' x '}
                {quantity}
              </Text>
            </View>
            <Text footnote grayColor style={{ marginTop: 2 }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

Card3.propTypes = {
  image: PropTypes.node.isRequired,
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

export default Card3;
