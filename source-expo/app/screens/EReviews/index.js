import { useRef, useState } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header, Icon, SafeAreaView, CardCommentPhoto, Text, ModalFilter } from '@/components';
import { BaseColor, useTheme } from '@/config';
// Load sample data
import { EReviewsData } from '@/data';
import RateDetail from './RateDetail';

const rateDetailInit = {
  point: 4.9,
  maxPoint: 5,
  totalRating: 23,
  data: ['90%', '10%', '0%', '0%', '0%'],
};

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

const Review = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [rateDetail] = useState(rateDetailInit);
  const [reviewList] = useState(EReviewsData);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptionInit);
  const searchBox = useRef(null);

  const writeReview = () => {
    if (searchBox) {
      searchBox.current.focus();
    }
  };

  const onSelectFilter = (item) => {
    setSortOption(
      sortOption.map((option) => ({
        ...option,
        checked: item.value === option.value ? !option.checked : option.check,
      }))
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'top', 'left']}>
      <View style={{ height: 'auto' }}>
        <Header
          title={t('customer_review')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ padding: 20 }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={false}
              onRefresh={() => {}}
            />
          }
          data={reviewList}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View>
              <RateDetail
                point={rateDetail.point}
                maxPoint={rateDetail.maxPoint}
                totalRating={rateDetail.totalRating}
                data={rateDetail.data}
                onPress={writeReview}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('EFeedback')}
                >
                  <Icon name="plus-circle" size={14} color={colors.accent} />
                  <Text body1 style={{ paddingHorizontal: 4 }} accentColor>
                    {t('write_a_review')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text body1 style={{ paddingHorizontal: 4 }}>
                    {t('sort_by_rating')}
                  </Text>
                  <Icon name="angle-down" size={14} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <CardCommentPhoto
              style={{
                borderBottomWidth: 0.5,
                borderColor: BaseColor.dividerColor,
              }}
              images={item.images}
              image={item.source}
              name={item.name}
              rate={item.rate}
              date={item.date}
              title={item.title}
              comment={item.comment}
              totalLike={item.totalLike}
              openGallery={() => navigation.navigate('PreviewImage', { images: item.images })}
            />
          )}
        />
      </View>
      <ModalFilter
        options={sortOption}
        isVisible={modalVisible}
        onSwipeComplete={() => {
          setModalVisible(false);
          setSortOption(sortOption);
        }}
        onApply={() => setModalVisible(false)}
        onSelectFilter={onSelectFilter}
      />
    </SafeAreaView>
  );
};

export default Review;
