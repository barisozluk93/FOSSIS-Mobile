import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const CardReport04 = ({
  title = '',
  price = '',
  icon = '',
  style = {},
  subTitle1 = '',
  subTitle2 = '',
  percent1 = '100%',
  percent2 = '50%',
  description = '',
  contentStyle = {},
  onPress = () => {},
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
          contentStyle,
        ]}
      >
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: parseHexTransparency(colors.primaryLight, 30),
              },
            ]}
          >
            <Icon name={icon} size={12} style={{ color: colors.primary }} solid />
          </View>
        </View>

        <Text subhead light style={{ marginTop: 5 }}>
          {title}
        </Text>
        <Text headline style={{ marginTop: 5 }}>
          {price}
        </Text>
        <Text caption light style={{ marginTop: 5 }}>
          {subTitle1}
        </Text>
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.primary,
            marginTop: 5,
            width: percent1,
          }}
        />
        <Text caption light style={{ marginTop: 10 }}>
          {subTitle2}
        </Text>
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: colors.accent,
            marginTop: 5,
            width: percent2,
          }}
        />
        <Text caption2 light style={{ marginTop: 10 }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CardReport04.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  subTitle1: PropTypes.string,
  subTitle2: PropTypes.string,
  percent1: PropTypes.string,
  percent2: PropTypes.string,
  description: PropTypes.string,
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default CardReport04;
