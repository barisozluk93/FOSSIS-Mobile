import PropTypes from 'prop-types';
import { TouchableHighlight, View } from 'react-native';
import { Images, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Loading from './Loading';
import styles from './styles';

const NewsWishlist = ({
  style = {},
  onPress = () => {},
  onAction = () => {},
  image = Images.news,
  title = 'Hilton San Francisco',
  subtitle = 'Arts & Humanities',
  loading,
}) => {
  const { colors } = useTheme();

  if (loading) {
    return <Loading style={style} />;
  }

  return (
    <TouchableHighlight
      style={[styles.container, style]}
      activeOpacity={0.6}
      underlayColor={colors.border}
      onPress={onPress}
    >
      <View style={styles.contain} onPress={onPress} activeOpacity={0.9}>
        <Image source={image} style={styles.imageWishlist} borderRadius={8} />
        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text headline semibold numberOfLines={2} style={styles.marginVertical3}>
            {title}
          </Text>
          <Text footnote semibold grayColor style={styles.marginVertical3}>
            {subtitle}
          </Text>

          <View style={styles.contentRate} />
        </View>
        <TouchableHighlight
          style={styles.btnAction}
          activeOpacity={0.6}
          underlayColor={colors.border}
          onPress={onAction}
        >
          <Icon name="ellipsis-v" style={styles.icon} />
        </TouchableHighlight>
      </View>

      {/*             
            <TouchableOpacity
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
               
            </TouchableOpacity> */}
    </TouchableHighlight>
  );
};

NewsWishlist.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  item: PropTypes.object,
  onPress: PropTypes.func,
  onAction: PropTypes.func,
  type: PropTypes.string,
};

export default NewsWishlist;
