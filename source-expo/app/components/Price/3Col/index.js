import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

const Price3Col = ({
  style = {},
  image = Images.news,
  code = '',
  name = '',
  costPrice = '',
  marketCap = '',
  percent = '',
  price = '',
  onPress = () => {},
  isUp = true,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={image} style={styles.image} borderRadius={20} />
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text headline>{code}</Text>
        <Text footnote light>
          {name}
        </Text>
      </View>

      <View>
        <Text headline style={styles.text}>
          {costPrice}
        </Text>
        <Text footnote light style={styles.text}>
          {marketCap}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text headline style={styles.text}>
          {price}
        </Text>
        <Text footnote accentColor={isUp} lightPrimaryColor={!isUp} style={styles.text}>
          <Icon name={isUp ? 'arrow-up' : 'arrow-down'} /> {percent}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Price3Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  code: PropTypes.string,
  name: PropTypes.string,
  costPrice: PropTypes.string,
  marketCap: PropTypes.string,
  percent: PropTypes.string,
  price: PropTypes.string,
  onPress: PropTypes.func,
};

export default Price3Col;
