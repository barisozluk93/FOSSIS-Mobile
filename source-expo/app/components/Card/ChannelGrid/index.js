import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Images } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const CardChannelGrid = (props) => {
  const { style = {}, onPress = () => {}, image = Images.channel1, title = 'CNN', loading, imageStyle = {} } = props;

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <Image source={image} style={[styles.imageWishlist, imageStyle]} borderRadius={8} />
      <View style={{ paddingHorizontal: 10 }}>
        <Text numberOfLines={2} style={styles.marginVertical3}>
          {title}
        </Text>

        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

CardChannelGrid.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  onPress: PropTypes.func,
  onPressTag: PropTypes.func,
  type: PropTypes.string,
  imageStyle: PropTypes.object,
};

export default CardChannelGrid;
