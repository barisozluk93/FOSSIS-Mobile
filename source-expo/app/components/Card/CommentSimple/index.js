import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export default function CardCommentSimple(props) {
  const { colors } = useTheme();
  const { style, image, name, date, comment, onAction = () => {} } = props;
  return (
    <View style={[styles.contain, { backgroundColor: colors.background }, style]}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          alignItems: 'center',
        }}
      >
        <Image source={image} style={styles.thumb} borderRadius={20} />
        <View
          style={{
            flex: 1,
          }}
        >
          <Text headline numberOfLines={1}>
            {name}
          </Text>

          <Text footnote grayColor numberOfLines={1}>
            {date}
          </Text>
        </View>
        <TouchableOpacity onPress={onAction}>
          <Icon name="ellipsis-v" size={16} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          body2
          style={{
            marginTop: 10,
          }}
        >
          {comment}
        </Text>
      </View>
    </View>
  );
}

CardCommentSimple.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  date: PropTypes.string,
  comment: PropTypes.string,
  onAction: PropTypes.func,
};
