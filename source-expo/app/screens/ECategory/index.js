import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { ECategoryData } from '@/data';
import {
  CategoryList,
  HeaderAnimated,
  Icon,
  ProductCategory1,
  ProductCategory2,
  ProductCategory3,
  SafeAreaView,
  Text,
  TextInput,
} from '@/components';
import { BaseColor, BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
let timeoutChangeMode = null;

const ECategory = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [refreshing] = useState(false);
  const [modeView, setModeView] = useState('grip-vertical');
  const [category] = useState(ECategoryData);
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onChangeView = () => {
    setLoading(true);
    clearTimeout(timeoutChangeMode);
    timeoutChangeMode = setTimeout(() => {
      setLoading(false);
    }, 1000);
    Utils.enableExperimental();

    let mode = 'bars';
    switch (modeView) {
      case 'bars':
        mode = 'th-large';
        break;
      case 'th-large':
        mode = 'grip-vertical';
        break;
      case 'grip-vertical':
        mode = 'th-list';
        break;
      case 'th-list':
        mode = 'bars';
        break;

      default:
        mode = 'bars';
        break;
    }
    setModeView(mode);
  };

  const goToPost = () => {
    navigation.navigate('EProduct');
  };

  const renderItem = ({ item, index }) => {
    switch (modeView) {
      case 'th-large':
        return (
          <ProductCategory2
            loading={loading}
            style={{
              width: '50%',
              paddingLeft: index % 2 === 0 ? 0 : 15,
              marginBottom: 15,
            }}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            onPress={goToPost}
          />
        );

      case 'grip-vertical':
        return (
          <ProductCategory3
            loading={loading}
            style={{
              width: '50%',
              paddingLeft: index % 2 === 0 ? 0 : 15,
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            onPress={goToPost}
          />
        );
      case 'th-list':
        return (
          <CategoryList
            loading={loading}
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            color={item.color}
            image={item.image}
            onPress={goToPost}
          />
        );
      case 'bars':
        return (
          <ProductCategory1
            loading={loading}
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            image={item.image}
            onPress={goToPost}
          />
        );

      default:
        return (
          <ProductCategory1
            loading={loading}
            style={{
              paddingBottom: 15,
            }}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            image={item.image}
            onPress={goToPost}
          />
        );
    }
  };

  const getTotalCol = () => {
    switch (modeView) {
      case 'columns':
        return 2;
      case 'th-large':
        return 2;
      case 'list':
        return 1;
      case 'grip-vertical':
        return 2;
      case 'th-list':
        return 1;
      case 'bars':
        return 1;
      default:
        return 1;
    }
  };

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: false,
  });

  const renderContent = () => {
    return (
      <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
        <HeaderAnimated
          heightScroll={100}
          widthRight={60}
          scrollY={scrollY}
          componentLeft={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="angle-left" size={20} color={colors.text} enableRTL={true} style={{ marginRight: 16 }} />
              </TouchableOpacity>
              <Text header bold>
                {t('categories')}
              </Text>
            </View>
          }
          styleRight={{ right: 0, top: 28 }}
          componentRight={
            <TouchableOpacity
              style={{
                paddingTop: 6,
                height: '100%',
                width: '100%',
                alignItems: 'flex-end',
                paddingRight: 20,
              }}
              onPress={onChangeView}
            >
              <Icon name={modeView} size={20} color={BaseColor.grayColor} />
            </TouchableOpacity>
          }
          componentBottom={
            <TouchableOpacity onPress={() => navigation.navigate('ESearchHistory')}>
              <TextInput
                placeholder={t('enter_keywords')}
                placeholderTextColor={BaseColor.grayColor}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }
        />

        <AnimatedFlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          key={getTotalCol()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
          }}
          numColumns={getTotalCol()}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return renderContent();
};

export default ECategory;
