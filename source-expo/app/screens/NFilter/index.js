import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import { Header, Icon, SafeAreaView, Tag, Text, TextInput } from '@/components';
import styles from './styles';

const categoryInit = [
  { id: '1', name: 'Entertainment', checked: true },
  { id: '2', name: 'Food & Drink' },
  { id: '3', name: 'Health & Fitness' },
  { id: '4', name: 'Home & Gardern' },
  { id: '5', name: 'News & Politics' },
  { id: '6', name: 'Science' },
];

const facilitiesInit = [
  { id: '1', icon: 'wifi', name: 'News', checked: true },
  { id: '2', icon: 'bath', name: 'Impeachment' },
  { id: '3', icon: 'paw', name: 'West Bank' },
  { id: '4', icon: 'bus', name: 'Donald Trump' },
  { id: '5', icon: 'cart-plus', name: 'Corona Virus' },
  { id: '6', icon: 'clock', name: 'White House' },
];

const NFilter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryInit);
  const [facilities] = useState(facilitiesInit);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectCategory = (select) => {
    const categoryNew = category.map((item) => {
      if (item.name === select.name) {
        return {
          ...item,
          checked: true,
        };
      } else {
        return {
          ...item,
          checked: false,
        };
      }
    });
    setCategory(categoryNew);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('filtering')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('apply')}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={() => navigation.goBack()}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
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
                navigation.goBack();
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
          <Text headline semibold>
            {t('category').toUpperCase()}
          </Text>
          <View style={styles.wrapContent}>
            {category.map((item) => {
              return (
                <Tag
                  primary={item.checked}
                  outline={!item.checked}
                  key={item.id}
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                    height: 28,
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  {item.name}
                </Tag>
              );
            })}
          </View>
          <Text headline semibold style={{ marginTop: 20 }}>
            {t('tags').toUpperCase()}
          </Text>
          <View style={styles.wrapContent}>
            {facilities.map((item) => {
              return (
                <Tag
                  chip
                  key={item.id}
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                    paddingHorizontal: 8,
                    height: 28,
                  }}
                >
                  {item.name}
                </Tag>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NFilter;
