import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { BaseColor, useTheme } from '@/config';
import Avatars from '@/components/Avatars';
import Icon from '@/components/Icon';
import ProgressBar from '@/components/Progress/Bar';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import styles from './styles';

const Project01 = ({
  style,
  onPress,
  title,
  description,
  onOption,
  members = [],
  limit = 3,
  tasks = 100,
  comments = 0,
  tickets = 0,
  completedTickets = 0,
  status = '',
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { remainder, usersLimit } = useMemo(() => {
    const limitInt = parseInt(limit, 10);
    let remainderInline = 0;
    let usersLimitInline = members;
    if (!isNaN(limitInt) && limitInt !== 0) {
      remainderInline = members.length - limitInt;
      usersLimitInline = members.slice(0, limitInt);
    }

    return {
      remainder: remainderInline,
      usersLimit: usersLimitInline,
    };
  }, [members, limit]);

  const percent = useMemo(() => {
    try {
      if (tickets !== 0) {
        return Math.round((completedTickets / tickets) * 100);
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }, [completedTickets, tickets]);

  const { statusName, statusColor } = useMemo(() => {
    switch (status) {
      case 'on_going':
        return {
          statusName: t(status),
          statusColor: BaseColor.pinkLightColor,
        };
      case 'on_hold':
        return {
          statusName: t(status),
          statusColor: BaseColor.pinkColor,
        };
      default:
        return {
          statusName: t(status),
          statusColor: BaseColor.greenColor,
        };
    }
  }, [status]);

  return (
    <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
            <Text title3 numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity hitSlop={{ top: 10, right: 10, left: 10 }} style={{ paddingLeft: 16 }} onPress={onOption}>
            <Icon name="ellipsis-h" size={14} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 10,
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
            {statusName}
          </Tag>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 20,
          }}
        >
          <Icon name="tasks" size={14} color={colors.text} />
          <Text
            caption1
            style={{
              paddingLeft: 5,
              paddingRight: 20,
            }}
          >
            {tasks} {t('tasks')}
          </Text>

          <Icon solid name="comment" size={14} color={colors.text} />
          <Text
            caption1
            style={{
              paddingHorizontal: 5,
            }}
          >
            {comments} {t('comments')}
          </Text>
        </View>
        <Text caption2 light>
          {description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
          }}
        >
          <Avatars users={members} limit={3} isShowMore={false} />
          <View style={{ flex: 1 }}>
            <Text headline numberOfLines={2}>
              {usersLimit.map((user) => user.name).join(', ')}
            </Text>
            <Text footnote light>
              {`and ${remainder} people enjoy this project`}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 5,
            justifyContent: 'space-between',
          }}
        >
          <Text overline>
            {t('completed')} {`${percent}%`}
          </Text>
          <Text overline>
            {`${completedTickets}/${tickets}`} {t('tickets')}
          </Text>
        </View>
        <ProgressBar style={{ flex: 1, paddingRight: 20 }} color={BaseColor.accentColor} percent={percent} />
      </View>
    </View>
  );
};

Project01.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onOption: PropTypes.func,
};

export default Project01;
