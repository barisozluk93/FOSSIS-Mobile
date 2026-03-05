import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import Image from '@/components/Image';
import { Images, BaseColor } from '@/config';
import styles from './styles';

const Grid1 = ({ description = '', title = '', style = {}, image = Images.eProduct, onPress, iconName, iconColor }) => {
  return (
    <TouchableOpacity style={[styles.grid1, style]} onPress={onPress}>
      <View style={styles.imageView}>
        <Image source={image} style={styles.imageBackgroundGrid1} borderRadius={8} />
        <View style={[styles.iconView, { backgroundColor: iconColor }]}>
          <Icon name={iconName} color={BaseColor.whiteColor} size={15} />
        </View>
      </View>

      <View>
        <Text subhead bold numberOfLines={2} style={{ marginTop: 10 }}>
          {title}
        </Text>
        <Text footnote grayColor style={{ marginTop: 5 }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Grid1.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  onPress: PropTypes.func,
};

export default Grid1;
