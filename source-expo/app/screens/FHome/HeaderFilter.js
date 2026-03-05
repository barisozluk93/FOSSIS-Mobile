import { Fragment, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/config';
import { Icon, ModalFilter, Text, Header } from '@/components';

const HeaderFilter = () => {
  const { t } = useTranslation();
  const sortOptionInit = [
    {
      value: 'daily',
      icon: 'sort-amount-up',
      text: t('daily'),
    },
    {
      value: 'weekly',
      icon: 'sort-amount-down',
      text: t('weekly'),
    },
    {
      value: 'monthly',
      icon: 'sort-amount-up',
      text: t('monthly'),
      checked: true,
    },
    {
      value: 'yearly',
      icon: 'sort-amount-up',
      text: t('yearly'),
    },
  ];
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [sortChoosed, setSortChoosed] = useState(sortOptionInit[2]);

  const onSelectFilter = (selected) => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value === selected.value,
        };
      })
    );
  };

  const onApply = () => {
    let itemSelected = null;
    for (const item of sortOption) {
      if (item.checked) {
        itemSelected = item;
      }
    }
    if (itemSelected) {
      setModalVisible(false);
      setSortChoosed(itemSelected);
    }
  };
  return (
    <Fragment>
      <Header
        style={{
          marginBottom: 20,
        }}
        title={t('dashboard_bar_chart')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() => (
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => setModalVisible(true)}
          >
            <Text body2 style={{ marginRight: 5 }}>
              {sortChoosed?.text}
            </Text>
            <Icon name="chevron-down" size={12} />
          </TouchableOpacity>
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ModalFilter
        options={sortOption}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setSortOption(sortOptionInit);
        }}
        onApply={onApply}
        onSelectFilter={onSelectFilter}
      />
    </Fragment>
  );
};

export default HeaderFilter;
