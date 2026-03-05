import PropTypes from 'prop-types';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const Card4 = ({
  style = {},
  onPress = () => {},
  image = Images.eProduct,
  title = '',
  description = '',
  salePrice = '',
  addToCard = '',
  onOption = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.contain, style]} activeOpacity={0.9}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground source={image} style={styles.imageBackgroundCard3} borderRadius={8} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <Text headline numberOfLines={1}>
                  {title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                hitSlop={{ top: 10, right: 10, left: 10 }}
                style={{ paddingLeft: 16 }}
                onPress={onOption}
              >
                <Icon name="ellipsis-v" />
              </TouchableOpacity>
            </View>

            <Text footnote grayColor style={{ marginTop: 4 }}>
              {description}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: 12,
              }}
            >
              <Text title3>{salePrice}</Text>
              <Tag onPress={addToCard} small style={{ backgroundColor: colors.primaryLight }}>
                Add To Card
              </Tag>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

Card4.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  salePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addToCard: PropTypes.func,
  onOption: PropTypes.func,
};

export default Card4;
