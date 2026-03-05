import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import ProgressBar from '@/components/Progress/Bar';
import styles from './styles';

const FileAttachment = ({
  icon = '',
  style = {},
  name = '',
  size = '',
  onPress = () => {},
  percent = '0',
  backgroundIcon = '',
}) => {
  const { colors } = useTheme();
  const { percentInt, isNormal, isLoading, isCompleted } = useMemo(() => {
    let data = {
      isNormal: true,
      isLoading: false,
      isCompleted: false,
      percentInt: 0,
    };
    try {
      const percentParsed = parseInt(percent, 10);
      data.percentInt = percentParsed;
      if (percentParsed > 0 && percentParsed < 100) {
        data.isNormal = false;
        data.isCompleted = false;
        data.isLoading = true;
      } else if (percentParsed >= 100) {
        data.isNormal = false;
        data.isCompleted = true;
        data.isLoading = false;
      }
      return data;
    } catch (error) {
      return data;
    }
  }, [percent]);

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.image, { backgroundColor: backgroundIcon || colors.primaryLight }]}>
        <Icon name={icon} size={18} style={{ color: BaseColor.whiteColor }} solid />
      </View>
      <View
        style={{
          paddingLeft: 15,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>{name}</Text>
            <Text overline light>
              {size}
            </Text>
          </View>

          <TouchableOpacity disabled={!isLoading} style={{ paddingHorizontal: 10 }}>
            {isLoading && <Icon name="times-circle" size={14} solid color={BaseColor.kashmir} />}
            {isCompleted && <Icon name="check" size={14} solid color={BaseColor.greenColor} />}
            {isNormal && <Icon name="cloud-download-alt" size={14} solid color={BaseColor.kashmir} />}
          </TouchableOpacity>
        </View>
        {!isNormal && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ProgressBar style={{ flex: 1, paddingRight: 20 }} percent={percentInt} color={BaseColor.blueColor} />
            <Text footnote light style={{ paddingHorizontal: 10 }}>
              {`${percentInt}%`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

FileAttachment.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.string,
  name: PropTypes.string,
  percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  backgroundIcon: PropTypes.string,
};

export default FileAttachment;
