import { useState, useEffect, useMemo, forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import styles from './styles';

const formatDate = (date) => moment(date).format('MMM DD');

const CalendarPicker = (props, ref) => {
  const { style, onCancel = () => {}, onChange = () => {}, renderDate = null } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [markedDatesCalendar, setMarkedDatesCalendar] = useState({});
  const [month, setMonth] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    if (ref?.current) {
      ref.current.open = open;
    }
  }, []);

  const open = () => {
    setModalVisible(true);
  };

  const getListDate = (start, end) => {
    let markedDates = {};
    for (let m = moment(start); m.diff(end, 'days') <= 0; m.add(1, 'days')) {
      let key = m.format('YYYY-MM-DD');
      if (key === start) {
        markedDates[start] = {
          selected: true,
          color: colors.primary,
          startingDay: true,
          textColor: BaseColor.whiteColor,
        };
      } else if (key === end) {
        markedDates[end] = {
          selected: true,
          color: colors.primary,
          endingDay: true,
          textColor: BaseColor.whiteColor,
        };
      } else {
        markedDates[key] = {
          selected: true,
          color: colors.primary,
          textColor: BaseColor.whiteColor,
        };
      }
    }

    return markedDates;
  };

  const onDayPress = (day) => {
    let markedDates = {};
    let newStartDate = '';
    let newEndDate = '';
    if ((startDate && endDate) || (!startDate && !endDate)) {
      newStartDate = day.dateString;
      newEndDate = '';
    } else if (!startDate) {
      newStartDate = day.dateString;
      newEndDate = endDate;
    } else {
      newStartDate = startDate;
      newEndDate = day.dateString;
    }

    if (newStartDate && newEndDate) {
      if (moment(newStartDate).isSameOrBefore(newEndDate)) {
        markedDates = getListDate(newStartDate, newEndDate);
      } else {
        markedDates = getListDate(newEndDate, newStartDate);
      }
    } else if (newStartDate) {
      markedDates[newStartDate] = {
        color: colors.primary,
        startingDay: true,
        endingDay: true,
        textColor: BaseColor.whiteColor,
      };
    }
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setMarkedDatesCalendar(markedDates);
  };
  const displayRangeDate = useMemo(() => {
    return `${formatDate(startDate)} - ${formatDate(endDate || startDate)}`;
  }, [startDate, endDate]);

  return (
    <View style={[styles.contentPickDate, style]}>
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
            markingType={'period'}
            markedDates={markedDatesCalendar}
            onDayPress={onDayPress}
            monthFormat={'dd-MM-yyyy'}
            onMonthChange={(monthSelected) => {
              setMonth(monthSelected.dateString);
            }}
            renderHeader={() => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Text title3 semibold>
                    {moment(month).format('MMM YYYY')}
                  </Text>
                  <Text regular>{displayRangeDate}</Text>
                </View>
              );
            }}
            theme={{
              calendarBackground: colors.card,
              textSectionTitleColor: colors.primary,
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
              // textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
          />
          <View style={styles.contentActionCalendar}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onCancel();
              }}
            >
              <Text body1>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                onChange({
                  startDate: startDate,
                  endDate: endDate || startDate,
                });
              }}
            >
              <Text body1 primaryColor>
                {t('done')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {renderDate ? (
        renderDate(open)
      ) : (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text body1 light>
            {displayRangeDate}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default forwardRef(CalendarPicker);
