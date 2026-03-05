import { useState, Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useTheme } from '@/config';
import { Text, Icon } from '@/components';

const DatePicker = ({ label, onChange, value = new Date(), formatDisplay = 'YYYY MMMM DD' }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { colors } = useTheme();

  const openModal = () => {
    setModalVisible(true);
  };

  const handleDatePicked = (dateInline) => {
    onChange(dateInline);
    setModalVisible(false);
  };

  const hideDateTimePicker = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Text footnote bold>
        {label}
      </Text>
      <TouchableOpacity
        onPress={openModal}
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 5,
          backgroundColor: colors.background,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          height: 35,
          borderRadius: 5,
        }}
      >
        <Fragment>
          <Text style={{ flex: 1 }}>{moment(value).format(formatDisplay)}</Text>
          <Icon name="calendar" />
        </Fragment>
      </TouchableOpacity>
      <DateTimePicker
        mode="date"
        date={value}
        isVisible={modalVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
    </View>
  );
};

export default DatePicker;
