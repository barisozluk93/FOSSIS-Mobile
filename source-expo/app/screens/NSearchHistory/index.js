import { useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Card, CardChannelGrid, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { HomeChannelData, RecentListData } from '@/data';
import styles from './styles';

const searchHistoryInit = [
  { id: '1', keyword: 'Corona Virus' },
  { id: '2', keyword: 'Amber Heard' },
  { id: '3', keyword: 'Brexit' },
  { id: '4', keyword: 'Real Marid' },
  { id: '5', keyword: 'Liverpool' },
  { id: '6', keyword: 'Super Bowl  2020 time' },
];

const NSearchHistory = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState(searchHistoryInit);
  const [recentlyView] = useState(RecentListData);
  const [channels] = useState(HomeChannelData);

  const onSearch = (keyword) => {
    const found = searchHistory.some((item) => item.keyword === keyword);
    let searchData = [];

    if (found) {
      searchData = searchHistory.map((item) => {
        return {
          ...item,
          checked: item.keyword === keyword,
        };
      });
    } else {
      searchData = searchHistory.concat({
        keyword: search,
      });
    }
    setSearch(keyword);
    setSearchHistory(searchData);
    setLoading(true);
    setTimeout(() => navigation.navigate('NPost'), 1000);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <TouchableOpacity onPress={() => onSearch(search)}>
                <Text header headline primaryColor>
                  {t('apply')}
                </Text>
              </TouchableOpacity>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={(text) => setSearch(text)}
            autoCorrect={false}
            placeholder={t('enter_keywords')}
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={colors.primary}
            onSubmitEditing={() => {
              onSearch(search);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setSearch('');
            }}
            style={styles.btnClearSearch}
          >
            <Icon name="times" size={18} color={BaseColor.grayColor} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={styles.rowTitle}>
            <Text title3 semibold>
              {t('search_history').toUpperCase()}
            </Text>
            <TouchableOpacity onPress={() => setSearchHistory([])}>
              <Text caption1 accentColor>
                {t('clear')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {searchHistory.map((item, index) => (
              <TouchableOpacity
                style={[
                  styles.itemHistory,
                  item.checked
                    ? {
                        backgroundColor: colors.primary,
                      }
                    : {
                        backgroundColor: colors.card,
                      },
                ]}
                onPress={() => onSearch(item.keyword)}
                key={'search' + index}
              >
                <Text
                  caption2
                  style={
                    item.checked
                      ? {
                          color: BaseColor.whiteColor,
                        }
                      : {}
                  }
                >
                  {item.keyword}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text title3 semibold>
            {t('recently_viewed').toUpperCase()}
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={recentlyView}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 10,
                  marginTop: 5,
                }}
                image={item.image}
                onPress={() =>
                  navigation.navigate('NPostDetail', {
                    item: item,
                  })
                }
              />
            )}
          />
        </View>

        <View
          style={{
            marginTop: 24,
          }}
        >
          <Text title3 semibold>
            {t('discover_channels')}
          </Text>
          <Text body2 grayColor>
            {t('description_discover_channels')}
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 4 }}
            data={channels}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <CardChannelGrid image={item.image} title={item.title} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NSearchHistory;
