import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '@/config';
import Button from '@/components/Button';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const ModalOption = (props) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;
  const { options = [], value = {}, onPress, isMulti = false, ...attrs } = props;
  const [optionCustom, setOptionCustom] = useState(options);

  useEffect(() => {
    if (isMulti) {
      const optionsMulti = options.map((item) => ({
        ...item,
        checked: value?.some?.((element) => element.value === item.value),
      }));
      setOptionCustom(optionsMulti);
    } else {
      const optionsSingle = options.map((item) => ({
        ...item,
        checked: item.value === value?.value,
      }));
      setOptionCustom(optionsSingle);
    }
  }, []);

  const onApply = () => {
    onPress(optionCustom.filter((item) => item.checked));
  };

  const onSelect = (itemChose) => {
    if (isMulti) {
      const optionsMulti = optionCustom.map((item) => ({
        ...item,
        checked: item.value === itemChose.value ? !itemChose.checked : item.checked,
      }));
      setOptionCustom(optionsMulti);
    } else {
      // const optionsSingle = optionCustom.map((item) => ({
      //     ...item,
      //     checked:
      //         item.value === itemChose.value
      //             ? !itemChose.checked
      //             : false,
      // }));
      // setOptionCustom(optionsSingle);
      onPress(itemChose);
    }
  };

  return (
    <Modal swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View style={styles.contentSwipeDown}>
          <View style={styles.lineSwipeDown} />
        </View>
        {optionCustom.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.contentActionModalBottom,
              {
                borderBottomColor: colors.border,
                borderBottomWidth: index === options.length - 1 ? 0 : StyleSheet.hairlineWidth,
              },
            ]}
            key={item.value}
            onPress={() => onSelect(item)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.iconName && (
                <Icon
                  solid
                  name={item.iconName}
                  color={item.checked ? colors.primary : item.iconColor || colors.text}
                  style={styles.image}
                />
              )}
              <Text body2 primaryColor={item.checked}>
                {t(item.text)}
              </Text>
            </View>
            {item.checked && <Icon name="check" size={14} color={colors.primary} />}
          </TouchableOpacity>
        ))}
        {isMulti && (
          <Button full style={{ marginTop: 10, marginBottom: 20 }} onPress={onApply}>
            {t('apply')}
          </Button>
        )}
      </View>
    </Modal>
  );
};

ModalOption.propTypes = {
  options: PropTypes.array,
  onPress: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMulti: PropTypes.bool,
};

export default ModalOption;
