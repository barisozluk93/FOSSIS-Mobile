import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { CategoryIcon, Header, Icon, SafeAreaView, TextInput } from '@/components';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { FCategoryData } from '@/data';

const FCategory = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(FCategoryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CategoryIcon
        loading={loading}
        style={{
          marginBottom: 10,
        }}
        title={item.title}
        subtitle={item.subtitle}
        icon={item.icon}
        color={item.color}
        onPress={() => navigation.navigate(item.screen)}
      />
    );
  };

  const onChangeText = (text) => {
    setSearch(text);
    setCategory(text ? category.filter((item) => item.title.includes(text)) : FCategoryData);
  };

  const renderContent = () => {
    return (
      <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
        <Header
          title={t('categories')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
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

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          numColumns={1}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default FCategory;
