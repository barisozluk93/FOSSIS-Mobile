import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const ModalOption = ({ options = [], onPress = () => {}, ...attrs }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {options.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.contentActionModalBottom,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: index === options.length - 1 ? 0 : StyleSheet.hairlineWidth,
              },
            ]}
            key={item.value}
            onPress={() => onPress(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.iconName && <Icon solid name={item.iconName} color={item.iconColor} style={styles.image} />}
              <Text body2 primaryColor={item.checked}>
                {t(item.text)}
              </Text>
            </View>
            {item.checked && <Icon name="check" size={14} color={colors.primary} />}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

ModalOption.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
};

export default ModalOption;
