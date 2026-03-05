import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTheme, BaseColor } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const ListTransaction = ({
  style = {},
  icon = '',
  name = '',
  date = '',
  status = '',
  price = '',
  onPress = () => {},
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: colors.primaryLight }]}>
        <Icon name={icon} size={24} solid color={BaseColor.whiteColor} />
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text headline>{name}</Text>
        <Text footnote light style={{ marginTop: 5 }}>
          {date}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text headline style={styles.text}>
          {price}
        </Text>
        <Text footnote light style={[styles.text, { marginTop: 5 }]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListTransaction.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func,
};

export default ListTransaction;
