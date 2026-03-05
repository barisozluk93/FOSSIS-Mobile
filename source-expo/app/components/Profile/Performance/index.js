import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Text from '@/components/Text';
import styles from './styles';

export default function ProfilePerformance({
  flexDirection = 'row',
  type = 'medium',
  style = {},
  data = [],
  contentLeft = {},
  contentCenter = {},
  contentRight = {},
}) {
  const { t } = useTranslation();

  const renderValue = (value) => {
    switch (type) {
      case 'primary':
        return (
          <Text title3 semibold primaryColor>
            {value}
          </Text>
        );
      case 'small':
        return (
          <Text body1 semibold>
            {value}
          </Text>
        );
      default:
        return (
          <Text headline semibold>
            {value}
          </Text>
        );
    }
  };

  const renderTitle = (renderType, value) => {
    switch (type) {
      case 'primary':
        return (
          <Text body2 grayColor>
            {t(value)}
          </Text>
        );
      case 'small':
        return (
          <Text caption1 grayColor>
            {t(value)}
          </Text>
        );
      default:
        return (
          <Text body2 grayColor>
            {t(value)}
          </Text>
        );
    }
  };

  switch (flexDirection) {
    case 'row':
      return (
        <View style={[styles.contain, style]}>
          {data.map((item, index) => {
            if (index === 0) {
              return (
                <View style={[styles.contentLeft, contentLeft]} key={index}>
                  {renderValue(item.value)}
                  {renderTitle(item.title)}
                </View>
              );
            } else if (index === data.length - 1) {
              return (
                <View style={[styles.contentRight, contentRight]} key={index}>
                  {renderValue(item.value)}
                  {renderTitle(item.title)}
                </View>
              );
            } else {
              return (
                <View style={[styles.contentCenter, contentCenter]} key={index}>
                  {renderValue(item.value)}
                  {renderTitle(item.title)}
                </View>
              );
            }
          })}
        </View>
      );
    case 'column':
      return (
        <View style={[{ justifyContent: 'space-between', flex: 1 }, style]}>
          {data.map((item, index) => (
            <View style={styles.itemInfor} key={index}>
              {renderTitle(item.title)}
              {renderValue(item.value)}
            </View>
          ))}
        </View>
      );
  }
}

ProfilePerformance.propTypes = {
  flexDirection: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  data: PropTypes.array,
  contentLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
