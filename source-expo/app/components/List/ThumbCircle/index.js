import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export default function ListThumbCircle({
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
    <TouchableOpacity
      style={[styles.contain, { borderBottomWidth: 1, borderBottomColor: colors.border }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image source={image} style={[styles.thumb, imageStyle]} borderRadius={24} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.content}>
          <View style={styles.left}>
            <Text headline semibold numberOfLines={1}>
              {txtLeftTitle}
            </Text>
          </View>
          <View style={styles.right}>
            <Text caption2 grayColor numberOfLines={1}>
              {txtRight}
            </Text>
          </View>
        </View>
        <Text note numberOfLines={1} footnote grayColor style={{ paddingTop: 5 }}>
          {txtContent}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ListThumbCircle.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageStyle: PropTypes.object,
  image: PropTypes.node.isRequired,
  txtLeftTitle: PropTypes.string,
  txtContent: PropTypes.string,
  txtRight: PropTypes.string,
  onPress: PropTypes.func,
};
