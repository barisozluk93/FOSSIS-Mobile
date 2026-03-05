import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import { EReviewsData, PProject } from '@/data';
import {
  CardCommentSimple,
  Header,
  Icon,
  ModalFilter,
  ProductSpecGrid,
  ProfileAuthor,
  SafeAreaView,
  SearchBox,
  Tag,
  Text,
} from '@/components';
import styles from './styles';
import Attachment from './Attachment';

const sortOptionInit = [
  {
    value: 'most_helpful',
    text: 'most_helpful',
  },
  {
    value: 'most_favourable',
    text: 'most_favourable',
  },
  {
    value: 'most_crictical',
    text: 'most_crictical',
  },
  {
    value: 'most_recent',
    text: 'most_recent',
  },
];

const PTaskView = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [, setMembers] = useState(PProject[0].members);
  const [item, setItem] = useState(PProject[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const [loading, setLoading] = useState(false);
  const searchBox = useRef(null);
  const [option, setOption] = useState(sortOptionInit[3]);

  useEffect(() => {
    if (route?.params?.members) {
      setMembers(route?.params?.members);
    }
  }, [route?.params?.members]);

  useEffect(() => {
    if (route?.params?.item) {
      setItem(route?.params?.item);
    }
  }, [route?.params?.item]);

  const onSelectFilter = (itemInline) => {
    setSortOption(
      sortOption.map((optionInline) => ({
        ...optionInline,
        checked: itemInline.value === optionInline.value,
      }))
    );
  };
  const onSubmitEditing = () => () => {
    setLoading(true);
    if (searchBox) {
      searchBox.current.blur();
    }

    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { flex: 1 }]} edges={['right', 'top', 'left']}>
      <Header
        title={t('task_view')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              {t('edit')}
            </Text>
          );
        }}
        onPressRight={() => {
          navigation.navigate('PTaskCreate', { item: item });
        }}
      />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <Text title3>{item.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <ProfileAuthor
                  style={{ flex: 1 }}
                  image={Images.profile1}
                  name="Steve Garret"
                  description="Crated on 19 Otc 2021"
                />
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="ellipsis-v" size={14} />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Icon name="briefcase" size={14} color={BaseColor.kashmir} />
                <Text footnote style={{ marginLeft: 5 }}>
                  App Design and Development
                </Text>
              </View>
              <Text body2 light style={{ paddingVertical: 10 }}>
                {
                  'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Pellentesque in ipsum id orci porta dapibus. Vivamus suscipit tortor eget felis porttitor volutpat.'
                }
              </Text>
              <Text
                headline
                style={{
                  paddingTop: 10,
                  paddingBottom: 5,
                }}
              >
                {t('attachment')}
              </Text>
              <Attachment />
              <Text
                headline
                style={{
                  paddingTop: 10,
                  paddingBottom: 5,
                }}
              >
                {t('status')}
              </Text>
              <View style={styles.specifications}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <Tag
                        primary
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 2,
                          backgroundColor: colors.primaryLight,
                        }}
                      >
                        {t('hight')}
                      </Tag>
                    )}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <ProfileAuthor image={Images.profile1} name={'Edward Harvey'} description={'Junior Developer'} />
                    )}
                  />
                </View>
              </View>
              <View style={styles.specifications}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('status')}
                    renderTitle={() => (
                      <Tag
                        primary
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 2,
                          backgroundColor: BaseColor.kashmir,
                        }}
                      >
                        {t('resolved')}
                      </Tag>
                    )}
                  />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <ProductSpecGrid
                    description={t('assignee')}
                    renderTitle={() => (
                      <Tag
                        style={{
                          minWidth: 80,
                          marginTop: 5,
                          paddingVertical: 3,
                        }}
                        outlineSecondaryIcon
                        gray
                        icon={<Icon solid name="star" color={colors.accent} />}
                        textStyle={{
                          paddingHorizontal: 5,
                        }}
                      >
                        {t('improve')}
                      </Tag>
                    )}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                  }}
                >
                  <Text headline style={{ paddingHorizontal: 4 }}>
                    {t('comments')}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      onSelectFilter(option);
                      setModalVisible(true);
                    }}
                  >
                    <Text body1 style={{ paddingHorizontal: 4 }}>
                      {t(option.value)}
                    </Text>
                    <Icon name="angle-down" size={14} color={colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
              {EReviewsData.map((itemInline, index) => (
                <CardCommentSimple
                  key={index}
                  style={{
                    borderBottomWidth: 0.5,
                    borderColor: BaseColor.dividerColor,
                  }}
                  image={itemInline.source}
                  name={itemInline.name}
                  date={itemInline.date}
                  comment={itemInline.comment}
                />
              ))}
            </View>
          </ScrollView>
          <SearchBox ref={searchBox} onSubmitEditing={onSubmitEditing} loading={loading} />
        </KeyboardAvoidingView>
      </View>
      <ModalFilter
        options={sortOption}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
        }}
        onApply={() => {
          const optionInline = sortOption.find((itemInline) => itemInline.checked);
          setOption(optionInline);
          setModalVisible(false);
        }}
        onSelectFilter={onSelectFilter}
      />
    </SafeAreaView>
  );
};

export default PTaskView;
