import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import { BaseColor, useTheme } from '@/config';
import styles from './styles';

export default function ProfileDetail({
  style = {},
  image = '',
  styleThumb = {},
  onMore = () => {},
  name = '',
  nickName = '',
}) {
  const { colors } = useTheme();

  return (
    <View style={[styles.contain, { borderBottomColor: colors.border }, style]} activeOpacity={0.9}>
      <View style={styles.contentLeft}>
        <Image source={image} style={[styles.thumb, styleThumb]} borderRadius={30} />
        <View style={{ flex: 1 }}>
          <View style={styles.title}>
            <Text headline semibold numberOfLines={1}>
              {name} <Icon name="check-circle" color={BaseColor.greenColor} solid size={12} />
            </Text>
            <TouchableOpacity onPress={onMore}>
              <Icon name="ellipsis-v" size={12} />
            </TouchableOpacity>
          </View>

          <Text footnote style={styles.nickName} numberOfLines={1}>
            {nickName}
          </Text>
          <View style={styles.overview}>
            <Text subhead style={{ flex: 1 }}>
              {'343k'}{' '}
              <Text caption2 light grayColor>
                {'followers'}
              </Text>
            </Text>
            <Text subhead style={{ flex: 1 }}>
              {'1920'}{' '}
              <Text caption2 light grayColor>
                {'following'}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node.isRequired,
  name: PropTypes.string,
  nickName: PropTypes.string,
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onMore: PropTypes.func,
};
