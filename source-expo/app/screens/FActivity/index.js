import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { FActivites } from '@/data';
import { HeaderText, Icon, SafeAreaView, TextInput, Transaction2Col } from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { haveChildren } from '@/utils';
import styles from './styles';

export default function FActivity() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(FActivites);
  const navigation = useNavigation();
  /**
   * Called when apply change language
   */
  const goToFilter = () => {
    navigation.navigate({
      name: 'FActivityFilter',
      params: {},
      merge: true,
    });
  };

  const filterCategory = (text) => {
    setCategory(text);
    if (text) {
      setCategories(FActivites.filter((item) => haveChildren(item.name, text) || haveChildren(item.status, text)));
    } else {
      setCategories(FActivites);
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <HeaderText title={t('activities')} />
      <View style={styles.contain}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
            paddingBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            onChangeText={filterCategory}
            placeholder={t('enter_a_currency')}
            value={category}
            icon={
              <TouchableOpacity onPress={() => filterCategory('')}>
                <Icon name="times" size={16} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
          <TouchableOpacity style={{ paddingLeft: 20 }} onPress={goToFilter}>
            <Icon name="sliders-h" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Transaction2Col
              key={item.id}
              icon={item.icon}
              name={item.name}
              date={item.date}
              status={item.status}
              price={item.price}
              isUp={item.isUp}
              backgroundIcon={item.backgroundIcon}
              onPress={() => navigation.navigate('FHistoryDetail')}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
