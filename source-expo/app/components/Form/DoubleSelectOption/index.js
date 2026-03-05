import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { BaseColor, useTheme } from '@/config';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import styles from './styles';

export default function DoubleSelectOption(props) {
  const { t } = useTranslation();

  const [markedDatesIn, setMarkedDatesIn] = useState({});
  const [markedDatesOut, setMarkedDatesOut] = useState({});
  const [checkInTime, setCheckInTime] = useState(props.checkInTime || '2020-02-25');
  const [checkOutTime, setCheckOutTime] = useState(props.checkOutTime || '2020-02-29');
  const [modalVisible, setModalVisible] = useState(false);
  const [startMode, setStartMode] = useState(true);
  const [renderCalendar, setRenderCalendar] = useState(true);
  const {
    style,
    onCancel,
    onChange,
    minDate = '2019-05-10',
    maxDate = '2020-05-30',
    titleLeft = t('check_in'),
    titleRight = t('check_out'),
  } = props;
  const { colors } = useTheme();

  const openModal = (startModeInline = true) => {
    setModalVisible(true);
    setStartMode(startModeInline);
  };

  const setDaySelected = (selected, startModeInline = true) => {
    let markedIn = {};
    let markedOut = {};

    if (startModeInline) {
      markedIn[selected] = {
        selected: true,
        marked: true,
        selectedColor: colors.primary,
      };
      setMarkedDatesIn(markedIn);
      setCheckInTime(selected);
    } else {
      markedOut[selected] = {
        selected: true,
        marked: true,
        selectedColor: colors.primary,
      };
      setMarkedDatesOut(markedOut);
      setCheckOutTime(selected);
    }
  };

  useEffect(() => {
    setRenderCalendar(false);
    setTimeout(() => {
      setRenderCalendar(true);
    }, 250);
  }, [colors.card]);

  useEffect(() => {
    let markedIn = {};
    let markedOut = {};
    markedIn[props.checkInTime] = {
      selected: true,
      marked: true,
      selectedColor: colors.primary,
    };
    markedOut[props.checkOutTime] = {
      selected: true,
      marked: true,
      selectedColor: colors.primary,
    };
    setMarkedDatesIn(markedIn);
    setMarkedDatesOut(markedOut);
  }, [props.checkInTime, props.checkOutTime, colors.primary]);

  return (
    <View style={[styles.contentPickDate, { backgroundColor: colors.card }, style]}>
      <Modal
        isVisible={modalVisible}
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={1}
        animationIn="fadeIn"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        {renderCalendar && (
          <View style={[styles.contentCalendar, { backgroundColor: colors.card }]}>
            <Calendar
              style={{
                borderRadius: 8,
                backgroundColor: colors.card,
              }}
              renderArrow={(direction) => {
                return (
                  <Icon
                    name={direction === 'left' ? 'angle-left' : 'angle-right'}
                    size={14}
                    color={colors.primary}
                    enableRTL={true}
                  />
                );
              }}
              markedDates={startMode ? markedDatesIn : markedDatesOut}
              current={startMode ? checkInTime : checkOutTime}
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={(day) => {
                setDaySelected(day.dateString, startMode);
              }}
              monthFormat={'dd-MM-yyyy'}
              theme={{
                calendarBackground: colors.card,
                textSectionTitleColor: colors.text,
                selectedDayBackgroundColor: colors.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: colors.primary,
                dayTextColor: colors.text,
                textDisabledColor: BaseColor.grayColor,
                dotColor: colors.primary,
                selectedDotColor: '#ffffff',
                arrowColor: colors.primary,
                monthTextColor: colors.text,
                // textDayFontFamily: DefaultFont,
                // textMonthFontFamily: DefaultFont,
                // textDayHeaderFontFamily: DefaultFont,
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14,
              }}
            />
            <View style={styles.contentActionCalendar}>
              <TouchableOpacity
                onPress={() => {
                  if (startMode) {
                    setModalVisible(false);
                    setStartMode(true);
                    setCheckInTime(props.checkInTime || '2020-02-25');
                  } else {
                    setModalVisible(false);
                    setStartMode(false);
                    setCheckOutTime(props.checkOutTime || '2020-02-29');
                  }
                  onCancel();
                }}
              >
                <Text body1>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setStartMode(false);
                  onChange(checkInTime, checkOutTime);
                }}
              >
                <Text body1 primaryColor>
                  {t('done')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
      <TouchableOpacity style={styles.itemPick} onPress={() => openModal()}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          {titleLeft}
        </Text>
        <Text headline semibold>
          {checkInTime}
        </Text>
      </TouchableOpacity>
      <View style={[styles.linePick, { backgroundColor: colors.border }]} />
      <TouchableOpacity style={styles.itemPick} onPress={() => openModal(false)}>
        <Text caption1 light style={{ marginBottom: 5 }}>
          {titleRight}
        </Text>
        <Text headline semibold>
          {checkOutTime}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

DoubleSelectOption.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  checkInTime: PropTypes.string,
  checkOutTime: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};
