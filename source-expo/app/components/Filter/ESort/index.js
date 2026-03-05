import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import ModalFilter from '@/components/ModalFilter';
import Text from '@/components/Text';
import styles from './styles';

export default function FilterESort(props) {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [sortOption, setSortOption] = useState(
    props.sortOption || [
      {
        value: 'lasted_post',
        text: 'lasted_post',
      },
      {
        value: 'oldest_post',
        text: 'oldest_post',
      },
      {
        value: 'most_view',
        text: 'most_view',
      },
    ]
  );
  const [sortSelected, setSortSelected] = useState(
    props.sortSelected || {
      value: 'high_rate',
      icon: 'sort-amount-up',
      text: 'hightest_rating',
    }
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value === sortSelected.value,
        };
      })
    );
  }, []);

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

  const onOpenSort = () => {
    setModalVisible(true);

    setSortOption(
      sortOption.map((item) => {
        return {
          ...item,
          checked: item.value === sortSelected.value,
        };
      })
    );
  };

  const onApply = () => {
    const { onChangeSort } = props;
    const sorted = sortOption.filter((item) => item.checked);
    if (sorted.length > 0) {
      setSortSelected(sorted[0]);
      setModalVisible(false);
      onChangeSort(sorted[0]);
    }
  };

  const iconModeView = (modeView) => {
    switch (modeView) {
      case 'block':
        return 'square';
      case 'grid':
        return 'th-large';
      case 'list':
        return 'th-list';
      default:
        return 'th-list';
    }
  };

  const { style, modeView, onFilter, onChangeView, labelCustom, title } = props;
  const customAction =
    modeView !== '' ? (
      <TouchableOpacity onPress={onChangeView} style={styles.contentModeView}>
        <Icon name={iconModeView(modeView)} size={16} color={customAction} solid />
      </TouchableOpacity>
    ) : (
      <Text headline grayColor numberOfLines={1} style={styles.contentModeView}>
        {labelCustom}
      </Text>
    );

  return (
    <View style={[styles.contain, { backgroundColor: colors.background }, style]}>
      <View>
        <Text body2>{title}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ModalFilter
          options={sortOption}
          isVisible={modalVisible}
          onSwipeComplete={() => {
            setModalVisible(false);
            setSortOption(props.sortOption);
          }}
          onApply={onApply}
          onSelectFilter={onSelectFilter}
        />
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => onOpenSort()}>
          <Text headline style={{ marginRight: 5 }}>
            {t(sortSelected.text)}
          </Text>
          <Icon name={'chevron-down'} size={16} color={colors.text} solid />
        </TouchableOpacity>
        {customAction}
        <View style={styles.line} />
        <TouchableOpacity onPress={onFilter} style={styles.contentFilter}>
          <Icon name="filter" size={16} color={colors.text} solid />
        </TouchableOpacity>
      </View>
    </View>
  );
}

FilterESort.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  sortOption: PropTypes.array,
  sortSelected: PropTypes.object,
  modeView: PropTypes.string,
  labelCustom: PropTypes.string,
  onChangeSort: PropTypes.func,
  onChangeView: PropTypes.func,
  onFilter: PropTypes.func,
  title: PropTypes.string,
};
