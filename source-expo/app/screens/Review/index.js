import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { BaseColor, useTheme } from '@/config';
// Load sample data
import { ReviewData } from '@/data';
import { CommentItem, Header, Icon, RateDetail, SafeAreaView, SearchBox } from '@/components';

const rateDetailInit = {
  point: 4.7,
  maxPoint: 5,
  totalRating: 25,
};

const Review = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [rateDetail] = useState(rateDetailInit);
  const [reviewList] = useState(ReviewData);
  const [loading, setLoading] = useState(false);
  const searchBox = useRef(null);

  const writeReview = () => {
    if (searchBox) {
      searchBox.current.focus();
    }
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
    <SafeAreaView
      // style={BaseStyle.safeAreaView}
      style={{ flex: 1 }}
      edges={['right', 'top', 'left']}
    >
      <View style={{ height: 'auto' }}>
        <Header
          style={{ backgroundColor: 'white' }}
          title={t('reviews')}
          renderLeft={() => {
            return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
          style={{ flex: 1 }}
          keyboardVerticalOffset={80}
        >
          {/* Sample User Review List */}

          <FlatList
            // scrollEnabled={false}
            // style={{ padding: 20 }}
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
              <View
                style={{
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderColor: BaseColor.dividerColor,
                }}
              >
                <RateDetail
                  point={rateDetail.point}
                  maxPoint={rateDetail.maxPoint}
                  totalRating={rateDetail.totalRating}
                  onPress={writeReview}
                />
              </View>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingTop: 10,
                  paddingBottom: 20,
                  borderBottomWidth: 1,
                  borderColor: BaseColor.dividerColor,
                }}
              >
                <CommentItem
                  // style={{ marginTop: 10 }}
                  image={item.source}
                  name={item.name}
                  rate={item.rate}
                  date={item.date}
                  title={item.title}
                  comment={item.comment}
                />
              </View>
            )}
          />

          <SearchBox ref={searchBox} onSubmitEditing={onSubmitEditing} loading={loading} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Review;
