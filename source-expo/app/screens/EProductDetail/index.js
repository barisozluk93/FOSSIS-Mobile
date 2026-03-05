import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, I18nManager, ScrollView, Share, TouchableOpacity, View, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { EFilterColors, EFilterSizes } from '@/data';
import * as Utils from '@/utils';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import {
  Button,
  Header,
  Icon,
  Image,
  ProductColorPicker,
  ProductSize,
  ProductSpecGrid,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
  PlaceholderLine,
  Placeholder,
} from '@/components';
import styles from './styles';
import ModalProduct from './ModalProduct';

let imagesInit = [
  {
    id: 1,
    image: Images.productView,
  },
  {
    id: 2,
    image: Images.productGrid01,
  },
  {
    id: 3,
    image: Images.productGrid04,
  },
  {
    id: 4,
    image: Images.productGrid03,
  },
  {
    id: 5,
    image: Images.productGrid05,
  },
  {
    id: 6,
    image: Images.productGrid06,
  },
];

const itemInit = {
  price: 60,
  image: Images.eProduct,
  title: 'White T-Shirt with simple logo and …',
  category: 'Burberry',
  rating: 4.5,
  review: 1,
  status: 'In Stock',
  salePrice: '$60.00',
  costPrice: '$70.00',
  taxStatus: 'Tax included',
  sku: 'AV01-D-32',
  style: 'High-neck',
  measurement: 'Wearing Size: 24',
  washCare: 'Machine Wash',
  fabricComposition: 'Lightweight',
  menOrWomen: 'For Men',
  season: 'Summer, Spring',
  returnsPolicy:
    "Returns and exchanges don't need to be a dreaded part of ecommerce. Here's how to write a return policy that creates a win-win situation.",
  shipping:
    'A Shipping Policy is where you let your customers know important details about how you ship your goods if your business sells goods that get shipped to your customers',
};

