import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { parseHexTransparency } from '@/utils';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

const ModalFilter = (props) => {
  const { onClose, title, value, onChange, options, ...attrs } = props;
  const [itemSelected, setItemSelected] = useState({});
  const { colors } = useTheme();
  const { t } = useTranslation();
  const cardColor = colors.card;

  const onSelectFilter = (item) => setItemSelected(item);

  useEffect(() => {
    if (value.key !== itemSelected.key) {
      setItemSelected(value);
    }
  }, [value]);

  const onHandleClose = () => {
    onClose();
    setItemSelected(value);
  };

  return (
    <Modal propagateSwipe swipeDirection={['down']} style={styles.bottomModal} {...attrs}>
      <View style={styles.contentSwipeDown}>
        <View style={styles.lineSwipeDown} />
      </View>
      <View style={[styles.contentFilterBottom, { backgroundColor: cardColor }]}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 15,
            paddingHorizontal: 20,
            alignContent: 'center',
            justifyContent: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.border,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={onHandleClose}>
            <Text footnote>{t('cancel')}</Text>
          </TouchableOpacity>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text bold>{title}</Text>
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }} onPress={() => onChange(itemSelected)}>
            <Text footnote primaryColor>
              {t('save')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ padding: 10, flex: 1 }}>
            {options.map((item) => {
              const isChecked = itemSelected.key === item.key;
              return (
                <TouchableOpacity
                  style={[
                    {
                      flexDirection: 'row',
                      backgroundColor: isChecked ? parseHexTransparency(colors.primary, 50) : 'transparent',
                      padding: 10,
                      borderRadius: 5,
                    },
                  ]}
                  key={item.key}
                  onPress={() => onSelectFilter(item)}
                >
                  <Text style={{ flex: 1 }} footnote whiteColor={isChecked}>
                    {item.name}
                  </Text>
                  {isChecked && <Icon name="check" color={colors.primary} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalFilter;
