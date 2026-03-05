import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

const Card2 = ({
  description = '',
  title = '',
  style = {},
  image = Images.eProduct,
  salePrice = '',
  onPress = () => {},
  secondDescription = '',
  color = 'red',
  size = '',
  quantity = '',
}) => {
  return (
    <View style={[styles.contain, style]} activeOpacity={0.9}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={image} style={styles.imageBackgroundCard1} borderRadius={8} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={onPress}>
                <Text headline>{title}</Text>
              </TouchableOpacity>
              <Text footnote accentColor style={{ marginTop: 4 }}>
                {description}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 6,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text footnote grayColor>
                  {'Color: '}
                </Text>
                <Text body2>{color}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text footnote grayColor>
                  {'Size: '}
                </Text>
                <Text body2>{size}</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 8,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'flex-end',
              }}
            >
              <View>
                <Text title3>{salePrice}</Text>
                <Text footnote grayColor>
                  {secondDescription}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text footnote grayColor>
                  {'Quantity'}
                </Text>
                <Text body2 semibold>
                  {quantity}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

Card2.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  secondDescription: PropTypes.string,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Card2;
