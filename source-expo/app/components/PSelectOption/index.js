import { Fragment, useState } from 'react';
import { EOptions } from '@/data';
import { useTheme } from '@/config';
import Icon from '@/components/Icon';
import ModalOption from '@/components/ModalOption';
import Tag from '@/components/Tag';

const PSelectOption = ({ title = 'Type', options = EOptions, value = [], onPress = () => {} }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Fragment>
      <Tag
        iconRight
        style={{ marginHorizontal: 5 }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        {`${title}${value.length > 0 ? ` (${value.length})  ` : ' '}`}
        <Icon name="chevron-down" color={colors.text} size={10} />
      </Tag>
      <ModalOption
        isMulti={true}
        value={value}
        options={options}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        onPress={(option) => {
          onPress(option);
          setModalVisible(false);
        }}
      />
    </Fragment>
  );
};

export default PSelectOption;
