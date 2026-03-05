import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import { Header, Icon, Image, SafeAreaView, Text } from '@/components';
import styles from './styles';

const imagesInit = [
  { id: '1', image: Images.location1, selected: true },
  { id: '2', image: Images.location2 },
  { id: '3', image: Images.location3 },
  { id: '4', image: Images.location4 },
  { id: '5', image: Images.location5 },
  { id: '6', image: Images.location6 },
  { id: '7', image: Images.location7 },
];

export default function PreviewImage({ navigation, route }) {
  const { colors } = useTheme();
  const imagesParam = route?.params?.images ?? imagesInit;
  let flatListRef = null;
  let swiperRef = null;

  const [images, setImages] = useState(imagesParam);
  const [indexSelected, setIndexSelected] = useState(0);

  /**
   * call when select image
   *
   * @param {*} indexSelected
   */
  const onSelect = (indexChecked) => {
    setIndexSelected(indexChecked);
    setImages(
      images.map((item, index) => {
        if (index === indexChecked) {
          return {
            ...item,
            selected: true,
          };
        } else {
          return {
            ...item,
            selected: false,
          };
        }
      })
    );
    flatListRef.scrollToIndex({
      animated: true,
      index: indexChecked,
    });
  };

  /**
   * @description Called when image item is selected or activated
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @param {*} touched
   * @returns
   */
  const onTouchImage = (touched) => {
    if (touched === indexSelected) return;
    swiperRef.scrollBy(touched - indexSelected, false);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, { backgroundColor: 'black' }]} edges={['right', 'top', 'left']}>
      <Header
        style={{ backgroundColor: 'black' }}
        title=""
        renderRight={() => {
          return <Icon name="times" size={20} color={BaseColor.whiteColor} />;
        }}
        onPressRight={() => {
          navigation.goBack();
        }}
        barStyle="light-content"
      />
      <Swiper
        ref={(ref) => {
          swiperRef = ref;
        }}
        dotStyle={{
          backgroundColor: BaseColor.dividerColor,
        }}
        paginationStyle={{ bottom: 0 }}
        loop={false}
        activeDotColor={colors.primary}
        removeClippedSubviews={false}
        onIndexChanged={(index) => onSelect(index)}
      >
        {images.map((item, key) => {
          return <Image key={key} style={{ width: '100%', height: '100%' }} resizeMode="contain" source={item.image} />;
        })}
      </Swiper>
      <View
        style={{
          paddingVertical: 10,
        }}
      >
        <View style={styles.lineText}>
          <Text body2 whiteColor>
            Image Gallery
          </Text>
          <Text body2 whiteColor>
            {indexSelected + 1}/{images.length}
          </Text>
        </View>
        <FlatList
          ref={(ref) => {
            flatListRef = ref;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                onTouchImage(index);
              }}
              activeOpacity={0.9}
            >
              <Image
                style={{
                  width: 70,
                  height: 70,
                  marginLeft: 20,
                }}
                source={item.image}
                borderRadius={8}
                borderColor={index === indexSelected ? colors.primaryLight : BaseColor.grayColor}
                borderWidth={1}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
