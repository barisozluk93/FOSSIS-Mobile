import { useState } from 'react';
import { View, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Header, Icon, Image, SafeAreaView, StarRating, Text, TextInput } from '@/components';
import { BaseColor, BaseStyle, useTheme, Images } from '@/config';
import styles from './styles';

const IMAGES = [
  {
    id: 1,
    image: Images.productGrid01,
  },
  {
    id: 2,
    image: Images.productGrid02,
  },
  {
    id: 3,
    image: Images.productGrid03,
  },
  {
    id: 4,
    image: Images.productGrid04,
  },
  {
    id: 5,
    image: Images.productGrid05,
  },
  {
    id: 6,
    image: Images.productGrid06,
  },
  {
    id: 7,
    image: null,
  },
];

const ImageItem = ({ item }) => {
  const { colors } = useTheme();
  if (!item.image) {
    return (
      <View style={styles.viewImage}>
        <TouchableOpacity
          style={[
            styles.image,
            {
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderStyle: 'dotted',
              borderColor: colors.primary,
            },
          ]}
        >
          <Icon name="plus-circle" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.viewImage}>
      <View style={styles.contentImage}>
        <Image style={styles.image} source={item.image} borderRadius={4} />
      </View>
    </View>
  );
};

const EFeedback = (props) => {
  const { t } = useTranslation();
  const { navigation } = props;
  const { colors } = useTheme();
  const [rate, setRate] = useState(4.5);
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('feedback')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text body1 primaryColor numberOfLines={1}>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ListHeaderComponent={
            <View style={{ alignItems: 'center' }}>
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
                style={[{ marginVertical: 20, height: 'auto', paddingVertical: 10 }]}
                minHeight={120}
                onChangeText={(text) => setReview(text)}
                textAlignVertical="top"
                multiline={true}
                autoCorrect={false}
                placeholder={t('write_a_comment')}
                placeholderTextColor={BaseColor.grayColor}
                value={review}
                selectionColor={colors.primary}
                numberOfLines={10}
              />
            </View>
          }
          style={{ marginTop: 20 }}
          numColumns={4}
          data={IMAGES}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ImageItem item={item} />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EFeedback;
