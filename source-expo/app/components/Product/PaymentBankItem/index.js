import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Images, useTheme } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

const PaymentBankItem = ({ image = Images.eProduct, isActive = false, title = '', style = {}, onPress = () => {} }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.paymentBankItem, { borderColor: isActive ? colors.primary : colors.border }, style]}
      onPress={onPress}
    >
      <Image resizeMode="contain" source={image} style={styles.paymentBankItemLogo} />
      <Text caption1 style={{ marginTop: 8 }} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

PaymentBankItem.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isActive: PropTypes.bool,
  onPress: PropTypes.func,
};

export default PaymentBankItem;
