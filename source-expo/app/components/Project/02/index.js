import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import ProgressCircle from '@/components/Progress/Circle';
import Avatars from '@/components/Avatars';
import Text from '@/components/Text';
import styles from './styles';

const Project02 = ({
  title = '',
  style = {},
  onPress = () => {},
  description = '',
  progress = 0,
  disabled = false,
  days = '',
  members = [],
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity disabled={disabled} style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.viewProgress}>
          <View style={styles.viewLeft}>
            <Text headline>{title}</Text>
            <Text caption2 light style={styles.description}>
              {description}
            </Text>
            <Avatars styleThumb={{ width: 30, height: 30 }} users={members} limit={3} />
          </View>
          <View style={styles.viewRight}>
            <ProgressCircle style={{ marginBottom: 10 }} percent={progress} />
            <Text footnote light>
              {days}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Project02.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  progress: PropTypes.number,
  days: PropTypes.string,
  members: PropTypes.array,
};

export default Project02;
