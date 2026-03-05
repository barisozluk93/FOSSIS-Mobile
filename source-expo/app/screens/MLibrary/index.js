import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { EFollowers } from '@/data';
import { Icon, ListTextButton, SafeAreaView, Tag, Text } from '@/components';

const tags = [
  {
    name: 'Playlist',
  },
  {
    name: 'Albums',
  },
  {
    name: 'Artists',
  },
];

const MLibrary = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [followers, setFollowers] = useState(
    EFollowers.map((item, index) => (index === 0 ? { ...item, isFollow: true } : item))
  );

  const onFollow = (itemFollow) => {
    const followersNew = followers.map((item) => ({
      ...item,
      isFollow: item.id === itemFollow.id ? !item.isFollow : item.isFollow,
    }));
    setFollowers(followersNew);
  };

  const goToPage = (pageName) => () => navigation.navigate(pageName);

  const getTagProps = (index) => ({
    marginRight: 10,
    backgroundColor: index === 0 ? colors.primary : colors.background,
  });

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <View style={BaseStyle.container}>
        <Text title3 bold style={{ marginBottom: 15 }}>
          {t('library')}
        </Text>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            contentContainerStyle={{ paddingBottom: 15 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            {tags.map((item, index) => (
              <Tag key={String(index)} primary={index === 0} style={getTagProps(index)} outline={index !== 0}>
                {item.name}
              </Tag>
            ))}
          </ScrollView>
          <View>
            <View
              style={[
                BaseStyle.row,
                {
                  alignSelf: 'flex-start',
                  borderWidth: 1,
                  borderRadius: 3,
                  borderColor: colors.border,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  marginBottom: 15,
                },
              ]}
            >
              <Icon name="sort-alpha-down" size={12} style={{ marginRight: 5 }} color={colors.text} />
              <Text>{t('music_recently_played')}</Text>
            </View>
          </View>
          {followers.map((item, index) => (
            <ListTextButton
              key={String(index)}
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
              onPress={goToPage('MProfile')}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MLibrary;
