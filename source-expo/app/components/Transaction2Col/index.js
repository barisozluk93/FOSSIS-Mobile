import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const Transaction2Col = ({
  style = {},
  backgroundIcon = 'red',
  icon = '',
  name = '',
  date = '',
  status = '',
  price = '',
  isUp = true,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: backgroundIcon }]}>
        <Icon name={icon} size={20} color={BaseColor.whiteColor} solid />
      </View>
      <View style={{ paddingLeft: 8, flex: 1 }}>
        <Text headline>{name}</Text>
        <Text subhead light style={{ marginTop: 5 }}>
          {date}
        </Text>
      </View>
      <View>
        <Text headline darkPrimaryColor={isUp} accentColor={!isUp} style={styles.text}>
          {price}
        </Text>
        <Text subhead light style={[styles.text, { marginTop: 5 }]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Transaction2Col.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  onPress: PropTypes.func,
  isUp: PropTypes.bool,
  backgroundIcon: PropTypes.string,
};

export default Transaction2Col;
