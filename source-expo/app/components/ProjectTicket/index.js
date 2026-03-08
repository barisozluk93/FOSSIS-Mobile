import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import styles from './styles';

const ProjectTicket = ({
  style,
  onPress,
  id,
  name,
  location,
  roofArea,
  margin,
  gridSpace,
  status,
  panel,
  onOption,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { statusName, statusColor } = useMemo(() => {
    switch (status) {
      case 'passive':
        return {
          statusName: t('passive'),
          statusColor: BaseColor.pinkDarkColor,
        };
      case 'active':
        return {
          statusName: t('active'),
          statusColor: BaseColor.greenColor,
        };
      default:
        return {
          statusName: t(status),
          statusColor: BaseColor.greenColor,
        };
    }
  }, [status, t]);

  const renderField = (labelKey, icon, value, suffix = '') =>
    value !== undefined && value !== null && value !== '' ? (
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
          <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
            <Text headline numberOfLines={2}>
              {name}
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
              {statusName}
            </Tag>
          </View>

          <View style={styles.optionWrapper}>
            <TouchableOpacity
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              style={styles.optionButton}
              onPress={ () => onOption(id)}
            >
              <Icon name="ellipsis-h" size={14} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.contentRow}>

          {/* LEFT */}
          <View style={styles.leftColumn}>
            {renderField('location', 'map-marker-alt', location)}
            {renderField('roofarea', 'draw-polygon', roofArea, ' m²')}
          </View>

          {/* RIGHT */}
          <View style={styles.rightColumn}>
            {renderField('panel', 'solar-panel', panel)}
            {renderField('margin', 'ruler-horizontal', margin, ' cm')}
            {renderField('gridspace', 'border-all', gridSpace, ' cm')}
          </View>

        </View>

        {/* FOOTER */}
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

ProjectTicket.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  name: PropTypes.string,
  location: PropTypes.string,
  roofArea: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  gridSpace: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  status: PropTypes.string,
  panel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onOption: PropTypes.func,
};

export default ProjectTicket;