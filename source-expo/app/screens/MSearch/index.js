import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { TopArtist } from '@/data/music';
import { CategoryData } from '@/data';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { parseHexTransparency } from '@/utils';
import { CategoryBoxColor, CategoryIconImage, GridList, Icon, SafeAreaView, Text, TextInput } from '@/components';

const MSearch = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(CategoryData);

  const onChangeText = (text) => {
    setSearch(text);
    setCategory(text ? category.filter((item) => item.title.includes(text)) : CategoryData);
  };

  const goToPage = (pageName) => () => navigation.navigate(pageName);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <View style={BaseStyle.container}>
        <Text title3 bold style={{ marginBottom: 15 }}>
          {t('music_searching')}
        </Text>
        <View style={BaseStyle.row}>
          <View style={{ flex: 1 }}>
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
          <TouchableOpacity style={{ paddingLeft: 15 }}>
            <Icon name="sliders-h" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {TopArtist.map((item, index) => (
            <CategoryIconImage name={item.name} image={item.image} key={String(index)} onPress={goToPage('MProfile')} />
          ))}
        </ScrollView>
        <GridList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          columns={2}
          data={category}
          renderItem={({ item, index }) => (
            <CategoryBoxColor
              style={{
                paddingLeft: index % 2 === 0 ? 0 : 15,
                paddingBottom: 15,
                width: '100%',
              }}
              title={item.title}
              icon={item.icon}
              color={parseHexTransparency(item.color, 75)}
              onPress={goToPage('MArtis')}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MSearch;
