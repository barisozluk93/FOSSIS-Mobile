import { useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/config';
import Image from '@/components/Image';
import Text from '@/components/Text';
import styles from './styles';

const Avatars = ({ styleThumb, users = [], limit = 0, isShowMore = true }) => {
  const { colors } = useTheme();

  const { remainder, usersLimit } = useMemo(() => {
    const limitInt = parseInt(limit, 10);
    let remainderInline = 0;
    let usersLimitInline = users;
    if (!isNaN(limitInt) && limitInt !== 0) {
      remainderInline = users.length - limitInt;
      usersLimitInline = users.slice(0, limitInt);
    }

    return {
      remainder: remainderInline,
      usersLimit: usersLimitInline,
    };
  }, [users, limit]);

  return (
    <View
      style={{
        flexDirection: 'row',
        marginRight: 7,
      }}
    >
      {usersLimit.map((item, index) => {
        return (
          <Image
            key={index}
            source={item.image}
            style={[styles.thumb, index !== 0 ? { marginLeft: -15 } : {}, styleThumb]}
            borderRadius={100}
          />
        );
      })}
      {Boolean(remainder > 0 && isShowMore) && (
        <View
          style={[
            styles.thumb,
            {
              backgroundColor: colors.card,
              marginLeft: -10,
              alignItems: 'center',
              justifyContent: 'center',
            },
            styleThumb,
          ]}
        >
          <Text footnote regular>
            +{remainder}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Avatars;
