import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import styles from './styles';

const MaterialTicket = ({
  style,
  title,
  manufacturer,
  type,
  structureType,
  technology,
  panelOrientation,
  maximumDCPower,
  nominalACPower,
  nominalCapacity,
  cop,
  power,
  width,
  height,
  status = '',
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { nameStatus, statusColor } = useMemo(() => {
    switch (status) {
      case 'active':
        return {
          nameStatus: t('active'),
          statusColor: BaseColor.greenColor,
        };
      case 'passive':
        return {
          nameStatus: t('passive'),
          statusColor: BaseColor.pinkDarkColor,
        };
      default:
        return {
          nameStatus: t(status),
          statusColor: BaseColor.greenColor,
        };
    }
  }, [status, t]);

  const renderField = (labelKey, icon, value, suffix = '') =>
    value ? (
      <View style={styles.field}>
        <Text style={styles.label}>{t(labelKey)}</Text>
        <Text caption2 light style={styles.value}>
          <Icon name={icon} solid /> {value}
          {suffix}
        </Text>
      </View>
    ) : null;

  return (
    <View style={[styles.contain, style]}>
      <View style={{ flex: 1 }}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text headline numberOfLines={2}>
              {title}
            </Text>
          </TouchableOpacity>

          <View style={styles.statusWrapper}>
            <Tag
              light
              textStyle={{ color: BaseColor.whiteColor }}
              style={{
                backgroundColor: statusColor,
                paddingHorizontal: 10,
                minWidth: 80,
              }}
            >
              {nameStatus}
            </Tag>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.contentRow}>

          {/* LEFT */}
          <View style={styles.leftColumn}>
            {renderField('manufacturer', 'industry', manufacturer)}
            {renderField('dcpower', 'battery-full', maximumDCPower, ' kW')}
            {renderField('acpower', 'battery-full', nominalACPower, ' kW')}
            {renderField('capacity', 'battery-full', nominalCapacity, ' kW')}
            {renderField('cop', 'battery-full', cop)}
            {renderField('power', 'battery-full', power, ' kW')}
          </View>

          {/* RIGHT */}
          <View style={styles.rightColumn}>
            {renderField('type', 'list', type)}
            {renderField('structuretype', 'list', structureType)}
            {renderField('technology', 'microchip', technology)}
            {renderField('panelorientation', 'compass', panelOrientation)}
            {renderField('width', 'arrows-alt-h', width, ' cm')}
            {renderField('height', 'arrows-alt-v', height,  ' cm')}
          </View>

        </View>

        <View
          style={[
            styles.footer,
            {
              borderColor: colors.border,
            },
          ]}
        />
      </View>
    </View>
  );
};

MaterialTicket.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
};

export default MaterialTicket;