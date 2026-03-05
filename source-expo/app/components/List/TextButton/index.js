import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Tag from '@/components/Tag';
import styles from './styles';

export default function ListTextButton({
  style = {},
  image = '',
  styleLeft = {},
  styleThumb = {},
  styleRight = {},
  onPress = () => {},
  name = '',
  description = '',
  styleName,
  styleDescription,
  onPressRight = () => {},
  componentRight,
  tagName = '',
}) {
  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <Image source={image} style={[styles.thumb, styleThumb]} borderRadius={20} />
        <View>
          <Text body1 numberOfLines={1} style={styleName}>
            {name}
          </Text>
          <Text footnote grayColor numberOfLines={1} style={[{ marginTop: 4 }, styleDescription]}>
            {description}
          </Text>
        </View>
      </View>
      <View style={[styles.contentRight, styleRight]}>
        {componentRight ? (
          componentRight
        ) : (
          <Tag onPress={onPressRight} outline>
            {tagName}
          </Tag>
        )}
      </View>
    </TouchableOpacity>
  );
}

ListTextButton.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  iconName: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  onPressRight: PropTypes.func,
  tagName: PropTypes.string,
};
