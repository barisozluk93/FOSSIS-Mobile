import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Avatars from '@/components/Avatars';
import Icon from '@/components/Icon';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import styles from './styles';

const UserTicket = ({
  style,
  title,
  description,
  phone,
  email,
  status = '',
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { nameStatus, statusColor } = useMemo(() => {
    switch (status) {
      case 'active':
        return {
          nameStatus: t(status),
          statusColor: BaseColor.greenColor,
        };
      case 'passive':
        return {
          nameStatus: t(status),
          statusColor: BaseColor.pinkDarkColor,
        };
      default:
        return {
          nameStatus: t(status),
          statusColor: BaseColor.greenColor,
        };
    }
  }, [status]);

  return (
    <View style={[styles.contain, style]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ flex: 1 }}>
            <Text headline numberOfLines={2}>
              {title}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Tag
              light
              textStyle={{
                color: BaseColor.whiteColor,
              }}
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
        <Text
          caption2
          light
          style={{
            paddingTop: 10,
          }}
        >
          <Icon name="user" solid />&nbsp;{description}
        </Text>
        <Text
          caption2
          light
          style={{
            paddingTop: 10,
          }}
        >
          <Icon name="phone" solid />&nbsp;{phone}
        </Text>
        <Text
          caption2
          light
          style={{
            paddingTop: 10,
          }}
        >
          <Icon name="envelope" solid />&nbsp;{email}
        </Text>
        <View
          style={[
            styles.footer,
            {
              borderColor: colors.border,
            },
          ]}
        >
        </View>
      </View>
    </View>
  );
};

UserTicket.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
};

export default UserTicket;