const EProductDetail = (props) => {
  const { navigation, route } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item } = route.params;
  const [loading, setLoading] = useState(true);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [modalVisible, setModalVisible] = useState(false);
  const [eColors] = useState(EFilterColors);
  const [eSizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);
  const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);
  const [isFavourite, setIsFavourtie] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = { ...itemInit, ...item };
  const {
    image,
    title,
    category,
    rating,
    review,
    status,
    salePrice,
    costPrice,
    taxStatus,
    sku,
    style,
    measurement,
    washCare,
    fabricComposition,
    menOrWomen,
    season,
    returnsPolicy,
    shipping,
  } = productData;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const images = [{ id: 0, image: image }].concat(imagesInit);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://codecanyon.net/user/passionui/portfolio',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: [BaseColor.whiteColor, colors.text],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    useNativeDriver: true,
  });

  const onSelect = () => {};

  const renderPlaceholder = () => {
    let holders = Array.from(Array(5));

    return (
      <Placeholder>
        <View style={{ padding: 20 }}>
          {holders.map((_item, index) => (
            <PlaceholderLine key={index} width={100} />
          ))}
        </View>
      </Placeholder>
    );
  };

  const renderContent = () => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.contentDescription}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 4,
              }}
            >
              <Text title3>{salePrice}</Text>
              <Text title3 grayColor style={styles.costPrice}>
                {costPrice}
              </Text>
            </View>
            <Text body2>{taxStatus}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text subhead style={{ marginBottom: 4 }}>
              {t('sku')}
            </Text>
            <Text headline>{sku}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 10 }}>
          <Text body1>{t('color').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}
          >
            {`${colorChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductColorPicker colorChoosed={colorChoosed} colors={eColors} onPress={(color) => setColorChoosed(color)} />
        <View style={{ flexDirection: 'row', marginBottom: 8, marginTop: 20 }}>
          <Text body1>{t('size').toUpperCase()}</Text>
          <Text
            headline
            style={{
              paddingHorizontal: 4,
            }}
          >
            {`${sizeChoosed.name}`.toUpperCase()}
          </Text>
        </View>
        <ProductSize sizeChoosed={sizeChoosed} sizes={eSizes} onPress={(size) => setSizeChoosed(size)} />

        <Text headline style={{ marginTop: 20 }}>
          {t('specifications')}
        </Text>

        <View style={styles.specifications}>
          <ProductSpecGrid style={{ flex: 1 }} description={'Style'} title={style} />
          <ProductSpecGrid style={{ flex: 1 }} description={'Measurement'} title={measurement} />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid style={{ flex: 1 }} description={'Wash Care'} title={washCare} />

          <ProductSpecGrid style={{ flex: 1 }} description={'Fabric Composition'} title={fabricComposition} />
        </View>
        <View style={styles.specifications}>
          <ProductSpecGrid style={{ flex: 1 }} description={'Men & Women'} title={menOrWomen} />
          <ProductSpecGrid style={{ flex: 1 }} description={'Season'} title={season} />
        </View>

        <Text headline style={{ marginBottom: 20 }}>
          {t('returns_policy')}
        </Text>
        <Text body2>{returnsPolicy}</Text>

        <Text headline style={{ marginVertical: 20 }}>
          {t('shipping')}
        </Text>
        <Text body2>{shipping}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={[BaseStyle.safeAreaView]} forceInset={{ top: 'always', bottom: 'always' }}>
        <Header title={title} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          // showsHorizontalScrollIndicator={false}
          // showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{ zIndex: 10 }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: scrollY },
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          <View style={{ height: 230 - heightHeader }} />
          <View
            style={{
              marginVertical: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text subhead>{category}</Text>
            <Text title3 style={{ marginVertical: 4 }}>
              {title}
            </Text>

            <View style={styles.lineSpace}>
              <View>
                <TouchableOpacity style={styles.rateLine} onPress={() => navigation.navigate('EReviews')}>
                  <Tag rateSmall style={{ marginRight: 5 }} onPress={() => navigation.navigate('Review')}>
                    {rating}
                  </Tag>
                  <StarRating
                    disabled={true}
                    starSize={10}
                    maxStars={5}
                    rating={rating}
                    fullStarColor={BaseColor.yellowColor}
                  />
                  <Text footnote style={{ marginLeft: 5 }}>
                    {`${review} ${t('reviews').toLowerCase()}`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text subhead accentColor>
                  {status}
                </Text>
              </View>
            </View>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Button
            style={{
              backgroundColor: Utils.parseHexTransparency(colors.primary, 30),
              marginRight: 10,
            }}
            icon={<Icon solid name="cart-plus" size={20} color={colors.primary} />}
            onPress={() => setModalVisible(true)}
          >
            {' '}
          </Button>

          <Button full style={{ flex: 1 }} onPress={() => setModalVisible(true)}>
            {t('buy_now')}
          </Button>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}
      >
        <Swiper
          dotStyle={{
            backgroundColor: BaseColor.dividerColor,
            marginBottom: 8,
          }}
          activeDotStyle={{
            marginBottom: 8,
          }}
          paginationStyle={{ bottom: 0 }}
          loop={false}
          activeDotColor={colors.primary}
          removeClippedSubviews={false}
          onIndexChanged={(index) => onSelect(index)}
        >
          {images.map((imageData, key) => {
            return (
              <TouchableOpacity
                key={key}
                style={{ flex: 1 }}
                activeOpacity={1}
                onPress={() => navigation.navigate('PreviewImage', { images: images })}
              >
                <Image key={key} style={{ flex: 1, width: '100%' }} source={imageData.image} />
              </TouchableOpacity>
            );
          })}
        </Swiper>

        <TouchableOpacity
          style={[
            styles.viewIcon,
            {
              backgroundColor: isFavourite ? BaseColor.whiteColor : colors.primaryLight,
              borderColor: BaseColor.whiteColor,
            },
          ]}
          onPress={() => setIsFavourtie(!isFavourite)}
        >
          <Icon solid name="heart" size={20} color={isFavourite ? colors.primaryLight : BaseColor.whiteColor} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.headerStyle, { position: 'absolute' }]}>
        <SafeAreaView style={{ width: '100%' }} forceInset={{ top: 'always', bottom: 'never' }}>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
      <ModalProduct
        colorChoosedInit={colorChoosed}
        sizeChoosedInit={sizeChoosed}
        item={productData}
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        onApply={() => {
          setModalVisible(false);
          navigation.navigate('ECart');
        }}
      />
    </View>
  );
};

export default EProductDetail;
