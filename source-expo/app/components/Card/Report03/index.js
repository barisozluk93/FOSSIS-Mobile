import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { parseHexTransparency } from '@/utils';
import { useTheme, BaseColor } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const CardReport03 = ({
  title = '',
  subTitle = '',
  price = '',
  icon = '',
  percent = '',
  style = {},
  onPress = () => {},
  isUp = true,
  colorIcon = '',
  backgroundIcon = '',
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
        <View style={[styles.header]}>
          <View
            style={[
              styles.viewIcon,
              {
                backgroundColor: backgroundIcon ? backgroundIcon : parseHexTransparency(colors.primaryLight, 30),
              },
            ]}
          >
            <Icon
              name={icon}
              size={12}
              style={{
                color: colorIcon ? colorIcon : colors.primary,
              }}
              solid
            />
          </View>
          <Text headline style={{ marginLeft: 5 }}>
            {title}
          </Text>
        </View>
        <Text footnote light style={{ marginTop: 20 }}>
          {subTitle}
        </Text>
        <View style={styles.viewBottom}>
          <Text headline>{price}</Text>
          <Text footnote>
            <Icon name={isUp ? 'caret-up' : 'caret-down'} color={isUp ? BaseColor.greenColor : colors.primary} />{' '}
            {percent}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

CardReport03.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  price: PropTypes.string,
  icon: PropTypes.string,
  subTitle: PropTypes.string,
  percent: PropTypes.string,
};

export default CardReport03;
