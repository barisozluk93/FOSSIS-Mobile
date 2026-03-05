import PropTypes from 'prop-types';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import PaymentItem from '@/components/Payment/Item';
import styles from './styles';

const ModalChoosePayment = ({ options = [], option, onChange = () => {}, ...attrs }) => {
  const { colors } = useTheme();
  const cardColor = colors.card;

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {options.map((item) => (
          <PaymentItem
            onPress={() => onChange(item)}
            key={item.id}
            id={item.id}
            expiryDate={item.expiryDate}
            iconName={item.iconName}
            isPrimary={true}
            textPrimary={item.id === option?.id ? <Icon name="check" size={18} /> : ' '}
          />
        ))}
      </View>
    </Modal>
  );
};

ModalChoosePayment.propTypes = {
  onChange: PropTypes.func,
  option: PropTypes.object,
  options: PropTypes.array,
};

export default ModalChoosePayment;
