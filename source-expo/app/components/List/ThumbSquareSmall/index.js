import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export default function ThumbSquareSmall({
  style = {},
  imageStyle = {},
  image = '',
  txtLeftTitle = '',
  txtContent = '',
  txtRight = '',
  onPress = () => {},
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.item, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.contain, { borderBottomColor: colors.border }]}>
        <Image source={image} style={[styles.thumb, imageStyle]} borderRadius={5} />
        <View style={styles.content}>
          <View style={styles.left}>
            <Text subhead semibold>
              {txtLeftTitle}
            </Text>
            <Text numberOfLines={1} caption1 light grayColor>
              {txtContent}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {txtRight}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ThumbSquareSmall.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
};
