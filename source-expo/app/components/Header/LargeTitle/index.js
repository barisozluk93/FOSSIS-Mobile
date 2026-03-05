import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View, TouchableOpacity, useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { EYourStores } from '@/data';
import { BaseColor, useTheme } from '@/config';
import ModalFilter from '@/components/ModalFilter';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

export const HeaderLargeTitleStore = ({ storesData = EYourStores, onChange = () => {}, style = {} }) => {
  const { t } = useTranslation();
  const [stores, setStores] = useState(storesData);
  const [storeChoosed, setStoreChoosed] = useState(storesData?.[0] ?? {});
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const storesInline = storesData.map((item, index) => {
      return {
        ...item,
        checked: index === 0,
      };
    });
    setStores(storesInline);
  }, []);

  const onChangeStore = () => {
    let storeSelected = {};
    for (const store of stores) {
      if (store.checked) {
        storeSelected = store;
        break;
      }
    }
    setStoreChoosed(storeSelected);
    setModalVisible(false);
    onChange(storeSelected);
  };

  const onSelectStore = (store) => {
    const storesInline = storesData.map((item) => {
      return {
        ...item,
        checked: item.value === store.value,
      };
    });
    setStores(storesInline);
  };
  return (
    <Fragment>
      <TouchableOpacity style={style} onPress={() => setModalVisible(true)}>
        <Text body2 bold>
          {' '}
          {t('e_your_store')}
        </Text>
        <View style={styles.viewStore}>
          {storeChoosed.image && <Image source={storeChoosed.image} style={styles.countryImg} borderRadius={10} />}
          <Text overline grayColor style={{ paddingHorizontal: 4 }}>
            {storeChoosed.text}
          </Text>
          <Icon name={'angle-down'} size={10} color={BaseColor.grayColor} />
        </View>
      </TouchableOpacity>
      <ModalFilter
        options={stores}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        onApply={onChangeStore}
        onSelectFilter={onSelectStore}
      />
    </Fragment>
  );
};

export const HeaderLargeTitleBadge = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }} onPress={onPress}>
      <Icon solid name="bell" color={BaseColor.grayColor} size={18} />
      <View style={[styles.badge, { backgroundColor: colors.primary }]} />
    </TouchableOpacity>
  );
};

function HeaderLargeTitle({ barStyle = '', style = {}, onPressBadge = () => {}, onChangeStore = () => {} }) {
  const forceDark = useSelector((state) => state.application.force_dark);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    let option = isDarkMode ? 'light-content' : 'dark-content';
    if (forceDark) {
      option = 'light-content';
    }
    if (forceDark === false) {
      option = 'dark-content';
    }
    if (barStyle) {
      option = barStyle;
    }
    StatusBar.setBarStyle(option, true);
  }, [forceDark, isDarkMode]);

  return (
    <View style={[styles.contain, style]}>
      <HeaderLargeTitleStore style={{ flex: 1 }} storesData={EYourStores} onChange={onChangeStore} />
      <HeaderLargeTitleBadge onPress={onPressBadge} />
    </View>
  );
}

HeaderLargeTitle.propTypes = {
  barStyle: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default HeaderLargeTitle;
