import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, RefreshControl, View } from 'react-native';
import { AlbumsData } from '@/data/music';
import { BaseColor, BaseStyle, Typography, useTheme } from '@/config';
import { CardChannelGrid, Header, Icon, SafeAreaView, TextInput } from '@/components';
import styles from './styles';

const MAlbum = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(AlbumsData);
  const [, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeText = (text) => {
    setSearch(text);
    setCategory(text ? category.filter((item) => item.title.includes(text)) : AlbumsData);
  };

  const renderContent = () => {
    return (
      <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
        <Header
          title={t('music_album')}
          renderLeft={() => <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />}
          onPressLeft={() => navigation.goBack()}
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

        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          numColumns={3}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <CardChannelGrid
                style={styles.item}
                imageStyle={styles.imageStyle}
                image={item.image}
                title={item.name}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default MAlbum;
