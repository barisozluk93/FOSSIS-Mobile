import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { Images, useTheme } from '@/config';
import Text from '@/components/Text';
import Image from '@/components/Image';
import styles from './styles';

const PaymentBankItemActive = ({
  image = Images.eProduct,
  isActive = false,
  title = '',
  style = {},
  onPress = () => {},
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.9}>
      <View style={[styles.paymentBankItem, { borderColor: isActive ? colors.primary : colors.border }]}>
        <Image
          // resizeMode="contain"
          source={image}
          style={styles.paymentBankItemLogo}
          borderRadius={10}
        />
      </View>
      <Text caption1 style={{ marginTop: 4 }} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

PaymentBankItemActive.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isActive: PropTypes.bool,
  onPress: PropTypes.func,
};

export default PaymentBankItemActive;
