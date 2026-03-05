import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { FFriends } from '@/data';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import { haveChildren } from '@/utils';
import { Header, Icon, ListTextButton, SafeAreaView, Tag, TextInput, Text } from '@/components';

export default function PSelectAssignee() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const [friends, setFriends] = useState(FFriends);
  const route = useRoute();

  useEffect(() => {
    if (route?.params?.members) {
      const members = route?.params?.members || [];
      const ids = members.map((item) => item.id);
      setFriends(
        friends.map((item) => ({
          ...item,
          isSelect: ids.includes(item.id),
        }))
      );
    }
  }, [route?.params?.members]);

  const filterCategory = (text) => {
    setKeyword(text);
    if (text) {
      setFriends(FFriends.filter((item) => haveChildren(item.name, text) || haveChildren(item.total, text)));
    } else {
      setFriends(FFriends);
    }
  };

  const onSelect = (user) => {
    setFriends(friends.map((item) => (item.id === user.id ? { ...item, isSelect: !user.isSelect } : item)));
  };

  const onSave = () => {
    // navigation.navigate("PProjectView", {
    //     members: friends.filter((item) => item.isSelect),
    // });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('select_assignee')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('save')}
            </Text>
          );
        }}
        onPressRight={onSave}
      />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View
          style={{
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <TextInput
            onChangeText={filterCategory}
            placeholder={t('name_username_or_email')}
            value={keyword}
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
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListTextButton
              image={item.image}
              name={item.name}
              description={item.total}
              componentRight={
                item.isSelect ? (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 30,
                      paddingVertical: 5,
                    }}
                    onPress={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                  >
                    <Icon name="check" size={18} color={colors.primary} />
                  </TouchableOpacity>
                ) : (
                  <Tag
                    onPress={(e) => {
                      e.stopPropagation();
                      onSelect(item);
                    }}
                    outline
                    style={{
                      paddingHorizontal: 20,
                      backgroundColor: colors.background,
                    }}
                  >
                    {`${t('select')}`}
                  </Tag>
                )
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
