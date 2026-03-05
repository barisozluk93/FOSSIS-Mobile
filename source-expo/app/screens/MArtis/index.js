import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { ArtisResults } from '@/data/music';
import { BaseColor, BaseStyle, Images, Typography, useTheme } from '@/config';
import {
  CategoryIconImage,
  GridList,
  Header,
  Icon,
  ProfileGrid2,
  SafeAreaView,
  Text,
  TextInput,
  NotFound,
} from '@/components';

const users = [
  {
    image: Images.profile1,
    name: 'Kung Jiyeon',
  },
  {
    image: Images.profile2,
    name: 'Mayke Schuurs',
  },
  {
    image: Images.profile3,
    name: 'Masood El Toure',
  },
  {
    image: Images.profile5,
    name: 'Lizzie Rose',
  },
  {
    image: Images.profile6,
    name: 'Vicki Butler',
  },
];

const MArtis = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ArtisResults);

  const goToPage = (pageName) => () => navigation.navigate(pageName);

  const onChangeText = (text) => {
    setSearch(text);
    setCategory(text ? category.filter((item) => item?.name?.includes?.(text)) : ArtisResults);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('music_artis')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      <View style={BaseStyle.container}>
        <TextInput
          style={[BaseStyle.textInput, Typography.body1]}
          onChangeText={onChangeText}
          autoCorrect={false}
          placeholder={t('search')}
          placeholderTextColor={BaseColor.grayColor}
          value={search}
          selectionColor={colors.primary}
          onSubmitEditing={() => {}}
        />
      </View>

      <Text headline style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
        {t('music_top_search')}
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {users.map((item, index) => (
            <CategoryIconImage name={item.name} image={item.image} key={String(index)} onPress={goToPage('MProfile')} />
          ))}
        </ScrollView>
        <Text headline style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
          {t('music_results')}
        </Text>
        <GridList
          columns={3}
          data={category}
          renderItem={({ item, index }) => (
            <ProfileGrid2
              style={{ paddingBottom: 10 }}
              key={index.toString()}
              image={item.image}
              name={item.name}
              onPress={goToPage('MProfile')}
            />
          )}
        />
        {category.length === 0 ? <NotFound /> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MArtis;
