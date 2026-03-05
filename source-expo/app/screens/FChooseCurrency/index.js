import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { FCurrencies } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { haveChildren } from '@/utils';
import { Header, Icon, ListThumbCircle, SafeAreaView, Text, TextInput } from '@/components';
import styles from './styles';

export default function FChooseCurrency({ setModalVisible = null, value = {}, onChange = () => {} }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [loading] = useState('');
  const [category, setCategory] = useState('');
  const [categoryChoosed, setCategoryChoosed] = useState(value);
  const [categories, setCategories] = useState(FCurrencies);
  const navigation = useNavigation();

  useEffect(() => {
    setCategoryChoosed(value);
  }, [value]);

  /**
   * Called when apply change language
   */
  const saveCategory = () => {
    onChange(categoryChoosed);
    handleClose();
  };

  const handleClose = () => {
    if (setModalVisible) {
      setModalVisible(false);
    } else {
      navigation.goBack();
    }
  };

  const filterCategory = (text) => {
    setCategory(text);
    if (text) {
      setCategories(
        FCurrencies.filter((item) => haveChildren(item.title, text) || haveChildren(item.description, text))
      );
    } else {
      setCategories(FCurrencies);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('choose_a_currency')}
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
          handleClose();
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
            placeholder={t('enter_a_currency')}
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
            <ListThumbCircle
              onPress={() => setCategoryChoosed(item)}
              style={{
                paddingHorizontal: 20,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: categoryChoosed.id === item.id ? colors.card : colors.background,
              }}
              image={item.image}
              txtLeftTitle={item.title}
              txtContent={item.description}
              txtRight={item.date}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
