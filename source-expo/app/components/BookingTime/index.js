import { useState } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useTheme } from '@/config';
import Text from '@/components/Text';
import styles from './styles';

const BookingTime = (props) => {
  const { style, checkInTime = '09:00', checkOutTime = '18:00' } = props;
  const { colors } = useTheme();

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = () => {
    hideDateTimePicker();
  };

  return (
    <View style={[styles.contentPickDate, { backgroundColor: colors.background }, style]}>
      <DateTimePicker
        mode="time"
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
      />
      <TouchableOpacity style={styles.itemPick} onPress={showDateTimePicker}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          Check In
        </Text>
        <Text headline semibold>
          {checkInTime}
        </Text>
      </TouchableOpacity>
      <View style={styles.linePick} />
      <TouchableOpacity style={[styles.itemPick, styles.right]} onPress={showDateTimePicker}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          Check Out
        </Text>
        <Text headline semibold>
          {checkOutTime}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

BookingTime.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  checkInTime: PropTypes.string,
  checkOutTime: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

export default BookingTime;
