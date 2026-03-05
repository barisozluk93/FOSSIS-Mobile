import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const CardReport09 = ({
  title = '',
  style = {},
  onPress = () => {},
  textReadMore = '',
  description = '',
  icon = '',
  backgroundIcon = '',
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.viewHeader}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: backgroundIcon || colors.primaryLight,
              },
            ]}
          >
            <Icon name={icon} size={18} style={{ color: BaseColor.whiteColor }} solid />
          </View>
          <Text subhead bold style={{ flex: 1, flexWrap: 'wrap' }}>
            {title}
          </Text>
        </View>
        <Text caption2 light style={{ marginTop: 10 }}>
          {description}
        </Text>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={onPress}>
          <Text footnote accentColor>
            {textReadMore}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

CardReport09.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  textReadMore: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default CardReport09;
