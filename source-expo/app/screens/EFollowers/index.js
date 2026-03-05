import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { EFollowers } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { Header, Icon, ListTextButton, SafeAreaView, Tag } from '@/components';
import styles from './styles';

export default function Followers({ navigation }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [followers, setFollowers] = useState(EFollowers);

  const onFollow = (itemFollow) => {
    const followersNew = followers.map((item) => {
      const isItemChoosed = item.id === itemFollow.id;
      let isFollow = item.isFollow;
      let total = item.total;
      if (isItemChoosed) {
        isFollow = !isFollow;
        if (isFollow) {
          total += 1;
        } else {
          total -= 1;
        }
      }

      return {
        ...item,
        isFollow: isFollow,
        total: total,
      };
    });
    setFollowers(followersNew);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('followers')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contain}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={followers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ListTextButton
              image={item.image}
              name={item.name}
              description={`${item.total} ${t('followers').toLowerCase()}`}
              componentRight={
                <Tag
                  onPress={() => onFollow(item)}
                  outline
                  style={{
                    backgroundColor: item.isFollow ? colors.primary : colors.background,
                  }}
                  textStyle={{
                    color: item.isFollow ? BaseColor.whiteColor : colors.primary,
                  }}
                >
                  {`+ ${t('follow')}`}
                </Tag>
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
