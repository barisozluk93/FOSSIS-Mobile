import { useEffect, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { BaseColor, BaseStyle, Images, Typography, useTheme } from '@/config';
import { FChooseCategories, FMarkers, FTypes } from '@/data';
import {
  ActionSheetSelectOptionIcon,
  CalendarPicker,
  Header,
  Icon,
  Image,
  ListOptionSelected,
  SafeAreaView,
  Text,
  TextInput,
  TextInputMoney,
} from '@/components';
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

const FAddTransaction = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [money, setMoney] = useState(32000);
  const [review, setReview] = useState('');
  const [category, setCategory] = useState(FChooseCategories[0]);
  const [address, setAddress] = useState(FMarkers[0]);
  const [rangeDate, setRangeDate] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [optionChoosed, setOptionChoosed] = useState(FTypes[0]);
  const navigation = useNavigation();
  const route = useRoute();
  const ref = useRef({});

  useEffect(() => {
    if (route?.params?.category) {
      setCategory(route?.params?.category);
    }
  }, [route?.params?.category]);

  useEffect(() => {
    if (route?.params?.address) {
      setAddress(route?.params?.address);
    }
  }, [route?.params?.address]);

  const onChangeOption = (option) => {
    setOptionChoosed(option);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} edges={['right', 'top', 'left']}>
      <Header
        title={t('add_transaction')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} enableRTL={true} color={colors.text} />;
        }}
        renderRight={() => {
          return (
            <Text body1 lightPrimaryColor>
              {t('save')}
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('FHistory');
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}
      >
        <TextInputMoney value={money} onChange={(value) => setMoney(value)} />
      </View>

      <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('type')}
            textRight={optionChoosed?.text}
            onPress={() => setModalVisible(true)}
          />
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('category')}
            textRight={category?.title ?? ''}
            onPress={() =>
              navigation.navigate({
                name: 'FChooseCategory',
                params: { category: category },
                merge: true,
              })
            }
          />
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('date')}
            textRight={`${moment(rangeDate.startDate).format('DD MMM YYYY')} - ${moment(rangeDate.endDate).format(
              'DD MMM YYYY'
            )}`}
            onPress={() => ref?.current?.open?.()}
          />
          <ListOptionSelected
            style={{ marginTop: 20 }}
            textLeft={t('location')}
            textRight={address.title}
            onPress={() =>
              navigation.navigate({
                name: 'FChooseLocation',
                params: { address: address },
                merge: true,
              })
            }
          />

          <TextInput
            style={{
              marginTop: 20,
              height: 'auto',
              paddingVertical: 10,
              fontSize: 18,
            }}
            inputStyle={Typography.body1}
            minHeight={120}
            onChangeText={(text) => setReview(text)}
            textAlignVertical="top"
            multiline={true}
            autoCorrect={false}
            placeholder={t('please_input_the_memo')}
            placeholderTextColor={BaseColor.grayColor}
            value={review}
            selectionColor={colors.primary}
            numberOfLines={10}
          />

          <Text body2 style={{ marginVertical: 20 }}>
            {t('attachment')}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {IMAGES.map((item, index) => (
              <ImageItem key={index} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
      <ActionSheetSelectOptionIcon
        isVisible={modalVisible}
        options={FTypes}
        onChange={onChangeOption}
        onSwipeComplete={() => setModalVisible(false)}
      />
      <CalendarPicker
        ref={ref}
        style={{ padding: 0 }}
        renderDate={() => null}
        onChange={(rangeDateInline) => setRangeDate(rangeDateInline)}
      />
    </SafeAreaView>
  );
};

export default FAddTransaction;
