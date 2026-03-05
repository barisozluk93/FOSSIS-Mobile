import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { EFilterCategories, EFilterColors, EFilterSizes } from '@/data';
import { BaseStyle, useTheme } from '@/config';
import * as Utils from '@/utils';
import {
  Button,
  Header,
  Icon,
  ProductColorPicker,
  ProductSize,
  RangeSlider,
  SafeAreaView,
  Tag,
  Text,
} from '@/components';
import styles from './styles';

const EFilter = (props) => {
  const { navigation } = props;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [category, setCategory] = useState(EFilterCategories);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [priceBegin, setPriceBegin] = useState(9);
  const [priceEnd, setPriceEnd] = useState(500);
  const [eColors] = useState(EFilterColors);
  const [eSizes] = useState(EFilterSizes);
  const [colorChoosed, setColorChoosed] = useState(EFilterColors[0]);
  const [sizeChoosed, setSizeChoosed] = useState(EFilterSizes[0]);

  /**
   * @description Called when filtering option > category
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @param {*} select
   */
  const onSelectCategory = (select) => {
    const categoryNew = category.map((item) => {
      if (item.name === select.name) {
        return {
          ...item,
          checked: true,
        };
      } else {
        return {
          ...item,
          checked: false,
        };
      }
    });
    setCategory(categoryNew);
  };

  const onClear = () => {
    onSelectCategory(EFilterCategories[0]);
    setColorChoosed(EFilterColors[0]);
    setSizeChoosed(EFilterSizes[0]);
    setPriceBegin(9);
    setPriceEnd(500);
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]} edges={['right', 'top', 'left']}>
      <Header
        title={t('filtering')}
        renderLeft={() => {
          return <Icon name="angle-left" size={20} color={colors.primary} enableRTL={true} />;
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('clear')}
            </Text>
          );
        }}
        onPressLeft={() => navigation.goBack()}
        onPressRight={onClear}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setScrollEnabled(Utils.scrollEnabled(contentWidth, contentHeight))
        }
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <Text headline semibold>
            {t('category')}
          </Text>
          <View style={styles.wrapContent}>
            {category.map((item) => {
              return (
                <Tag
                  primary={item.checked}
                  outline={!item.checked}
                  key={item.id}
                  style={{
                    marginTop: 8,
                    marginRight: 8,
                    height: 28,
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  {item.name}
                </Tag>
              );
            })}
          </View>

          <Text headline semibold style={{ marginTop: 20 }}>
            {t('price')}
          </Text>
          <View>
            <View style={styles.contentRange}>
              <Text caption1 grayColor>
                $9.00
              </Text>
              <Text caption1 grayColor>
                $500.00
              </Text>
            </View>
            <RangeSlider
              min={9}
              max={500}
              low={priceBegin}
              high={priceEnd}
              color={colors.border}
              selectionColor={colors.primary}
              onValueChanged={(low, high) => {
                setPriceBegin(low);
                setPriceEnd(high);
              }}
            />
            <View style={styles.contentResultRange}>
              <Text caption1>{t('select_price')}</Text>
              <Text caption1>{`$${priceBegin}.00 - $${priceEnd}.00`}</Text>
            </View>
          </View>

          <Text headline semibold style={{ marginTop: 20, marginBottom: 8 }}>
            {`${t('color')} (${colorChoosed.name})`}
          </Text>
          <ProductColorPicker
            colorChoosed={colorChoosed}
            colors={eColors}
            onPress={(color) => setColorChoosed(color)}
          />

          <Text headline semibold style={{ marginTop: 20, marginBottom: 8 }}>
            {`${t('size')} (${sizeChoosed.name})`}
          </Text>
          <ProductSize sizeChoosed={sizeChoosed} sizes={eSizes} onPress={(size) => setSizeChoosed(size)} />
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Button
          full
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
              setLoading(false);
            }, 500);
          }}
          loading={loading}
        >
          {t('apply')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EFilter;
