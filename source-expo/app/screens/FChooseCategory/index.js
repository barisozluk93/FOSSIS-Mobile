import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { FChooseCategories } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { haveChildren } from '@/utils';
import { CategoryList, Header, Icon, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

export default function FChooseCategory() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [loading] = useState('');
  const [category, setCategory] = useState('');
  const [categoryChoosed, setCategoryChoosed] = useState({});
  const [categories, setCategories] = useState(FChooseCategories);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route?.params?.category) {
      setCategoryChoosed(route?.params?.category ?? {});
    }
  }, [route?.parmas]);

  /**
   * Called when apply change language
   */
  const saveCategory = () => {
    navigation.navigate({
      name: 'FAddTransaction',
      params: { category: categoryChoosed },
      merge: true,
    });
  };

  const filterCategory = (text) => {
    setCategory(text);
    if (text) {
      setCategories(
        FChooseCategories.filter((item) => haveChildren(item.title, text) || haveChildren(item.subtitle, text))
      );
    } else {
      setCategories(FChooseCategories);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('choose_a_category')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          } else {
            return (
              <Text headline primaryColor numberOfLines={1}>
                {t('save')}
              </Text>
            );
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={saveCategory}
      />
      <View style={styles.contain}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <TextInput
            onChangeText={filterCategory}
            placeholder={t('enter_a_category')}
            value={category}
            icon={
              <TouchableOpacity onPress={() => filterCategory('')}>
                <Icon name="times" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryList
              isImageRound
              onPress={() => setCategoryChoosed(item)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: categoryChoosed.id === item.id ? colors.card : colors.background,
              }}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
