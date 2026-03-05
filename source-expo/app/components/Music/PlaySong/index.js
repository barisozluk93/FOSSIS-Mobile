import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import ProgressBar from '@/components/Progress/Bar';
import styles from './styles';

const MusicPlaySong = ({ style = {}, name = '', onPress = () => {}, percent = '0', image, description = '' }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style, { backgroundColor: colors.card }]} onPress={onPress}>
      <View style={styles.contain}>
        <Image source={image} style={[styles.image]} borderRadius={5} />
        <View style={styles.content}>
          <Text footnote bold>
            {name}
          </Text>
          <View style={styles.viewDescription}>
            <Text style={styles.description} caption2 light grayColor numberOfLines={1}>
              {description}
            </Text>
            <TouchableOpacity onPress={onPress}>
              <Icon solid name="play-circle" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ProgressBar height={3} style={styles.progress} percent={percent} backgroundColor={BaseColor.dividerColor} />
    </View>
  );
};

MusicPlaySong.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  image: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default MusicPlaySong;
