import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import ProgressCircle from '@/components/Progress/Circle';
import Text from '@/components/Text';
import styles from './styles';

const CardReport08 = ({
  title = '',
  style = {},
  onPress = () => {},
  subTitle = '',
  description = '',
  percent = 0,
  disabled = false,
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
        <Text headline>{title}</Text>
        <View style={styles.viewProgress}>
          <ProgressCircle style={{ marginRight: 15 }} percent={percent} />
          <View style={{ flex: 1 }}>
            <Text subhead>{subTitle}</Text>
            <Text caption2 light style={{ marginTop: 10 }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CardReport08.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  percent: PropTypes.number,
};

export default CardReport08;
