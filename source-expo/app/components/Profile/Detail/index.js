import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export default function ProfileDetail({
  style = {},
  image = '',
  isAvatarExist = false,
  textFirst = '',
  point = '',
  textSecond = '',
  textThird = '',
  styleLeft = {},
  styleThumb = {},
  styleRight = {},
  icon = true,
  onPress = () => {},
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.contentLeft, styleLeft]}>
        <View>
          {isAvatarExist && <Image source={{ uri: image }} style={[styles.thumb, styleThumb]} borderRadius={30} />}
          {!isAvatarExist && <Image source={image} style={[styles.thumb, styleThumb]} borderRadius={30} />}
        </View>
        <View style={{ alignItems: 'flex-start' }}>
          <Text headline semibold numberOfLines={1}>
            {textFirst}
          </Text>
          <Text
            body2
            style={{
              marginTop: 3,
              paddingRight: 10,
            }}
            numberOfLines={1}
          >
            {textSecond}
          </Text>
          <Text footnote grayColor numberOfLines={1}>
            {textThird}
          </Text>
        </View>
      </View>
      {icon && (
        <View style={[styles.contentRight, styleRight]}>
          <Icon name="angle-right" size={18} color={BaseColor.grayColor} enableRTL={true} />
        </View>
      )}
    </TouchableOpacity>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func,
};
