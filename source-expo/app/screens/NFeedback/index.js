import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header, Icon, Image, SafeAreaView, StarRating, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme, Images } from '@/config';

const NFeedback = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [rate, setRate] = useState(4.5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('feedback')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Review');
        }}
      />
      <ScrollView>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image
            source={Images.profile2}
            style={{
              width: 62,
              height: 62,
            }}
            borderRadius={31}
          />
          <View style={{ width: 160 }}>
            <StarRating
              starSize={26}
              maxStars={5}
              rating={rate}
              selectedStar={(rating) => {
                setRate(rating);
              }}
              fullStarColor={BaseColor.yellowColor}
              containerStyle={{ padding: 5 }}
            />
            <Text caption1 grayColor style={{ textAlign: 'center' }}>
              {t('tap_to_rate')}
            </Text>
          </View>
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 10 }]}
            onChangeText={(text) => setTitle(text)}
            autoCorrect={false}
            placeholder={t('input_title')}
            placeholderTextColor={BaseColor.grayColor}
            value={title}
            selectionColor={colors.primary}
          />
          <TextInput
            style={[BaseStyle.textInput, { marginTop: 20 }]}
            onChangeText={(text) => setReview(text)}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder={t('reviews')}
            placeholderTextColor={BaseColor.grayColor}
            value={review}
            selectionColor={colors.primary}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NFeedback;
