import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, I18nManager, ScrollView, Share, TouchableOpacity, View, Alert } from 'react-native';
import { EProductOfStore } from '@/data';
import {
  Avatars,
  Header,
  Icon,
  Image,
  ProductGrid2,
  ProfilePerformance,
  SafeAreaView,
  StarRating,
  Tag,
  Text,
  TextInput,
} from '@/components';
import { BaseColor, BaseStyle, Images, useTheme } from '@/config';
import * as Utils from '@/utils';
import styles from './styles';

const itemInit = {
  price: 60,
  image: Images.storeProfile,
  avatar: Images.profile2,
  title: 'Shopping Mall',
  category: 'Burberry',
  rating: 4.5,
  review: 1,
  followers: [
    {
      image: Images.avata1,
    },
    {
      image: Images.profile5,
    },
    {
      image: Images.profile4,
    },
  ],
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

const EProductStoreProfile = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { item } = itemInit;
  const [isFollow, setIsFollow] = useState(false);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const productData = { ...itemInit, ...item };
  const { image, title, avatar, rating, review, followers } = productData;

  const goProductDetail = (itemInline) => {
    navigation.navigate('EProductDetail', { item: itemInline });
  };

  const goFilter = () => {
    navigation.navigate('EFilter');
  };

  const goCategory = () => {
    navigation.navigate('ECategory');
  };

  const goToFollowers = () => {
    navigation.navigate('EFollowers');
  };

  const goToMessages = () => {
    navigation.navigate('EMessages');
  };

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
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const goSearch = () => {
    navigation.navigate('ESearchHistory');
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
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text headline>Shipping Small</Text>
                <Text caption accentColor style={{ paddingVertical: 4 }}>
                  https://shoppingmall.com
                </Text>
                <TouchableOpacity style={styles.rateLine} onPress={() => navigation.navigate('Review')}>
                  <StarRating
                    disabled={true}
                    starSize={10}
                    maxStars={5}
                    rating={rating}
                    fullStarColor={BaseColor.yellowColor}
                  />
                  <Text footnote grayColor style={{ paddingLeft: 4 }}>
                    {`(${review})`}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={goToFollowers}
                activeOpacity={0.5}
              >
                <Avatars users={followers} />
                <Text subhead grayColor>
                  +5
                </Text>
              </TouchableOpacity>
            </View>
            <Text caption1 grayColor style={{ paddingVertical: 4 }}>
              Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
            </Text>
            <View
              style={[
                styles.viewProfilePerformance,
                {
                  borderTopColor: colors.border,
                  paddingTop: 10,
                  marginVertical: 20,
                },
              ]}
            >
              <ProfilePerformance
                flexDirection="row"
                type="medium"
                data={[
                  {
                    title: 'Feedback',
                    value: '97.01%',
                  },
                  {
                    title: 'Items',
                    value: '501',
                  },
                  {
                    title: 'Follwers',
                    value: '120k',
                  },
                ]}
                style={{ boderWidth: 1 }}
                contentLeft={{}}
                contentCenter={{}}
                contentRight={{}}
              />
            </View>
            <TouchableOpacity onPress={goSearch}>
              <TextInput
                autoCorrect={false}
                placeholder={t('enter_keywords')}
                value={''}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Tag
                  style={{ borderRadius: 5, borderColor: colors.border }}
                  outlineIcon
                  textStyle={{ paddingHorizontal: 4, color: colors.text }}
                  icon={<Icon name="sliders-h" color={colors.text} />}
                  onPress={goFilter}
                >
                  Filters
                </Tag>
                <Tag
                  style={{
                    borderRadius: 5,
                    borderColor: colors.border,
                    marginHorizontal: 10,
                  }}
                  outlineIcon
                  textStyle={{ paddingHorizontal: 4, color: colors.text }}
                  icon={<Icon name="sliders-h" color={colors.text} />}
                  onPress={goCategory}
                >
                  Categories
                </Tag>
              </View>
              <View>
                <Text body2 grayColor>
                  +300 products
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {EProductOfStore.map((itemInline, index) => (
                <View key={index.toString()} style={{ width: '50%' }}>
                  <ProductGrid2
                    style={{
                      width: '100%',
                      paddingRight: index % 2 === 0 ? 10 : 0,
                      paddingLeft: index % 2 !== 0 ? 10 : 0,
                      marginBottom: 20,
                    }}
                    description={itemInline.description}
                    title={itemInline.title}
                    image={itemInline.image}
                    costPrice={itemInline.costPrice}
                    salePrice={itemInline.salePrice}
                    isFavorite={itemInline.isFavorite}
                    onPress={() => goProductDetail(itemInline)}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
        <Image source={image} style={{ flex: 1 }} />
        <View style={[styles.viewIcon]}>
          <Image
            source={avatar}
            style={[styles.thumb]}
            borderWidth={1}
            borderColor={BaseColor.whiteColor}
            borderRadius={60}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginBottom: -25,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text caption1 grayColor>
                Verified
              </Text>
              <Icon name="check-circle" size={10} style={{ paddingHorizontal: 4, color: BaseColor.blueColor }} />
            </View>
            <Tag
              onPress={() => setIsFollow(!isFollow)}
              outline
              style={[
                styles.follow,
                {
                  backgroundColor: isFollow ? colors.primary : colors.background,
                },
              ]}
              textStyle={{
                color: isFollow ? BaseColor.whiteColor : colors.primary,
              }}
            >
              + Follow
            </Tag>
          </View>
        </View>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={{ paddingHorizontal: 16 }} onPress={onShare}>
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
                  </TouchableOpacity>
                  <TouchableOpacity onPress={goToMessages}>
                    <Animated.Image
                      resizeMode="contain"
                      style={[
                        styles.iconComments,
                        {
                          tintColor: headerBackgroundColor,
                        },
                      ]}
                      source={Images.commentsSolid}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default EProductStoreProfile;
